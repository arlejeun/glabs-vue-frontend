import axios from 'axios'

console.log('GLABS API URL : ' + import.meta.env.VITE_GLABS_API_URL)
console.log('JIRA MIDDLEWARE API URL : ' + import.meta.env.VITE_JIRA_MIDDLEWARE_API_URL)

const JIRA_TOKEN = import.meta.env.VITE_JIRA_TOKEN

const GLABS_STORAGE = useStorage('glabs', {
  token: ''
})

const GLABS_TOKEN = ref(GLABS_STORAGE.value.token)


const jira_access_token = ref(JIRA_TOKEN)


const GDEMO_BASE_URL = import.meta.env.VITE_GLABS_API_URL || 'https://api.GitHub.com/'
const JIRA_MIDDLEWARE_API_URL = import.meta.env.VITE_JIRA_MIDDLEWARE_API_URL || 'https://api.GitHub.com/'

const GLabsApiClient = axios.create({
    baseURL: GDEMO_BASE_URL,
    timeout: 10 * 1000,
    headers: {
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + GLABS_TOKEN.value
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


export { GLabsApiClient, GLABS_STORAGE, GLABS_TOKEN, JiraMiddlewareApiClient }