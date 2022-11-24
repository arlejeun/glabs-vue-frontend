// store.js
import { createGlobalState, useStorage } from '@vueuse/core'
import { useUserStore } from '@/stores/user'
import type { IDriveUser } from "@/interfaces";
import type { Ref } from 'vue';
import defaultAvatarUrl from '@/assets/images/avatar/01.jpg'

export const useGlobalState = createGlobalState(
  () => useStorage('vueuse-storage', 'initialValue'),
)
export const userStore = useUserStore()
// const userName = computed(() => `${userStore?.user?.first_name} ${userStore?.user?.last_name}`)
export const isLoggedIn = computed(() => userStore.status == 'LoggedIn')

export const { user, status, token } = storeToRefs(userStore)

export const username = computed(() => user.value.first_name ?  `${user.value?.first_name} ${user.value?.last_name}` : 'Anonymous')

export const userEmail = user.value?.email

export const avatarUrl = computed(() => user.value?.avatar_url || defaultAvatarUrl) 

export const isAdmin = computed(() => user.value?.is_admin)

export const getUserData = computed(() => `${user.value}`)

export const isStatusActive = computed(() =>  user.value?.status == 'Active')