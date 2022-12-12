// /store/user.js

import { defineStore } from "pinia";
import type {
  IDriveCountry,
} from "@/interfaces";

import  {GLabsApiClient } from '@/apis/glabs'
import { useAxios } from "@vueuse/integrations/useAxios";
import { useNotification } from "@kyvg/vue3-notification";

export const useCountryStore = defineStore("country", () => {
  // state properties vue composition of store
  const countries = ref([] as IDriveCountry[]); 
  const selectedCountry = ref({} as IDriveCountry)
  
  // computed properties vue composition of store
  const getCountryCode = computed(() => {
    return selectedCountry.value.code;
  });

  //
  // async function fetchCountries() {
  //   try {
  //     const { execute } = useAxios(GLabsApiClient)
  //     const result = await execute('/countries')
  //     console.log('Is finished: ' + result.isFinished.value)
  //     countries.value = result.data.value
  //     if (result.error.value) {
  //       const { notify}  = useNotification()
  //       notify({
  //         title: "Technical Issue",
  //         text: `Impossible to fetch list of countries at the moment. Issue: ${result.error.value.toString()}. Please reach out to Global Technical Sales`,
  //         duration: -1,
  //         type: 'error'
  //       });
  //     }
  //   } catch (error) {
  //       const { notify }  = useNotification()
  //       notify({
  //         title: "Technical Issue",
  //         text: `Impossible to fetch list of countries at the moment. Issue: ${error}. Please reach out to Global Technical Sales`,
  //         duration: -1,
  //         type: 'error'
  //       })
  //   }
  // }
    
    async function fetchCountries() {
    
      const { execute } = useAxios(GLabsApiClient)
      const result = await execute('/countries')
      countries.value = result.data.value as IDriveCountry[]      
      if (result.error.value) {
        const { notify }  = useNotification()
        notify({
          title: "API Error",
          text: `Impossible to fetch the list of countries at the moment. Issue: ${result.error.value.toString()}. Please reach out to Global Technical Sales`,
          duration: -1,
          type: 'error'
        });
      }
    }
    
    
    
    
    
    // if (result.isFinished.value && !result.error.value) {
    //   countries.value = result.data.value as IDriveCountry[]
    // }
    
    // if (result.error.value) {
    //   const { notify}  = useNotification()
    //   notify({
    //     title: "Technical Issue",
    //     text: `Impossible to fetch list of countries at the moment. Issue: ${result.error.value.toString()}. Please reach out to Global Technical Sales`,
    //     duration: -1,
    //     type: 'error'
    //   });
    // }
  

  function selectCountry(id: number): IDriveCountry | undefined {
      return countries.value.find((country) => country.id == id)
  }
      // const res = await fetch(
      //   "http://7d026a29-91f9-4458-90fc-2707e0ff726e.mock.pstmn.io/api/users/me"
      // );
      //user.value = (await res.json()) as IDriveUser;
      //status.value = "LoggedIn";
      //customer.value = user.value?.customer;
      //orgs.value = user.value.orgs;


  return {
    countries,
    selectedCountry,
    getCountryCode,
    fetchCountries,
    selectCountry
  };
  // async updatePersonalProfile(user: IDriveUser)
});
