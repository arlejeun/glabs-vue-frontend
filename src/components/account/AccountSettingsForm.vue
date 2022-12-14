<script setup lang="ts">

import type { FormInstance, FormRules, ElProgress } from 'element-plus'
import { useUserStore } from '@/stores/user'
import type { IDriveUser } from '@/interfaces';


const userStore = useUserStore()
const { user } = storeToRefs(userStore)
const { updateUserProfile } = userStore

const formSize = ref('large')
const settingsFormRef = ref<FormInstance>()
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


</script>

<template>

  <!-- Notifications START -->
  <div class="card border">
    <!-- Card header -->
    <div class="card-header border-bottom">
      <h4 class="card-header-title">Notification Settings</h4>
    </div>

    <!-- Form START -->
    <el-form ref="settingsFormRef" :model="user" :rules="rules" size="" label-position="left"
      class="card-body demo-ruleForm">

      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item label-width="80%" label="I would like to receive notifications from the Techniical Acceleration team">
            <el-switch v-model="user.settings.notifications" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row v-if="user.settings" :gutter="20">
        <el-col :span="24">
          <el-form-item label="Notifications channels">
            <el-checkbox-group v-model="user.settings.notifications_channels">
              <el-checkbox label="Email" name="type" />
              <el-checkbox label="Slack" name="type" />
            </el-checkbox-group>
          </el-form-item>
        </el-col>
      </el-row>

      <div class="pt-2 d-sm-flex justify-content-end">
        <el-form-item>
        <el-button type="primary" @click="submitForm(settingsFormRef)">Save changes</el-button>
        <el-button @click="resetForm(settingsFormRef)">Reset</el-button>
      </el-form-item>
      </div>

    
    </el-form>


    <form class="card-body">

      <!-- Switch -->
      <div class="form-check form-switch form-check-md d-flex justify-content-between mb-4">
        <label class="form-check-label ps-0 pe-4" for="checkPrivacy1">Send me email notifications about new
          features</label>
        <input class="form-check-input flex-shrink-0" type="checkbox" id="checkPrivacy1" checked>
      </div>

      <!-- Switch -->
      <div class="form-check form-switch form-check-md d-flex justify-content-between mb-4">
        <label class="el-form-item__label ps-0 pe-4" for="checkPrivacy2">I would like to receive booking assist
          reminders</label>
        <input class="form-check-input flex-shrink-0" type="checkbox" id="checkPrivacy2" checked>
      </div>

      <!-- Switch -->
      <div class="form-check form-switch form-check-md d-flex justify-content-between mb-4">
        <label class="form-check-label ps-0 pe-4" for="checkPrivacy3">I would like to receive emails about
          Booking promotions</label>
        <input class="form-check-input flex-shrink-0" type="checkbox" id="checkPrivacy3" checked>
      </div>

      <!-- Switch -->
      <div class="form-check form-switch form-check-md d-flex justify-content-between mb-4">
        <label class="form-check-label ps-0 pe-4" for="checkPrivacy7">I would like to know about information
          and offers related to my upcoming trip</label>
        <input class="form-check-input flex-shrink-0" type="checkbox" id="checkPrivacy7" checked>
      </div>

      <!-- Switch -->
      <div class="form-check form-switch form-check-md d-flex justify-content-between mb-4">
        <label class="form-check-label ps-0 pe-4" for="checkPrivacy4">Show your profile publicly</label>
        <input class="form-check-input flex-shrink-0" type="checkbox" id="checkPrivacy4">
      </div>

      <!-- Switch -->
      <div class="form-check form-switch form-check-md d-flex justify-content-between mb-4">
        <label class="form-check-label ps-0 pe-4" for="checkPrivacy6">Send SMS confirmation for all online
          payments</label>
        <input class="form-check-input flex-shrink-0" type="checkbox" id="checkPrivacy6">
      </div>

      <!-- Switch -->
      <div class="form-check form-switch form-check-md d-flex justify-content-between mb-4">
        <label class="form-check-label ps-0 pe-4" for="checkPrivacy5">Check which device(s) access your
          account</label>
        <input class="form-check-input flex-shrink-0" type="checkbox" id="checkPrivacy5" checked>
      </div>

      <!-- Button -->
      <div class="d-sm-flex justify-content-end">
        <button type="button" class="btn btn-sm btn-primary me-2 mb-0">Save changes</button>
        <a href="#" class="btn btn-sm btn-outline-secondary mb-0">Cancel</a>
      </div>
    </form>
    <!-- Form END -->
  </div>
  <!-- Notifications END -->
  <!--- Profile Form -->
  <!-- <div class="row">
        <div class="col">

          <div class="card mb-4 border">
            <div class="card-header border-bottom">
              <h4 class="card-header-title">Personal Information</h4>
            </div>

            <div class="card-body">

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

            </div>


          </div>




        </div>

        <div v-show="createdAgo != 'N/A'" class="col-auto">
          <el-timeline>
            <template v-for="(activity, index) in activities" :key="index">
              <el-timeline-item v-show="activity.timestamp != 'N/A'" :type="activity.type" :color="activity.color"
                :hollow="activity.hollow" :timestamp="activity.timestamp">
                {{ activity.content }}
              </el-timeline-item>
            </template>
          </el-timeline>

        </div>
      </div> 
    -->
</template>


<style scoped>
.demo-progress .el-progress--line {
  margin-bottom: 15px;
}
</style>