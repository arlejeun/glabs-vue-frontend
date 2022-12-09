import { defineStore } from 'pinia'
import type { IWorkshop } from "@/interfaces";

const WORKSHOPS_BASE = 'https://storage.googleapis.com/genesys-drive-test/'

export const useWorkshopStore = defineStore({
  id: 'workshop',
  state: () => ({
    workshops: [] as IWorkshop[]
  }),
  getters: {
    getAllWorkshops(): IWorkshop[] {
      return this.workshops
    },
    getWorkshopPages(): IWorkshopMenuItem[] {

      var pages = [] as IWorkshopMenuItem[]
      pages = this.workshop[0]?.menus || []
      for (let i = 0; this.page_index.length - 2; i++) {
        pages = [...pages[i]?.menus || []]
      }
      pages.forEach(page =>
        page.body = page.body?.replaceAll('/images/', `${WORKSHOPS_BASE}${this.workshopName}/images/`)
        //        page.body = page.body?.replaceAll('/images/', WORKSHOPS_BASE + this.workshopName + '/static/images/')
      )
      return pages
    },

    getWorkshop(): IWorkshopMenuItem[] {
      return this.workshop
    },
    getWorkshopUrl(): string {
      return WORKSHOPS_BASE + this.workshopName + '/'
    },
    getWorkshopMenu(): any {
      return buildMenu(this.workshop)
    },
    getWorkshopTree(): any {
      return buildTree(this.workshop[0]?.menus || [])
    },
    getWorkshopPage(): string {

      if (this.workshop.length === 0) {
        return ''
      }
      var content = [...this.workshop[0]?.menus || []] as IWorkshopMenuItem[]
      var page = ''
      this.page_index.forEach(index => {
        if (content.length > index) {
          page = content[index].body || ''
          content = content[index].menus || []
        }
      })
      https://storage.googleapis.com/gdemo-workshops-test/gride-demo/images/
      //      page = page.replaceAll('/images/', WORKSHOPS_BASE + this.workshopName + '/static/images/')
      page = page.replaceAll('/images/', `https://storage.googleapis.com/gdemo-workshops-test/${this.workshopName}/images/`)

      // TODO add html sanitizer
      page = sanitizeHtml(page, {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
        allowedIframeHostnames: ['www.youtube.com']
      });
      return page
    },

    workshopEmpty(): Boolean {
      return this.workshops.length <= 0
    },
  },
  actions: {
    async loadWorkshop(workshopName: string) {
      this.workshopName = workshopName

      // styles- should be scoped somehow
      let file = document.createElement('link');
      file.rel = 'stylesheet'

      // ### Style loading is disabled so far
      //file.href = this.getWorkshopUrl + 'static/css/theme-mine.css'
      //document.head.appendChild(file) 
      // ###

      // getting manifest
      try {
        const res = await axios.get('/ws/' + this.workshopName + '/content/manifest.json');  //(this.getWorkshopUrl + 'manifest.json');
        console.log(res)
        this.workshop = [res.data.content];
      } catch (error) {
        console.log('Loading manifest error: ', error);
      }

    },
    addWorkshop(todo: IWorkshop) {
      this.workshops.push(todo)
    },
    
    setWorkshops(workshops: IWorkshop[]) {
      this.workshops = {...workshops}
    },

    removeWorkshop(index: number) {
      this.workshops.splice(index, 1)
    },
  },
})
