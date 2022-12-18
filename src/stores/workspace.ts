// /store/user.js

import { defineStore } from "pinia";
import defaultAvatarUrl from '@/assets/images/avatar/01.jpg'
import { GLabsApiClient } from '@/apis/glabs'

import { useAxios } from "@vueuse/integrations/useAxios";
import { useNotification } from "@kyvg/vue3-notification";
import { handleAxiosError } from '@/utils/axios'

import { generateCustomerPayload } from '@/utils/axios'
import type { IDriveUserRegistration } from "@/interfaces";

// function generateCustomerPayload(customer: IDriveCustomer) {
//   const identifiersCreate =  {create: customer.identifiers}
//   const {identifiers, ...cust} = customer;
//   let temp: IDriveCustomerDTO = {...cust, identifiers: identifiersCreate}
//   return {...temp}
// }

export const useUserStore = defineStore("workspace", () => {
  
  const router = useRouter();
  const { notify}  = useNotification()

  const gtsAvailableOrgs = ref([]);
  const activeOrg = ref({})
  const genesysToken = ref("")
  const genesysPermissions = ref({})
  const genesysUser = ref({})
  
  const hasAdminPermission = computed(() => genesysPermissions.value)

  async function fetchAvailableOrgs() {

    const { execute } = useAxios()
    
      const result = await execute('/users/me')

      if (result.isFinished.value && !result.error.value) {
       
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

  async function updateUserProfile() {
    const { execute } = useAxios(GLabsApiClient)
    
    const result = await execute(`/users/me`, {method: 'PATCH', data: {}}, )
    if (result.isFinished.value && !result.error.value) {
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


  async function createUserProfile(userDTO: IDriveUserRegistration) {
    const { execute } = useAxios(GLabsApiClient)
    const result = await execute(`/users/register`, {method: 'POST', data: userDTO}, )
    if (result.isFinished.value && !result.error.value) {
      
    }
    if (result.error.value) {
  
      notify({
        title: "Account Registration",
        text: `${handleAxiosError(result.error.value, 'Impossible to create the user profile at the moment')}`,
        duration: -1,
        type: 'error'
      });
    } else {
      notify({
        title: 'Account Registration',
        text: 'Your user profile was created successfully',
        duration: 2000,
        type: 'success'
      });
    }
  }

  




  return {

  
    createUserProfile,
    updateUserProfile,
  }

  // async updatePersonalProfile(user: IDriveUser)
});
