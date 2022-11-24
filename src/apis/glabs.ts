import axios from 'axios'

console.log('GLABS API URL : ' + import.meta.env.VITE_GLABS_API_URL)
console.log('JIRA MIDDLEWARE API URL : ' + import.meta.env.VITE_JIRA_MIDDLEWARE_API_URL)

const gdemo_access_token = ref('Bearer myToken')
const jira_access_token = ref('Bearer 1e097807-3d60-4fba-9fef-c270581c9d1b')


const GDEMO_BASE_URL = import.meta.env.VITE_GLABS_API_URL || 'https://api.GitHub.com/'
const JIRA_MIDDLEWARE_API_URL = import.meta.env.VITE_JIRA_MIDDLEWARE_API_URL || 'https://api.GitHub.com/'

const DriveApiClient = axios.create({
    baseURL: GDEMO_BASE_URL,
    timeout: 1000,
    headers: {
      'Accept': 'application/json',
      'Authorization': gdemo_access_token.value
    }
  });

  const JiraMiddlewareApiClient = axios.create({
    baseURL: JIRA_MIDDLEWARE_API_URL,
    timeout: 1000,
    headers: {
      'Accept': 'application/json',
      'Authorization': jira_access_token.value
    }
  });


export { DriveApiClient, JiraMiddlewareApiClient }