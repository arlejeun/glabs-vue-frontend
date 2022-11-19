// store.js
import { createGlobalState, useStorage } from '@vueuse/core'
import { useUserStore } from '@/stores/user'
import type { IDriveUser } from "@/interfaces";
import type { Ref } from 'vue';

export const useGlobalState = createGlobalState(
  () => useStorage('vueuse-storage', 'initialValue'),
)
export const userStore = useUserStore()
// const userName = computed(() => `${userStore?.user?.first_name} ${userStore?.user?.last_name}`)
export const isLoggedIn = computed(() => userStore.status == 'LoggedIn')

export const myUser = storeToRefs(userStore).user as Ref<IDriveUser>

export const myUsername = computed(() => `${myUser.value?.first_name} ${myUser.value?.last_name}`)

export const getUserData = computed(() => `${myUser.value}`)