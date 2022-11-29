//import { platformClient } from 'purecloud-platform-client-v2'
import platformClient from 'purecloud-platform-client-v2'
const routingApi = new platformClient.RoutingApi()
const authorizationApi = new platformClient.AuthorizationApi()
const notificationsApi = new platformClient.NotificationsApi()
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
    const data = await authorizationApi.getAuthorizationSubjectsMe()
    return data
  },

  async getUsersMe(opts: platformClient.UsersApi.getUsersMeOptions | undefined) {
    const data = await usersApi.getUsersMe( opts )
    return data
  },
  // Get the organization's queues.
  // NOTE: For this sample only get the first 100.
  
}