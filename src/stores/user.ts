// /store/user.js

import { defineStore } from "pinia";
import type {
  IDriveUser,
  IDriveCustomer,
  IDriveCustomerOrg,
} from "@/interfaces";
import defaultAvatarUrl from '@/assets/images/avatar/01.jpg'
import { GLabsApiClient, GLABS_STORAGE, GLABS_TOKEN} from '@/apis/glabs'

import { useAxios } from "@vueuse/integrations/useAxios";
import { useNotification } from "@kyvg/vue3-notification";
import { handleAxiosError } from '@/utils/axios'

export const useUserStore = defineStore("identity", () => {

  const { notify}  = useNotification()

  // state properties vue composition of store
  const user = ref({} as IDriveUser);
  const status = ref("LoggedOut");
  const token = ref("");
  const customer = ref({} as IDriveCustomer);
  const orgs = ref([] as IDriveCustomerOrg[]);


  // computed properties vue composition of store
  const getCustomerProfile = computed(() => {
    return user.value.customer as IDriveCustomer;
  });
  const isLoggedIn = computed(() => status.value == "LoggedIn");
  const username = computed(() =>
    user.value?.first_name
      ? `${user.value?.first_name} ${user.value?.last_name}`
      : "Anonymous"
  );
  const userEmail =  computed(() => user.value?.email);
  const avatarUrl = computed(() => user.value?.avatar_url || defaultAvatarUrl);
  const isAdmin = computed(() => user.value?.is_admin);
  const getUserData = computed(() => `${user.value}`);
  const isStatusActive = computed(() => user.value?.status == "Active");
  const userId = computed(() => user.value?.id)
  const userType = computed(() => user.value?.type)
  const userCompany = computed(() => user.value?.company)

  //
  async function fetchUser() {
    
    const { execute } = useAxios(GLabsApiClient)

    const data = {email: 'arnaud.lejeune@genesys.com'}
    const auth = await execute(`/auth/login`, {data, method: 'POST'}, )
    
    if (auth.isFinished.value && !auth.error.value) {
    
      GLABS_STORAGE.value = {token: auth.data.value?.accessToken}
      GLABS_TOKEN.value = auth.data.value?.accessToken
      //GLabToken.value.token = auth.data.value?.accessToken
      //localStorage.setItem('glabs', JSON.stringify({token: auth.data.value?.accessToken}) )

      const result = await execute('/users/me')
    
      if (result.isFinished.value && !result.error.value) {
        user.value = result.data.value as IDriveUser
        status.value = "LoggedIn"
        customer.value = user.value?.customer
        orgs.value = user.value?.orgs
      }
      
      if (result.error.value) {
        notify({
          title: "Identification Error",
          text: `${handleAxiosError(result.error.value, 'Impossible to fetch user profile at the moment')}`,
          duration: -1,
          type: 'error'
        });
        
      }

    }

    
      // const res = await fetch(
      //   "http://7d026a29-91f9-4458-90fc-2707e0ff726e.mock.pstmn.io/api/users/me"
      // );
      //user.value = (await res.json()) as IDriveUser;
      //status.value = "LoggedIn";
      //customer.value = user.value?.customer;
      //orgs.value = user.value.orgs;

  }

  async function updateUserProfile() {
    const { execute } = useAxios(GLabsApiClient)
    const data = user.value
    const {customer, orgs, groups, ...userProperty} = user.value;
    const result = await execute(`/users/${user.value.id}`, {method: 'PATCH', data: userProperty}, )
    if (result.isFinished.value && !result.error.value) {
      console.log(result.data.value)
    }
    if (result.error.value) {
      notify({
        title: "User Profile API",
        text: `${handleAxiosError(result.error.value, 'Impossible to update the user profile at the moment')}`,
        duration: -1,
        type: 'error'
      });
    }
  }
  
  async function updateCustomerProfile(cust: IDriveCustomer) {
    customer.value = cust;
    const { execute } = useAxios(GLabsApiClient)
    const data = {foo: 'bar'}
    const result = await execute(`/customer/${cust.id}`, {data, method: 'PATCH'}, )
    if (result.isFinished.value && !result.error.value) {
      console.log(result.data.value)
    }
    if (result.error.value) {
      const { notify}  = useNotification()
      notify({
        title: "Customer Record Error",
        text: `${handleAxiosError(result.error.value, 'Impossible to update the customer record at the moment')}`,
        duration: -1,
        type: 'error'
      });
    }
  }

  async function logout() {
    //call msal library
    user.value = {} as IDriveUser;
    status.value = "LoggedOut";
  }

  return {
    user,
    userId,
    userType,
    userCompany,
    status,
    token,
    customer,
    orgs,
    isLoggedIn,
    avatarUrl,
    username,
    userEmail,
    isAdmin,
    getCustomerProfile,
    isStatusActive,
    getUserData,
    updateUserProfile,
    updateCustomerProfile,
    fetchUser,
    logout,
  }

  // async updatePersonalProfile(user: IDriveUser)
});
