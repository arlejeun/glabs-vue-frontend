<script setup lang="ts">

import type { FormInstance, FormRules, ElProgress } from 'element-plus'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
const { user } = storeToRefs(userStore)

const createdDate = computed(() => {
  return user.value?.date_created ?
    useDateFormat(user.value?.date_created, 'YYYY-MM-DD H:mma').value
    : 'N/A'
})

const isEmailVerified = computed(() => {
  return !!user.value.email
})

const isStatusActive = computed(() => {
  return user.value.status == 'Active'
})

const isAlreadyLoggedIn = computed(() => {
  return loginDate.value != 'N/A'
})

const createdAgo = computed(() => {
  return user.value?.date_created ?
    useTimeAgo(user.value?.date_created).value
    : 'N/A'
})

const updatedAgo = computed(() => {
  return user.value?.date_updated ?
    useTimeAgo(user.value?.date_updated).value
    : 'N/A'
})

const updatedDate = computed(() => {
  return user.value?.date_updated ?
    useDateFormat(user.value?.date_updated, 'YYYY-MM-DD H:mma').value
    : 'N/A'
})

const approvedDate = computed(() => {
  return user.value?.type == 'Internal' ?
    useDateFormat(user.value?.date_created, 'YYYY-MM-DD H:mma').value
    : (user.value?.date_approved ? useDateFormat(user.value?.date_approved, 'YYYY-MM-DD H:mma').value : 'N/A')
})

const approvedAgo = computed(() => {
  return user.value?.type == 'Internal' ?
    useTimeAgo(user.value?.date_created).value
    : (user.value?.date_approved ? useTimeAgo(user.value?.date_approved).value : 'N/A')
})

const loginDate = computed(() => {
  return user.value?.date_lastLogin ?
    useDateFormat(user.value?.date_lastLogin, 'YYYY-MM-DD H:mma').value
    : 'N/A'
})

const loginAgo = computed(() => {
  return user.value?.date_lastLogin ?
    useTimeAgo(user.value?.date_lastLogin).value
    : 'N/A'
})

const profileScoreProgress = computed(() => {
  return [{ val: 25, status: isEmailVerified.value }, { val: 25, status: isStatusActive.value }, { val: 25, status: isAlreadyLoggedIn.value }].reduce((res, item) => item.status ? res + item.val : res, 25)
})

const expiredDate = computed(() => {
  return user.value?.date_expired ?
    useDateFormat(user.value?.date_expired, 'YYYY-MM-DD H:mma')
    : "N/A"
})

const expiredAgo = computed(() => {
  return user.value?.date_expired ?
    useTimeAgo(user.value?.date_expired).value
    : 'N/A'
})

const activities = computed(() => {
  return [

    {
      content: 'User expired - ' + expiredAgo.value,
      timestamp: expiredDate.value,
      type: 'danger',
      hollow: true
    },
    {
      content: 'Last Login - ' + loginAgo.value,
      timestamp: loginDate.value,
      color: '#0bbd87',
    },
    {
      content: 'User updated - ' + updatedAgo.value,
      timestamp: updatedDate.value,
      type: 'primary',
      hollow: true,
    },
    {
      content: 'User approved - ' + approvedAgo.value,
      timestamp: approvedDate.value,
      type: 'primary',
      hollow: true,
    },
    {
      content: 'User created - ' + createdAgo.value,
      timestamp: createdDate.value,
      type: 'primary',
      hollow: true,
    }
  ]
})

const statusOptions = [
  { value: '', label: 'Unknown' },
  { value: 0, label: 'NeedsApproval' },
  { value: 10, label: 'Awaiting Confirmation' },
  { value: 30, label: 'Rejected' },
  { value: 40, label: 'Disabled' },
  { value: 50, label: 'Active' }
]

