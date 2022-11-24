import { defineStore } from 'pinia'
import type { IWorkshop } from "@/interfaces";


export const useWorkshopStore = defineStore({
  id: 'workshop',
  state: () => ({
    workshops: [] as IWorkshop[],
    openedWorkshopName: ""
  }),
  getters: {
    getAllWorkshops(): IWorkshop[] {
      return this.workshops
    },
    workshopEmpty(): Boolean {
      return this.workshops.length <= 0
    },
  },
  actions: {
    loadWorkshop(workshop: string) { },
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
