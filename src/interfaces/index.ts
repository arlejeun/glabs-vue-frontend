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

export type NewTodo1 = String