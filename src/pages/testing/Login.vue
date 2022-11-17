<template>
    <form @submit.prevent="login">
      <label>Email</label>
      <input type="email" v-model="email" />
      <label>Password</label>
      <input type="password" v-model="password" />
      <button type="submit">Login</button>
    </form>
  </template>
  
  <script lang="ts">
  import { useUserStore } from "@/stores/user";
  export default {
    setup() {
      const userStore = useUserStore();
      return { userStore };
    },
    data() {
      return {
        email: "",
        password: "",
      };
    },
    methods: {
      async login() {
        await this.userStore.signIn(this.email, this.password);
      },
    },
  };
  </script>