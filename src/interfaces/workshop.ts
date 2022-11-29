export interface IWorkshopMenuItem {
  name: string
  weight?: number
  path?: string
  body?: string
  menus?: Array<IWorkshopMenuItem>
  pages?: Array<IWorkshopMenuItem>
}


