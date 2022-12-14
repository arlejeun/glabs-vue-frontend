<script lang="ts" setup>
import type { IDriveBaseUser, IDriveUser } from '@/interfaces';

import { Edit, Picture, UploadFilled } from '@element-plus/icons-vue'
import { GLABS_TOKEN } from '@/apis/glabs'
import { useMsal } from "@/composables/useMsal";
import type Token from 'markdown-it/lib/token';
import type { AccountInfo } from '@azure/msal-common';
// import jwt_decode from 'jwt-decode';

const decodeToken4User = (msalAccount: AccountInfo[]) => {
  let userTemp = {} as IDriveBaseUser
  userTemp.first_name = msalAccount?.[0]?.idTokenClaims?.given_name as string
  userTemp.last_name = msalAccount?.[0]?.idTokenClaims?.family_name as string
  userTemp.idp = msalAccount?.[0]?.idTokenClaims?.idp as string
  userTemp.email = msalAccount?.[0]?.idTokenClaims?.emails?.[0] as string
  return userTemp
}
const { accounts } = useMsal();
const registrationUser = ref({} as IDriveBaseUser)

onMounted(() => {
  // console.log(GLABS_TOKEN.value)
  // console.log('On mounted : ' + JSON.stringify(accounts.value))
  // const decoded = jwt_decode(GLABS_TOKEN.value)
  // console.log(decoded);

})

watchEffect(() => {
  console.log('On Watch : ' + JSON.stringify(accounts.value))
  registrationUser.value = decodeToken4User(accounts.value)
  console.log('Registration watch: ' + GLABS_TOKEN.value)
})
</script>


<template>
  <!-- **************** MAIN CONTENT START **************** -->
  <main>
    <!-- ======================= Content START -->
    <section class="pt-3">
      <div class="container">
        <div class="row mb-4">

          <el-steps :active="0" process-status="process" finish-status="success" simple style="margin-top: 20px">
            <el-step title="Specify your profile" />
            <el-step title="Create customer record" />
            <el-step title="Account activation" />
          </el-steps>

        </div>

        <div class="row">
          <AccountProfile />
        </div>
        <!-- <SidebarAccount /> -->
      </div>
    </section>
    <!-- =======================
  Content END -->
  <pre>{{accounts}}</pre>

  </main>
  <!-- **************** MAIN CONTENT END **************** -->

</template>
  
<style>
@media (min-width: 1024px) {
  .container.profile {
    max-width: 80%;
  }
}
</style>
  
<route lang="yaml">
  meta:
    layout: BasicTopNavigationLayout
    title: Account Profile
    requiresAuth: true
  </route>
    