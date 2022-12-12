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
    id?: number,
    first_name: string,
    last_name: string,
    customer: IDriveCustomer,
    orgs: IDriveCustomerOrg[],
    email: string,
    avatar_url: string,
    date_created: string,
    country_id: number,
    date_updated: string,
    date_approved: string,
    date_lastLogin: string,
    date_expired: string,
    groups: ITag[]
    [x: string]: string | IDriveCustomer | ITag[] | IDriveCustomerOrg[] | number | undefined
  }

export interface IDriveCustomer {
    [x: string]: string | IDriveIdentifier[],
    identifiers: IDriveIdentifier[]
  }

export interface IDriveCustomerDTO {
    [x: string]: string | IDriveIdentifierDTO,
    identifiers: IDriveIdentifierDTO
  }

  export interface IDriveCustomerForm extends IDriveCustomer {
    emails: IDriveIdentifier[],
    phones: IDriveIdentifier[],
    messengers: IDriveIdentifier[]
  }
export interface IDriveCustomerOrg {
    id: number,
    is_owned_by_gts:boolean,
    user_id: number,
    [x: string]: string | IDriveCustomerOrgSettings | number | boolean,
    org_user_settings: IDriveCustomerOrgSettings
  }

export interface IDriveIdentifier {
    id?: number,
    name: string,
    type: string,
    value: string
  }

export interface IDriveIdentifierDTO {
    create?: IDriveIdentifier[]
  }



export interface IDriveCustomerOrgSettings {
  [x: string]: string | undefined
}

  export interface IDriveProfileActivity {
    content: string,
    timestamp: string,
    size?: string,
    type?: string,
    icon?: string,
    hollow?: boolean
  }


export interface IGenesysCloudRegion {
  [x: string]: string
}

export interface IDriveCountry {
  id: number,
  name: string,
  dial_code: string,
  code: string
}