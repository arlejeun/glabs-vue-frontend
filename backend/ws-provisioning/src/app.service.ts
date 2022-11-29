import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { AxiosResponse } from 'axios';
import { stringify } from 'querystring';

const shell = require('shelljs');
const fs = require('fs');
const fm = require('front-matter');

const WORKSHOPS_PATH = "../../public/ws/"
const REPO_OWNER = "genesys-samples/"

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

  constructor(private readonly httpService: HttpService) { }

  getHello(): string {
    return 'Useage:   /update/workshop-repo-name';
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

  private walk = function (dir: string) {
    var menu = { name: '', menus: [], pages: [] } as IMenu

    var list = fs.readdirSync(dir);
    var self = this;

    list.forEach(function (file) {
      file = dir + '/' + file;
      var stat = fs.statSync(file);
      if (stat && stat.isDirectory()) {
        menu.menus.push(self.walk(file).menus);
      }
      else {
        const data = fs.readFileSync(file, { encoding: 'utf8', flag: 'r' });
        const res = fm(data);
        if (file.indexOf('/_index.md') >= 0) {
          menu.name = res.attributes?.title
        }
        menu.pages.push({
          name: res.attributes?.title,
          weight: res.attributes?.weight,
          path: file,
          body: res.body
        });
      }
    });

    return { menus: menu };
  }


  async getWorkshop(workshop: string): Promise<string> {

    const wsPath: string = WORKSHOPS_PATH + workshop;

    const donePromise = new Promise(async () => {

      shell.pushd(wsPath + '/content');
      try {
        const manifes = JSON.stringify({ content: this.walk('.').menus }, null, 4);
        //console.log('RESULT: ', manifest)
        fs.writeFileSync('manifest.json', manifes);
      }
      catch (e) {
        console.log('Manifest file error: \n', e)
      }
      shell.popd();
      return

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
      const manifest = JSON.stringify(this.walk('.'), null, 4);
      //console.log('RESULT: ', manifest)
      fs.writeFileSync('manifest.json', manifest);
      shell.popd();
      return

    });

    donePromise.then(() => {
      console.log(workshop + ' deployment completed!')
    });

    return 'Request accepted'
  }

}