const typeOptions = [
  { value: 1, label: 'Unknown' },
  { value: 2, label: 'Internal' },
  { value: 3, label: 'Partner' },
  { value: 4, label: 'Customer' },
  { value: 5, label: 'Prospect' },
]
const formSize = ref('large')
const personalFormRef = ref<FormInstance>()
const restrictedFormRef = ref<FormInstance>()
const rules = reactive<FormRules>({
  first_name: [
    { required: true, message: 'Please input first name', trigger: 'blur' },
    { min: 2, max: 30, message: 'Length should be 2 to 30', trigger: 'blur' },
  ],
  last_name: [
    { required: true, message: 'Please input last name', trigger: 'blur' },
    { min: 2, max: 30, message: 'Length should be 2 to 30', trigger: 'blur' },
  ],
  company: [
    { required: true, message: 'Please input last name', trigger: 'blur' },
    { min: 2, max: 30, message: 'Length should be 2 to 30', trigger: 'blur' },
  ],
  country: [
    {
      required: true,
      message: 'Please select Country',
      trigger: 'change',
    },
  ]
})

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      //userStore.updatePersonalProfile(user)
      console.log('submit!')
    } else {
      console.log('error submit!', fields)
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

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
          <el-progress v-show="profileScoreProgress == 75" :text-inside="true" :stroke-width="26" :percentage="profileScoreProgress" />
          <el-progress v-show="profileScoreProgress == 100" :text-inside="true" :stroke-width="24" :percentage="profileScoreProgress" status="success" />
          <el-progress v-show="profileScoreProgress == 50" :text-inside="true" :stroke-width="22" :percentage="profileScoreProgress" status="warning" />
          <el-progress v-show="profileScoreProgress == 25" :text-inside="true" :stroke-width="profileScoreProgress"
            :percentage="25" status="exception" />
          <!-- </div> -->


        </div>
        <!-- Content -->
        <div class="bg-body rounded p-3 mt-3">
          <ul class="list-inline hstack flex-wrap gap-2 justify-content-between mb-0">
            <li class="list-inline-item h6 fw-normal mb-0"><a href="#"><i class="bi bi-check-circle-fill me-2"
                  :class="[isEmailVerified ? 'text-success' : 'text-danger']"></i>Verified Email</a></li>
            <li class="list-inline-item h6 fw-normal mb-0"><a href="#"><i class="bi bi-check-circle-fill me-2"
                  :class="[isStatusActive ? 'text-success' : 'text-danger']"></i>Active Status</a></li>
            <li class="list-inline-item h6 fw-normal mb-0"><a href="#" class="text-primary"><i
                  class="bi bi-check-circle-fill me-2"
                  :class="[isAlreadyLoggedIn ? 'text-success' : 'text-danger']"></i>Already LoggedIn</a></li>
          </ul>
        </div>
      </div>

      <!--- Test -->
      <div class="row">
        <div class="col">

          <!-- Personal info START -->
          <div class="card border">
            <!-- Card header -->
            <div class="card-header border-bottom">
              <h4 class="card-header-title">Personal Information</h4>
            </div>

            <!-- Card body START -->
            <div class="card-body">
              <!-- Form START -->

              <el-form ref="personalFormRef" :model="user" :rules="rules" label-width="120px" label-position="top"
                class="demo-ruleForm" :size="formSize" status-icon>
                <el-row :gutter="20">
                  <el-col :span="12">
                    <el-form-item label="First Name" prop="first_name">
                      <el-input v-model="user.first_name" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="Last Name" prop="last_name">
                      <el-input v-model="user.last_name" />
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="12">
                    <el-form-item label="Job Function" prop="job">
                      <el-input v-model="user.job_function" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="Company" prop="company">
                      <el-input v-model="user.company" />
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="20">

                  <el-col :span="12">
                    <el-form-item label="Country" prop="country">
                      <el-input v-model="user.country" />
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row :gutter="20">
                  <el-col :span="12">
                    <el-form-item label="Email" prop="email">
                      <el-input v-model="user.email" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="Phone Number" prop="phone">
                      <el-input v-model="user.phone_number" />
                    </el-form-item>
                  </el-col>
                </el-row>


                <el-row :gutter="20">
                  <el-col :span="24">

                  </el-col>
                </el-row>


                <el-form-item>
                  <el-button type="primary" @click="submitForm(personalFormRef)">Save</el-button>
                  <el-button @click="resetForm(personalFormRef)">Reset</el-button>
                </el-form-item>
              </el-form>

              <!-- Form END -->
            </div>
            <!-- Card body END -->


          </div>
          <!-- Personal info END -->

                <!-- Restricted info START -->
      <div class="card border">
        <!-- Card header -->
        <div class="card-header border-bottom">
          <h4 class="card-header-title">Restricted Information</h4>
        </div>

        <!-- Card body START -->
        <div class="card-body">
          <!-- Form START -->

          <el-form ref="restrictedFormRef" :model="user" label-width="120px" label-position="top" class="demo-ruleForm"
            :size="formSize" status-icon>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="Status" prop="">
                  <el-select disabled v-model="user.status" class="" placeholder="Status">
                    <el-option v-for="item in statusOptions" :key="item.value" :label="item.label"
                      :value="item.label" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="User Profile" prop="">
                  <el-select disabled v-model="user.type" class="" placeholder="Type">
                    <el-option v-for="item in typeOptions" :key="item.value" :label="item.label" :value="item.label" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">

              </el-col>
            </el-row>
            <el-row :gutter="20" class="mt-2 mb-2 ">
              <h5>Groups</h5>
            </el-row>
            <el-row :gutter="20" class="mb-4">
              <el-tag v-for="item in user.groups" :key="item.id" class="m-2" type="info">{{ item.name }}</el-tag>
            </el-row>


            <el-form-item>
              <el-button type="primary" @click="submitForm(restrictedFormRef)">Save</el-button>
              <el-button @click="resetForm(restrictedFormRef)">Reset</el-button>
            </el-form-item>
          </el-form>

          <!-- Form END -->
        </div>
        <!-- Card body END -->


      </div>
      <!-- Restricted info END -->


        </div>

        <div v-show="createdAgo != 'N/A'" class="col-auto">
          <!-- Timeline Experimentation -->
          <el-timeline>
            <template v-for="(activity, index) in activities" :key="index">
              <el-timeline-item v-show="activity.timestamp != 'N/A'" :type="activity.type" :color="activity.color"
                :hollow="activity.hollow" :timestamp="activity.timestamp">
                {{ activity.content }}
              </el-timeline-item>
            </template>
          </el-timeline>

          <!-- End of Timeline -->
        </div>
      </div>

    </div>
  </div>
  <!-- Main content END -->
</template>


<style scoped>
.demo-progress .el-progress--line {
  margin-bottom: 15px;
}
</style>