import { handleAxiosError } from '@/utils/axios'
import { notify } from '@kyvg/vue3-notification'
import platformClient from 'purecloud-platform-client-v2'
const authorizationApi = new platformClient.AuthorizationApi()
const organizationApi = new platformClient.OrganizationApi()
const usersApi = new platformClient.UsersApi();
const client = platformClient.ApiClient.instance


export default {

  // Login to Genesys Cloud
  setAccessToken(token: string) {
    client.setAccessToken(token)
  },

  setEnvironment(env: string) {
    client.setEnvironment(env)
  },

  async getAuthorizationSubjectsMe() {
    try {
      const data = await authorizationApi.getAuthorizationSubjectsMe()
      return data  
    } catch (err) {
      notify({
        title: "Get my user permissions",
        text: `${handleAxiosError(err,"Please try to log in again.")}`,
        duration: -1,
        type: "error",
      });
    }

    
  },

  //async getUsersMe(opts: platformClient.UsersApi.getUsersMeOptions | undefined) {
    async getUsersMe() {
    try {
      const data = await usersApi.getUsersMe()
      return data  
    } catch (err) {
      notify({
        title: "Get my user information",
        text: `${handleAxiosError(err,"Please try to log in again.")}`,
        duration: -1,
        type: "error",
      });
    }
  },

  async getOrganizationsMe() {
    try {
      const data = await organizationApi.getOrganizationsMe()
      return data  
    } catch (err) {
      notify({
        title: "Get Organization detail",
        text: `${handleAxiosError(err,"Please try to log in again.")}`,
        duration: -1,
        type: "error",
      });
    }
  },
  // Get the organization's queues.
  // NOTE: For this sample only get the first 100.
  
}