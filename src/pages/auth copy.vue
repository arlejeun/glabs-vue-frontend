<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import { useMsalAuthentication } from '@/composables/useMsalAuthentication'
import { InteractionType } from '@azure/msal-browser'
import { watch } from 'vue'
import { GLabsApiClient, GLABS_STORAGE, GLABS_TOKEN} from '@/apis/glabs'
import { callMsGraph } from "../utils/MsGraphApiCall";
import { loginRequest } from '@/plugins/msal/msalConfig'

const userStore = useUserStore()
const { user, status } = storeToRefs(userStore)

const isAuthenticated = useIsAuthenticated();
const {instance, accounts, inProgress} = useMsal();

const { result, acquireToken } = useMsalAuthentication(InteractionType.Redirect, loginRequest);

const data = ref(null);

async function updateData() {
    if (result.value?.idToken) {
        const apiResult = await callMsGraph(result.value.idToken)
        data.value = apiResult;
		    status.value = 'LoggedIn'
        GLABS_TOKEN.value = result.value?.idToken
        GLABS_STORAGE.value = {token: result.value?.idToken}
        //fetchUser()
        user.value = apiResult
        
      }
}

updateData();

watch(result, () => {
    // Fetch new data from the API each time the result changes (i.e. a new access token was acquired)
  updateData();

});

</script>

<template>
  <div class="workshops">
    <div class="main-div">

    <pre>{{GLABS_STORAGE}}</pre>

		<!-- <pre>{{isAuthenticated}}</pre>
		<pre>{{accounts}}</pre>
		<pre>{{inProgress}}</pre>
		<pre>{{result}}</pre>
		<pre>{{user}}</pre> -->

    </div>
  </div>
 
  <section class="">
	<div class="container">

	</div>
</section>

</template>

<style lang="scss">
  .title-text {
    text-align: left;
    color: var(--bs-primary)
  }
  .el-main .main-content {
      padding: 0px
  }

  .hightlight-section-content {
    padding-left: 1rem;
  }

  .image-icon {
    width: 150px;
    vertical-align: middle;
  }
  @media only screen and (min-width: 992px) {
    .hero-image {
      background-position: 66% 100%;
    }
  }
  @media only screen and (min-width: 768px)
  {
    .hero-image {
      background-position: 85% 100%;
    }
  }
</style>

<route lang="yaml">
meta:
  layout: BasicTopNavigationLayout
  title: Genesys Workshops Authentication
</route>
