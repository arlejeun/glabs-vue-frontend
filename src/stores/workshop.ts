import { defineStore } from 'pinia'
import type { IWorkshop } from "@/interfaces"
import axios from "axios"

const WORKSHOPS_BASE = '/ws/'

export const useWorkshopStore = defineStore({
  id: 'workshop',
  state: () => ({
    workshops: [] as IWorkshop[],
    workshop: '',
    manifest: '',
    openedWorkshopName: ''
  }),
  getters: {
    getAllWorkshops(): IWorkshop[] {
      return this.workshops
    },
    getWorkshopUrl(): string {
      return WORKSHOPS_BASE + this.workshop + '/'
    },
    workshopEmpty(): Boolean {
      return this.workshops.length <= 0
    },
  },
  actions: {
    async loadWorkshop(workshop: string) {
      this.workshop = workshop

      // styles- should be scoped somehow
      let file = document.createElement('link');
      file.rel = 'stylesheet'
      file.href = this.getWorkshopUrl + 'static/css/theme-min.css'
      document.head.appendChild(file)

      // getting manifest
      try {
        const res = await axios.get(this.getWorkshopUrl + 'content/manifest.json');
        this.manifest = res.data;
      } catch (error) {
        console.log(error);
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
