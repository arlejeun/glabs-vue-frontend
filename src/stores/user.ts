import { defineStore } from 'pinia';
import apis from '@/apis';
import { removeToken, getToken } from '@/utils/token';

interface UserInfo {
    username: string;
    [prop: string]: any;
}

interface UserState {
    userInfo: UserInfo | null;
}

export const useUserStore = defineStore({
    id: 'user',
    state(): UserState {
        return {
            userInfo: null,
        };
    },
    getters: {
        isLogin: (state: UserState) => !!state.userInfo,
    },
    actions: {
        async initUser() {
            const token = getToken();
            if (token) {
                const res = await apis.getUser();
                if (res.data?.code === 0) {
                    this.updateUser(res?.data.data);
                }
            }
        },
        updateUser(userInfo: UserInfo | null) {
            if (!userInfo) {
                removeToken();
            }
            this.userInfo = userInfo;
        },
    },
});