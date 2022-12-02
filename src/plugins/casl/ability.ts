import { Ability } from '@casl/ability'
import type { Actions, Subjects } from '@/plugins/casl/AppAbility'

export interface UserAbility {
  action: Actions
  subject: Subjects
}

export interface User {
  id: number
  fullName?: string
  username: string
  password: string
  avatar?: string
  email: string
  role: string
  abilities: UserAbility[]
}

export const initialAbility: UserAbility[] = [
  {
    action: 'read',
    subject: 'Auth',
  },
]

//  Read ability from localStorage
// 👉 Handles auto fetching previous abilities if already logged in user
// ℹ️ You can update this if you store user abilities to more secure place
// ❗ Anyone can update localStorage so be careful and please update this
const stringifiedUserAbilities = localStorage.getItem('userAbilities')
const existingAbility = stringifiedUserAbilities ? JSON.parse(stringifiedUserAbilities) : null

export default new Ability(existingAbility || initialAbility)
