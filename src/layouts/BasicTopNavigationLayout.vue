<script setup lang="ts">
import BasicFooter from '@/components/layouts/BasicFooter.vue';
import { useUserStore } from '@/stores/user'
import { BrowserAuthError, InteractionRequiredAuthError, InteractionStatus, InteractionType } from '@azure/msal-browser'
import { watch } from 'vue'
import { callMsGraph } from "../utils/MsGraphApiCall";
import { loginRequest } from '@/plugins/msal/msalConfig'
import { GLabsApiClient, GLABS_STORAGE, GLABS_TOKEN } from '@/apis/glabs'
import type { IDriveUser } from '@/interfaces';
import { useNotification } from "@kyvg/vue3-notification";


const { notify } = useNotification()

const userStore = useUserStore()
const { user, status } = storeToRefs(userStore)
const { fetchUser } = userStore

const isAuthenticated = useIsAuthenticated()
const { result, acquireToken } = useMsalAuthentication(InteractionType.Redirect, loginRequest);
const { instance, accounts, inProgress } = useMsal();


const state = reactive({
  resolved: false,
  data: {} as IDriveUser
});

async function getProfileData() {

  const response = await instance.acquireTokenSilent({...loginRequest }).catch(async (e) => {
    if (e instanceof InteractionRequiredAuthError) {
      await instance.acquireTokenRedirect(loginRequest);
    }
    console.log(e)
    // throw e;
  });
  if (inProgress.value === InteractionStatus.None) {
    GLABS_TOKEN.value = response?.idToken
    GLABS_STORAGE.value = {token: `${response?.idToken}` }
    fetchUser()
    // const graphData = await callMsGraph(response?.idToken);
    //state.data = graphData;
    state.resolved = true;
    stopWatcher();
  }


  //  if (result.value?.idToken) {
  //      const apiResult = await callMsGraph(result.value.idToken).catch(() => acquireToken());
  //      data.value = apiResult;
  //  		status.value = 'LoggedIn'
  //  }

  // if (isAuthenticated.value && result.value?.idToken && user.value?.id) {
  //   GLABS_TOKEN.value = result.value?.idToken
  //   GLABS_STORAGE.value = { token: result.value?.idToken }
  //   fetchUser()
  //   //const apiResult = await callMsGraph(result.value.idToken)
  //   //data.value = apiResult;
  //   status.value = 'LoggedIn'
  //   //fetchUser()
  //   //user.value = apiResult
  // }
}


onMounted(() => {
  if (isAuthenticated.value) {  
    getProfileData();
  }
})

// updateData();

const stopWatcher = watch(inProgress, () => {
  if (!state.resolved) {
    if (isAuthenticated.value) {
      console.log('Authenticated user')
      getProfileData();
    }
    // else {
    //   notify({
    //     title: "Authentication Required",
    //     text: `Please sign in first with your identity provider of choice`,
    //     duration: 2000,
    //     type: 'error'
    //   });

    // }
  }
});

// watch(result, () => {
//   // Fetch new data from the API each time the result changes (i.e. a new access token was acquired)
//   getProfileData();
// });

</script>

<template>
  <div class="main-layout">
    <pre>Authenticated MSAL: {{ isAuthenticated }} | In Progress: {{ inProgress }}</pre>
    <!-- <pre>Accounts MSAL: {{ accounts }}</pre> -->
    <pre>User Profile: {{ user.email }}</pre>

    <!-- <pre>Accounts Instance: {{instance}}</pre> -->
    <el-container class="pt-0">
      <BasicNavBar />
      <el-main class="main-content">
        <RouterView />
      </el-main>
      <el-footer class="footer">
        <BasicFooter />
      </el-footer>
    </el-container>
  </div>
</template>

<style>
.main-header {
  background-color: var(--el-color-primary);
  padding: 0 0 0 0;
  padding-right: 0;
  top: 0;
}

.main-layout {
  position: relative;
  min-height: 100vh;
}

.main-content {
  padding: 0 0 0 0;
}

.footer {
  background-color: var(--el-color-info);
  font-family: AmazonEmberBold, Helvetica, Arial, "Sans-Serif";
  /* padding: 15px 0; */
  position: absolute;
  bottom: 5px;
  width: 100%;
  height: 2.5 rem;
}


* {
  --el-color-success: #0cbc87;
  --el-color-danger: #d6293e;
  --el-color-primary: #23395D
}
</style>
