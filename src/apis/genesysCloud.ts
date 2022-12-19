import { useAxios } from '@vueuse/integrations/useAxios'
import { useStorage} from '@vueuse/core'
import { useRouteHash } from '@vueuse/router'
import { stringBetweenStrings, getParameterByName } from '@/utils/string'
import axios from 'axios'

const gsysCloudToken = useStorage('gsys-token', {region:'', access_token: '', login_url: '' })
const genesysToken = ref(gsysCloudToken.value.access_token)
const loginUrl = ref(gsysCloudToken.value.login_url)

const regions = [
  {
    value: 'us-east-1',
    label: 'Americas (US East)',
    url: 'https://login.mypurecloud.com'
  },
  {
    value: 'us-east-2',
    label: 'Americas (US East 2)',
    url: 'https://login.use2.us-gov-pure.cloud'
  },
  {
    value: 'us-west-2',
    label: 'Americas (US West)',
    url: 'https://login.usw2.pure.cloud'
  },
  {
    value: 'ca-central-1',
    label: 'Americas (Canada)',
    url: 'https://login.cac1.pure.cloud'
  },
  {
    value: 'sa-east-1',
    label: 'Americas (São Paulo)',
    url: 'https://login.sae1.pure.cloud'
  },
  {
    value: 'eu-central-1',
    label: 'EMEA (Frankfurt)',
    url: 'https://login.mypurecloud.de'
  },
  {
    value: 'eu-west-1',
    label: 'EMEA (Dublin)',
    url: 'https://login.mypurecloud.ie'
  },
  {
    value: 'eu-west-2',
    label: 'EMEA (London)',
    url: 'https://login.euw2.pure.cloud '
  },
  {
    value: 'ap-south-1',
    label: 'Asia Pacific (Mumbai)',
    url: 'https://login.aps1.pure.cloud'
  },
  {
    value: 'ap-northeast-2',
    label: 'Asia Pacific (Seoul)',
    url: 'https://login.apne2.pure.cloud'
  },
  {
    value: 'ap-southeast-2',
    label: 'Asia Pacific (Sydney)',
    url: 'https://login.mypurecloud.com.au'
  },
  {
    value: 'ap-northeast-1',
    label: 'Asia Pacific (Tokyo)',
    url: 'https://login.mypurecloud.jp'
  },
]

const GenesysCloudApiClient = axios.create({
    baseURL: '/',
    timeout: 5000,
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${genesysToken.value}`
    }
  });

const apiUrl = computed(() => { return loginUrl.value.replace('login','api')})

const routeHash = useRouteHash()

// Update the login/api url when region changes
watch(
  () => gsysCloudToken.value.region,
  (reg) => {
    loginUrl.value = getGenesysCloudLoginUrl(reg)
    gsysCloudToken.value.login_url = loginUrl.value
})


const {data, isFinished, execute, isLoading, error} = useAxios(GenesysCloudApiClient)

// Update token when route hash change in response to 
watchEffect(() => {
  console.log(routeHash.value)
  if (routeHash.value.includes('access_token')) {
    // genesysToken.value = stringBetweenStrings('access_token=', '&expire', routeHash.value)
    genesysToken.value = getParameterByName('access_token')
    gsysCloudToken.value.access_token = genesysToken.value
    routeHash.value = ''
    console.log(`API Url:  ${apiUrl.value}`)
    console.log(`Bearer ${genesysToken.value}`)
    execute(`${apiUrl.value}/api/v2/users/me`, {
        headers: {
          'Authorization': `Bearer ${genesysToken.value}`
        }
      })

    execute(`${apiUrl.value}/api/v2/authorization/permissions`, {
      headers: {
        'Authorization': `Bearer ${genesysToken.value}`
      }
    })
  }
})



function getGenesysCloudLoginUrl(region: string) : string {
  console.log(region)
  return regions.filter((reg) => {
    return reg.value == region
  })[0].url
}

// function loginWithGenesysCloud () {
//   //let url = getGenesysCloudLoginUrl(region.value)
//   // gsysCloudToken.value.login_url = url
//   console.log('login URL: ' + gsysCloudToken.value.login_url)
//   location.href = `${gsysCloudToken.value.login_url}/oauth/authorize?client_id=51dbce28-867f-459c-b38d-182fc1d446cc&response_type=token&redirect_uri=http://localhost:5173/environments`
// }
