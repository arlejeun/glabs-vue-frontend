import { defineStore } from 'pinia'
import type { IWorkshop } from "@/interfaces"
import axios from "axios"
import sanitizeHtml from "sanitize-html"
import type { IWorkshopMenuItem, ITree } from '@/interfaces/workshop'

const WORKSHOPS_BASE = 'https://storage.googleapis.com/genesys-drive-test/'

function buildMenu(submenu: IWorkshopMenuItem[]): any {
  if (typeof submenu.forEach !== 'function') {
    return []
  }

  var result: { name: string; menus: IWorkshopMenuItem[]; pages: IWorkshopMenuItem[] }[] = []
  var menu = {
    name: '',
    menus: [] as IWorkshopMenuItem[],
    pages: [] as IWorkshopMenuItem[]
  }

  submenu.forEach((item: IWorkshopMenuItem) => {
    menu.name = item.name
    menu.menus = []
    if (item.menus && item.menus.length > 0) {
      menu.menus = { ...buildMenu(item.menus) }
    }
    if (item.pages && item.pages.length > 0) {
      menu.pages = { ...buildMenu(item.pages) }
    }
    result.push({ ...menu })
  })
  //  console.log(result)
  return result
}

const buildTree = (ws: IWorkshopMenuItem[], index?: number[]): ITree[] => {

  if (typeof ws?.forEach !== 'function') {
    return []
  }

  index = index || []
  var result = [] as ITree[]
  var branch = {} as ITree
  var i = 0

  ws.forEach((item: IWorkshopMenuItem) => {
    branch.index = [...index || []]
    branch.label = item.name
    branch.id = item.weight
    branch.index.push(i)
    if (item.menus && item.menus.length > 0) {
      branch.children = [...buildTree(item.menus, branch.index)]
    }
    result.push({ ...branch })
    delete branch.children
    i++
  })

  //  console.log('Tree: ', result)
  return result

}
export const useWorkshopStore = defineStore({
  id: 'workshop',
  state: () => ({
    workshops: [] as IWorkshop[],
    workshopName: '',
    workshop: [] as IWorkshopMenuItem[],
    page_index: [0, 0] as number[], // acces to ws page: menus[1].menus[2] -> page_index is [1,2]
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

      // getting manifest
      try {
        //        const res = await axios.get('/ws/' + this.workshopName + '/content/manifest.json');  //(this.getWorkshopUrl + 'manifest.json');
        const res = await axios.get(this.getWorkshopUrl + 'manifest.json');
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
      this.workshops = { ...workshops }
    },

    removeWorkshop(index: number) {
      this.workshops.splice(index, 1)
    },

    setTreeIndex(ind: number[]) {
      this.page_index = [...ind]
    }
  },
})
