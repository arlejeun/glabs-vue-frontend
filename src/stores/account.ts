import { defineStore } from 'pinia';
import apis from '@/apis';
import { removeToken, getToken } from '@/utils/token';

interface AccountInfo {
    username: string;
    [prop: string]: any;
}

interface AccountState {
    userInfo: AccountInfo | null;
}

export const useAccountStore = defineStore({
    id: 'account',
    state(): AccountState {
        return {
            userInfo: null,
        };
    },
    getters: {
        isLogin: (state: AccountState) => !!state.userInfo,
    },
    actions: {
        async initUser() {
            const token = getToken();
            if (token) {
                const res = await apis.getUser()
                if (res.data.code === 0) {
                    this.updateUser(res?.data.data);
                }
            }
        },
        updateUser(userInfo: AccountInfo | null) {
            if (!userInfo) {
                removeToken();
            }
            this.userInfo = userInfo;
        },
    },
});