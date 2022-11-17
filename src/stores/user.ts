// /store/user.js

import { defineStore } from "pinia";
import type { IDriveUser, IDriveCustomer } from "@/interfaces";

export const useUserStore = defineStore('identity', {
  state: () => ({
    user: {} as IDriveUser,
    status: 'LoggedOut',
    token: ''
  }),
  getters: {
    getCustomerProfile(): IDriveCustomer {
      return {...this.user.customer}
    }
  },
  actions: {
    async fetchUser() {
      const res = await fetch("http://7d026a29-91f9-4458-90fc-2707e0ff726e.mock.pstmn.io/api/users/me");
      const user = await res.json() as IDriveUser;
      this.user = {...user};
      this.status = 'LoggedIn'
    },
    async signUp(email: String, password: String) {
      const res = await fetch("https://localhost:3000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const user = await res.json()
      this.user = user;
    },
    async signIn(email: String, password: String) {
      const res = await fetch("https://localhost:3000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const user = await res.json();
      this.user = user;
    },
    async logout() {
      //call msal library
      this.user = {} as IDriveUser;
      this.status = 'LoggedOut'
    },
    // async updatePersonalProfile(user: IDriveUser) {

    // }
  },
});