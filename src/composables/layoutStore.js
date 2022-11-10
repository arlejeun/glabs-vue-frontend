// store.js
import { createGlobalState, useStorage } from '@vueuse/core'
export const useLayoutGlobalState = createGlobalState(
  () => useStorage('data-theme', 'light'),
)
