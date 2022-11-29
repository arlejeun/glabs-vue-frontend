<script setup lang="ts">

import type { FormInstance, FormRules, ElProgress } from 'element-plus'
import { useUserStore } from '@/stores/user'
import { useCountryStore } from '@/stores/country'
import type { IDriveUser } from '@/interfaces';


const userStore = useUserStore()
const { user } = storeToRefs(userStore)
const { updateUserProfile } = userStore

const countryStore = useCountryStore()
const {countries, getCountryCode} = storeToRefs(countryStore)
const { fetchCountries, selectCountry } = countryStore

//Initialize countries only at the beginning
if (countries.value?.length == 0) fetchCountries()

const createdDate = computed(() => {
  return user.value?.date_created ?
    useDateFormat(user.value?.date_created, 'YYYY-MM-DD H:mma').value
    : 'N/A'
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
  email: [
    {
      type: 'string',
      required: true,
      pattern:
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      message: 'Please enter email address',
      trigger: 'blur',
    },
    { min: 3, message: 'Please enter email', trigger: 'blur' },
  ],
  phone_number: [
    {
      required: true,
      pattern: /^\+?\d{10,14}$/,
      message: 'Please enter Phone number e.164 format',
      trigger: 'blur'
    },
    { min: 3, message: 'Please enter email', trigger: 'blur' },
  ],
  company: [
    { required: true, message: 'Please input last name', trigger: 'blur' },
    { min: 2, max: 30, message: 'Length should be 2 to 30', trigger: 'blur' },
  ],
  country_id: [
    {
      required: true,
      message: 'Please select Country',
      trigger: 'change',  
    },
  ]
})

//TODO: Check country code matches with phone number
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      //userStore.updatePersonalProfile(user)
      updateCountryUser()
      updateUserProfile()
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

const updateCountryUser = () => {
  console.log(user.value?.country_id);
  selectCountry(user.value?.country_id)

}

</script>

<template>
  <!--- Profile Form -->
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
                    <el-form-item label="Country" prop="country_id">
                      <el-select v-model="user.country_id" filterable placeholder="Select Country" >
                        <el-option
                            v-for="item in countries"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id"
                          />
                        </el-select>
                      <!-- <el-input v-model="user.country" /> -->
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
                    <el-form-item label="Phone Number" prop="phone_number">
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
  <!-- Main content END -->
</template>


<style scoped>
.demo-progress .el-progress--line {
  margin-bottom: 15px;
}
</style>