<script setup lang="ts">

import type { ElProgress } from 'element-plus'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
const { user, isStatusActive, customer } = storeToRefs(userStore)

const isCustomerProfileReady = computed(() => {
  //TODO: Check email and phone are provided
  return customer.value?.identifiers?.length > 1
})

const isOrgProvisionned = computed(() => {
  return user.value?.orgs?.length > 0
})


const isAlreadyLoggedIn = computed(() => {
  return loginDate.value != 'N/A'
})

const loginDate = computed(() => {
  return user.value?.date_lastLogin ?
    useDateFormat(user.value?.date_lastLogin, 'YYYY-MM-DD H:mma').value
    : 'N/A'
})

const profileScoreProgress = computed(() => {
  return [{ val: 25, status: isStatusActive.value }, { val: 25, status: isCustomerProfileReady.value }, { val: 25, status: isOrgProvisionned.value }, { val: 25, status: isAlreadyLoggedIn.value }].reduce((res, item) => item.status ? res + item.val : res, 0)
})

</script>

<template>
  <!-- Main content START -->
  <div class="col-lg-8 col-xl-9">

    <!-- Offcanvas menu button -->
    <div class="d-grid mb-0 d-lg-none w-100">
      <button class="btn btn-primary mb-4" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasSidebar"
        aria-controls="offcanvasSidebar">
        <i class="fas fa-sliders-h"></i> Menu
      </button>
    </div>

    <div class="vstack gap-4">
      <!-- Verified message -->
      <div class="bg-light rounded p-3">
        <!-- Progress bar -->
        <div class="overflow-hidden">
          <h6 class="text-primary">Complete Your Profile</h6>
          <div class="progress progress-sm bg-success bg-opacity-10">
            <!-- 
            <div class="progress-bar bg-success aos" role="progressbar" data-aos="slide-right" data-aos-delay="200"
              data-aos-duration="1000" data-aos-easing="ease-in-out" style="width: 85%" aria-valuenow="85"
              aria-valuemin="0" aria-valuemax="100">
              <span class="progress-percent-simple h6 fw-light ms-auto">100%</span>
            </div>-->
          </div>

          <!-- <div class="demo-progress"> -->
          <el-progress v-if="profileScoreProgress == 75" :text-inside="true" :stroke-width="26" :percentage="profileScoreProgress" />
          <el-progress v-if="profileScoreProgress == 100" :text-inside="true" :stroke-width="24" :percentage="profileScoreProgress" status="success" />
          <el-progress v-if="profileScoreProgress == 50" :text-inside="true" :stroke-width="22" :percentage="profileScoreProgress" status="warning" />
          <el-progress v-if="profileScoreProgress == 25" :text-inside="true" :stroke-width="profileScoreProgress"
            :percentage="25" status="exception" />
          <!-- </div> -->


        </div>
        <!-- Content -->
        <div class="bg-body rounded p-3 mt-3">
          <ul class="list-inline hstack flex-wrap gap-2 justify-content-between mb-0">
            <li class="list-inline-item h6 fw-normal mb-0"><a href="#"><i class="bi bi-check-circle-fill me-2"
                  :class="[isStatusActive ? 'text-success' : 'text-danger']"></i>Active Status</a></li>
            <li class="list-inline-item h6 fw-normal mb-0"><a href="#"><i class="bi bi-check-circle-fill me-2"
                  :class="[isStatusActive ? 'text-success' : 'text-danger']"></i>Customer Profile</a></li>
            <li class="list-inline-item h6 fw-normal mb-0"><a href="#" class="text-primary"><i
            class="bi bi-check-circle-fill me-2"
            :class="[isAlreadyLoggedIn ? 'text-success' : 'text-danger']"></i>Active Organization</a></li>
            <li class="list-inline-item h6 fw-normal mb-0"><a href="#" class="text-primary"><i
              class="bi bi-check-circle-fill me-2"
              :class="[isAlreadyLoggedIn ? 'text-success' : 'text-danger']"></i>Already LoggedIn</a></li>
          </ul>
        </div>
      </div>

      <!--- Test -->
      <!-- <Suspense> -->
        <account-profile-form></account-profile-form>
        <!-- <template #fallback>
          Loading...
        </template>
      </Suspense> -->


    </div>
  </div>
  <!-- Main content END -->
</template>


<style scoped>
.demo-progress .el-progress--line {
  margin-bottom: 15px;
}
</style>