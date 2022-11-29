import { defineStore } from 'pinia'
import type { IWorkshop } from "@/interfaces"
import axios from "axios"
import type { AnyClass } from '@casl/ability/dist/types/types'
import type { IWorkshopMenuItem } from '@/interfaces/workshop'

const WORKSHOPS_BASE = '/ws/'

function buildMenu(submenu: IWorkshopMenuItem[]): any {
  if (typeof submenu.forEach !== 'function') {
    return []
  }

  var result = []
  var menu = {
    name: '',
    menus: [] as IWorkshopMenuItem[]
  }

  submenu.forEach((item: IWorkshopMenuItem) => {
    menu.name = item.name
    menu.menus = []
    if (item.menus && item.menus.length > 0) {
      menu.menus.push(buildMenu(item.menus))
    }
    result.push({ ...menu })
  })
  console.log(result)
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
    getWorkshopUrl(): string {
      return WORKSHOPS_BASE + this.workshopName + '/'
    },
    getWorkshopMenu(): any {
      return buildMenu(this.workshop)
    },
    getWorkshopPage(): string {
      if (this.workshop.length === 0) {
        return ''
      }
      var content = [...this.workshop] as IWorkshopMenuItem[]
      var page = ''
      this.page_index.forEach(index => {
        if (content.length > index) {
          page = content[index].body || ''
          content = content[index].pages || []
        }
      })
      page = page.replaceAll('/images/', WORKSHOPS_BASE + this.workshopName + '/static/images/')
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
        const res = await axios.get(this.getWorkshopUrl + 'content/manifest.json');
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
  },
})
