// /store/user.js

import { defineStore } from "pinia";
import type { IDriveUser, IDriveCustomer, IDriveCustomerOrg } from "@/interfaces";

export const useUserStore = defineStore('identity', () => {

  // state properties vue composition of store
  const user = ref({} as IDriveUser) 
  const status = ref('LoggedOut')
  const token = ref('')
  const customer = ref({} as IDriveCustomer)
  const orgs = ref([] as IDriveCustomerOrg[])
  
  // computed properties vue composition of store
  const getCustomerProfile = computed(() => {return user.value.customer?.[0] as IDriveCustomer})

  // 
  async function fetchUser() {
      const res = await fetch("http://7d026a29-91f9-4458-90fc-2707e0ff726e.mock.pstmn.io/api/users/me");
      user.value = await res.json() as IDriveUser;
      status.value = 'LoggedIn'
      customer.value = user.value?.customer?.[0]
      orgs.value = user.value.orgs
  }

  function updateCustomerProfile (cust: IDriveCustomer) {
    customer.value = cust
  }

  async function logout() {
      //call msal library
      user.value = {} as IDriveUser;
      status.value = 'LoggedOut'
  }

  return {user, status, token, customer, orgs, getCustomerProfile, updateCustomerProfile, fetchUser, logout}
    // async updatePersonalProfile(user: IDriveUser) 
});