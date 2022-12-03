import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { AxiosResponse } from 'axios';
import { stringify } from 'querystring';
import { Storage } from '@google-cloud/storage';
import StorageConfig from './storage-config'

const shell = require('shelljs');
const fs = require('fs');
const fm = require('front-matter');

const WORKSHOPS_PATH = "../../public/ws/"
const REPO_OWNER = "genesys-samples/"

console.log(StorageConfig)

// The ID of your GCS bucket
// The path to your file to upload
const filePath = 'upload.txt';

// The new ID for your GCS file
const destFileName = 'gride-demo/test/README.md';

interface IMenu {
  name: string,
  weight?: number,
  path?: string,
  body?: string,
  menus?: IMenu[],
  pages?: IMenu[]
}

@Injectable()
export class AppService {

  private storage: Storage
  private bucket: string
  private bucketName = StorageConfig.mediaBucket
  private wokrshopName: string
  private currentDir = __dirname.substr(0, __dirname.lastIndexOf('/'))
  private count = 0

  constructor(private readonly httpService: HttpService) {
    this.storage = new Storage({
      projectId: StorageConfig.projectId,
      credentials: {
        client_email: StorageConfig.client_email,
        private_key: StorageConfig.private_key,
      },
    });

    this.bucket = StorageConfig.mediaBucket;
  }

  getHello(): string {
    return 'Useage:   /update/workshop-repo-name';
  }

  getGcp(): string {

    this.uploadFile('', '').catch(console.error);

    return 'OK'
  }

  private async uploadFile(file: string, dest: string) {

    var self = this
    const options = {
      destination: dest
    };

    try {
      self.count++
      this.storage.bucket(this.bucketName).upload(file, options, () => {
        self.count--
        console.log(`${file} uploaded to ${self.bucketName}`);
      });
    }
    catch (e) {
      try {
        self.count++
        this.storage.bucket(this.bucketName).upload(file, options, () => {
          self.count--
          console.log(`${file} uploaded to ${self.bucketName}`);
        });
      }
      catch (er) {
        console.log('Cannot upload: ', file, '\n', er)
      }
    }

    return
  }

  private async download(workshop: string, file: string) {
    console.log(`Workshop ${workshop} is loading...`)
    var res: AxiosResponse<any, any> = await firstValueFrom(
      this.httpService.get(`https://api.github.com/repos/${workshop}/zipball`, {
        responseType: 'arraybuffer', // Important
        headers: {
          'Content-Type': 'application/gzip'
        }
      }));

    console.log('Loaded!')
    var b = Buffer.from(res.data, 'binary');
    fs.writeFileSync(file, b, 'binary', () => { console.log('done') });
    console.log('Saved!')
  }

  private metadataCollection = function (dir: string) {
    var menu = { name: '', menus: [], pages: [] } as IMenu

    var list = fs.readdirSync(dir);
    var self = this;

    list.forEach(function (file) {
      file = dir + '/' + file;
      var stat = fs.statSync(file);
      if (stat && stat.isDirectory()) {
        menu.menus.push(self.metadataCollection(file).menus);
      }
      else {
        const data = fs.readFileSync(file, { encoding: 'utf8', flag: 'r' });
        const res = fm(data);
        if (file.indexOf('/_index.md') >= 0) {
          menu.name = res.attributes?.title
          menu.weight = res.attributes?.weight
          menu.path = file
          menu.body = res.body
        }
        else {
          menu.menus.push({
            name: res.attributes?.title,
            weight: res.attributes?.weight,
            path: file,
            body: res.body
          });
        }
      }
    });

    return { menus: menu };
  }

  private mediaUpload = function (dir: string) {

    var list = fs.readdirSync(dir);
    var self = this;

    list.forEach(async function (file) {
      file = dir + '/' + file;
      var stat = fs.statSync(file);
      if (stat && stat.isDirectory()) {
        self.mediaUpload(file)
      }
      else {
        self.uploadFile(self.currentDir + '/temp/static/' + file, self.wokrshopName + '/' + file)
      }
    });

  }

  async getWorkshop(workshop: string): Promise<string> {

    const wsPath: string = WORKSHOPS_PATH + workshop;

    const donePromise = new Promise(async () => {

      await this.download(REPO_OWNER + workshop, 'repo.zip');
      //- removed processing of theme and hugo run
      //-await this.download('matcornic/hugo-theme-learn', 'template.zip'); 


      shell.mkdir(WORKSHOPS_PATH);
      shell.pushd(WORKSHOPS_PATH);
      shell.rm('-r', workshop);
      shell.mkdir(workshop);
      shell.popd();
      shell.exec(`unzip -o -qq repo.zip -d ${wsPath}`);
      //-shell.exec(`unzip -o -qq template.zip -d ${wsPath}`);
      shell.rm('repo.zip')
      //-shell.rm('template.zip')

      shell.pushd(wsPath)
      shell.mkdir('temp')

      shell.mv('genesys-samples*/*', 'temp')
      shell.rm('-r', 'genesys-samples*')
      //-shell.mv('matcornic-hugo-theme-learn*/*', 'temp/themes/hugo-theme-learn/')
      //-shell.rm('-r', 'matcornic-hugo-theme-learn*')

      //-shell.cd('temp')
      //-shell.exec('hugo')
      //-shell.cd('..')
      shell.mv('temp/*', '.')
      shell.rm('-r', 'temp')
      shell.popd();

      shell.pushd(wsPath + '/content');
      try {
        const manifes = JSON.stringify({ content: this.metadataCollection('.').menus }, null, 4);
        //console.log('RESULT: ', manifest)
        fs.writeFileSync('manifest.json', manifes);
      }
      catch (e) {
        console.log('Manifest file error: \n', e)
      }
      shell.popd();
      return

    });

    donePromise.then(() => {
      console.log(workshop + ' deployment completed!')
    });

    return 'Request accepted'
  }

  async getGcpWorkshop(workshop: string): Promise<string> {

    this.wokrshopName = workshop
    const donePromise = new Promise(async () => {


      shell.rm('-r', 'temp')
      shell.mkdir('temp');
      shell.pushd('temp');
      await this.download(REPO_OWNER + workshop, 'repo.zip');
      await shell.exec(`unzip -o -qq repo.zip `);
      shell.rm('repo.zip')

      shell.mv('genesys-samples*/*', '.')
      shell.rm('-r', 'genesys-samples*')

      shell.pushd('content');
      try {
        const manifest = JSON.stringify({ content: this.metadataCollection('.').menus }, null, 4);
        // TODO Save to the DB
        fs.writeFileSync('manifest.json', manifest);
      }
      catch (e) {
        console.log('Manifest file error: \n', e)
      }
      shell.popd();
      shell.pushd('static');

      await this.storage.bucket(this.bucketName).deleteFiles({
        prefix: this.wokrshopName + '/'
      }, function (err) {
        if (!err) {
          console.log('Old workshop files are deleted in cloud')
        }
        else {
          console.error('Old Workshop files are not deleted!', err)
        }
      });

      this.count = 0
      await this.uploadFile(this.currentDir + '/temp/content/manifest.json', this.wokrshopName + '/manifest.json')
      this.mediaUpload('images')

      shell.popd();
      shell.popd();
      this.removeTemp('temp', this)

      return

    });

    donePromise.then(() => {
      console.log(workshop + ' deployment completed!')
    });

    return 'Request accepted'
  }

  private removeTemp(folder, self) {
    if (this.count > 0) {
      setTimeout(() => { self.removeTemp(folder, self) }, 1000)
    }
    else {
      shell.rm('-r', folder)
    }
  }

}


