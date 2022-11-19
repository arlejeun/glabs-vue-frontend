// /store/user.js

import { defineStore } from "pinia";
import type { IDriveUser, IDriveCustomer } from "@/interfaces";
import type { Ref } from "vue"

export const useUserStore = defineStore('identity', () => {

  // state properties vue composition of store
  const user = ref({} as IDriveUser) 
  const status = ref('LoggedOut')
  const token = ref('')
  
  // computed properties vue composition of store
  const getCustomerProfile = computed(() => {return {...user.value.customer}})

  // 
  async function fetchUser() {
      const res = await fetch("http://7d026a29-91f9-4458-90fc-2707e0ff726e.mock.pstmn.io/api/users/me");
      user.value = await res.json() as IDriveUser;
      status.value = 'LoggedIn'
  }

  async function logout() {
      //call msal library
      user.value = {} as IDriveUser;
      status.value = 'LoggedOut'
  }

  return {user, status, token, getCustomerProfile, fetchUser, logout}
    // async updatePersonalProfile(user: IDriveUser) 
});