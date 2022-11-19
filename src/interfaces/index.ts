export interface Item {
    name: string;
}

export interface ITag {
    id: number,
    name: string
}

export interface ICategory extends ITag, ITag {}
export interface IPlatform extends ITag, ITag {}
export interface IWorkshop {
    image: string,
    is_public?: boolean,
    is_internal?: boolean,
    permissions_groups: string[],
    categories: ICategory[],
    tags: ITag[],
    platforms: IPlatform[],
    active?: boolean, 
    id: string,
    title: string,
    level: number,
    duration: string,
    description: string,
    workshop_url: URL
    modified_at?: Date,
    author?: string,
    name?: string
}


export interface IDriveUser {
    first_name: string,
    last_name: string,
    customer: IDriveCustomer,
    email: string,
    avatar_url: string,
    date_created: string,
    date_updated: string,
    date_approved: string,
    date_lastLogin: string,
    date_expired: string,
    groups: ITag[]
    [x: string]: string | IDriveCustomer | ITag[],

  }

export interface IDriveCustomer {
    identifiers: IDriveIdentifier[],
    [x: string]: string | IDriveIdentifier[],
  }

export interface IDriveIdentifier {
    name: string,
    type: string,
    value: string
  }

  export interface IDriveProfileActivity {
    content: string,
    timestamp: string,
    size?: string,
    type?: string,
    icon?: string,
    hollow?: boolean
  }



export type NewTodo1 = String