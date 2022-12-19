import { defineStore } from "pinia";
import { useNotification } from "@kyvg/vue3-notification";
import { handleAxiosError } from "@/utils/axios";
import genesysService from '@/services/genesyscloud-service'
import type platformClient from 'purecloud-platform-client-v2'

export const useWorkspaceStore = defineStore("workspace", () => {
  // const router = useRouter();
  const { notify } = useNotification();
  const isTokenActive = ref(false);
  const gtsAvailableOrgs = ref([]);
  const genesysUserToken = ref("");
  const genesysUserPermissions = ref({} as platformClient.Models.AuthzSubject | undefined);
  const genesysUser = ref({} as platformClient.Models.UserMe | undefined);
  const genesysOrg = ref({} as platformClient.Models.Organization | undefined);

  const hasAdminPermission = computed(() => genesysUserPermissions.value);

  function setupUserToken(token: string) {
    genesysUserToken.value = token
    isTokenActive.value = true
  }
  
  async function getActiveOrg() {
    try {
      genesysOrg.value = await genesysService.getOrganizationsMe()
    } catch (err) {
      notify({
        title: "Get Organization detail",
        text: `${handleAxiosError(err,"Please request Organization read permission to your Genesys Cloud Administrator")}`,
        duration: -1,
        type: "warn",
      });
    }
  }

  async function getActiveUser() {
    try {
      genesysUser.value = await genesysService.getUsersMe()
    } catch (err) {
      notify({
        title: "Get my Cloud User detail",
        text: `${handleAxiosError(err,"Please try to log in again.")}`,
        duration: -1,
        type: "error",
      });
    }
  }

  async function getActiveUserPermissions() {
    try {
      genesysUserPermissions.value = await genesysService.getAuthorizationSubjectsMe()
    } catch (err) {
      notify({
        title: "Get my cloud User permissions",
        text: `${handleAxiosError(err,"Please try to log in again.")}`,
        duration: -1,
        type: "error",
      });
    }
  }

  async function resetInfo() {
    const gsysCloudStoredToken = useStorage('gsys-token', {region:'', access_token: '', login_url: '' })
    gsysCloudStoredToken.value.access_token = ''
    genesysUserToken.value = ''
    isTokenActive.value = false
  }


  return {
    gtsAvailableOrgs,
    genesysUserToken,
    genesysUserPermissions,
    genesysUser,
    genesysOrg,
    hasAdminPermission,
    isTokenActive,
    getActiveOrg,
    getActiveUser,
    getActiveUserPermissions,
    setupUserToken,
    resetInfo
  };

  // async updatePersonalProfile(user: IDriveUser)
});
