// /store/user.js

import { defineStore } from "pinia";
import type {
  IDriveUser

} from "@/interfaces";

 import { useNotification } from "@kyvg/vue3-notification";

export const useSocketStore = defineStore("socket", () => {

  const { notify}  = useNotification()

  const displayNotification = ((event: string) => {
    console.log(event);
    notify({
          title: 'Server Update',
          text: event,
          duration: -1,
          type: 'info'
        });
  })
  

  // state properties vue composition of store
  const user = ref({} as IDriveUser);
  const messages = ref([] as string[])


  // computed properties vue composition of store
  const getUserId = computed(() => {
    return user.value.id;
  });
  
 
  //
  async function notifyUser(info: any) {
    messages.value.push(info)
    displayNotification(info)
  }

    //}

    
      // const res = await fetch(
      //   "http://7d026a29-91f9-4458-90fc-2707e0ff726e.mock.pstmn.io/api/users/me"
      // );
      //user.value = (await res.json()) as IDriveUser;
      //status.value = "LoggedIn";
      //customer.value = user.value?.customer;
      //orgs.value = user.value.orgs;



  return {
    user,
    messages,
    notifyUser,
    getUserId
  }

  // async updatePersonalProfile(user: IDriveUser)
});
