import { ref, watch, type Ref } from "vue";
import { useMsal } from "@/composables/useMsal";
import { useUserStore } from "@/stores/user";

const userStore = useUserStore()
const { status } = storeToRefs(userStore)

export function useIsAuthenticated(): Ref<boolean> {
    const { accounts } = useMsal();
    const isAuthenticated = ref(accounts.value.length > 0);
    
    watch(accounts, () => {
        isAuthenticated.value = accounts.value.length > 0;
        status.value = isAuthenticated.value ? 'LoggedIn' : 'LoggedOut'
    });

    return isAuthenticated;
}