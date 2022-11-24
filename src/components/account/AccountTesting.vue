<script setup lang="ts">

import type { FormInstance, FormRules, ElProgress } from 'element-plus'
import { useAxios } from '@vueuse/integrations/useAxios'
// import { useUserStore } from '@/stores/user'
import  {DriveApiClient, JiraMiddlewareApiClient } from '@/apis/glabs'
import { userEmail } from '@/composables/useUserInfo'

const {data, isFinished, isLoading, error} = useAxios('/users/me', DriveApiClient)
console.log(DriveApiClient);
console.log(data.value);
console.log(isFinished)

const {execute: jiraExecute, data: jiraData, isFinished: jiraIsFinished, isLoading: jiraIsLoading, error: jiraError} = useAxios(`/jira/servicedesk/gdemosupport/customer/issues?email=arnaud.lejeune@genesys.com`, JiraMiddlewareApiClient, {immediate: false})
console.log(DriveApiClient);
console.log(jiraData.value);
console.log(jiraError)
console.log(jiraIsFinished)

watch(isFinished, () => jiraExecute())

</script>

<template>
  <!-- Main content START -->
  <div class="col-lg-8 col-xl-9">
    <p>{{isFinished}}</p>
    <p>{{isLoading}}</p>
    <p>{{error}}</p>
    <pre>{{data}}</pre>
  </div>

  <div class="col-lg-8 col-xl-9">
    <p>{{jiraIsFinished}}</p>
    <p>{{jiraIsLoading}}</p>
    <p>{{jiraError}}</p>
    <pre>{{jiraData}}</pre>
  </div>
  <!-- Main content END -->
</template>


<style scoped>
.demo-progress .el-progress--line {
  margin-bottom: 15px;
}
</style>