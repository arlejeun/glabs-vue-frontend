<script setup lang="ts">
import BasicFooter from '@/components/layouts/BasicFooter.vue';
import { useUserStore } from '@/stores/user'
import { useMsalAuthentication } from '@/composables/useMsalAuthentication'
import { InteractionType } from '@azure/msal-browser'
import { watch } from 'vue'
import { callMsGraph } from "../utils/MsGraphApiCall";
import { loginRequest } from '@/plugins/msal/msalConfig'

// const userStore = useUserStore()
// const { user, status } = storeToRefs(userStore)

// const { result, acquireToken } = useMsalAuthentication(InteractionType.Redirect, loginRequest);

// const data = ref(null);

// async function updateData() {
//     if (result.value?.idToken) {
//         const apiResult = await callMsGraph(result.value.idToken).catch(() => acquireToken());
//         data.value = apiResult;
//     		status.value = 'LoggedIn'
//     }
// }

// updateData();

// watch(result, () => {
//     // Fetch new data from the API each time the result changes (i.e. a new access token was acquired)
//     updateData();
// });

</script>

<template>
  <div class="main-layout">
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
  --el-color-danger:  #d6293e;
  --el-color-primary: #23395D
}

</style>
