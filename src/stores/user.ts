// /store/user.js

import { defineStore } from "pinia";
import type {
  IDriveUser,
  IDriveCustomer,
  IDriveCustomerOrg,
} from "@/interfaces";
import defaultAvatarUrl from "@/assets/images/avatar/01.jpg";
import  {GLabsApiClient, JiraMiddlewareApiClient } from '@/apis/glabs'
import { useAxios } from "@vueuse/integrations/useAxios";

export const useUserStore = defineStore("identity", () => {
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
  const userEmail = user.value?.email;
  const avatarUrl = computed(() => user.value?.avatar_url || defaultAvatarUrl);
  const isAdmin = computed(() => user.value?.is_admin);
  const getUserData = computed(() => `${user.value}`);
  const isStatusActive = computed(() => user.value?.status == "Active");
  const userId = computed(() => user.value?.id)
  const userType = computed(() => user.value?.type)
  const userCompany = computed(() => user.value?.company)

  //
  async function fetchUser() {
    
    const {data, isFinished, isLoading, execute, error} = useAxios('/users/me1', GLabsApiClient)
    const result = await execute()
    user.value = result.data.value as IDriveUser
    if (result.isFinished.value) {
      status.value = "LoggedIn"
      customer.value = user.value?.customer
      orgs.value = user.value?.orgs
    }
    if (result.error.value) {
      console.log(result.error.value)
    }
      
      
      

      // const res = await fetch(
      //   "http://7d026a29-91f9-4458-90fc-2707e0ff726e.mock.pstmn.io/api/users/me"
      // );
      //user.value = (await res.json()) as IDriveUser;
      //status.value = "LoggedIn";
      //customer.value = user.value?.customer;
      //orgs.value = user.value.orgs;

  }

  function updateCustomerProfile(cust: IDriveCustomer) {
    customer.value = cust;
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
    updateCustomerProfile,
    fetchUser,
    logout,
  };
  // async updatePersonalProfile(user: IDriveUser)
});
