export interface IWorkshopMenuItem {
  name: string
  weight: number
  path?: string
  body?: string
  menus?: Array<IWorkshopMenuItem>
  pages?: Array<IWorkshopMenuItem>
}

export interface ITree {
  id: number
  index: number[]
  label: string
  isTop?: boolean
  isSelected?: boolean
  children?: ITree[]
}

