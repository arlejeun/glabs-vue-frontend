<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'
import { useUserStore } from '@/stores/user'
import type { IDriveUser } from "@/interfaces";
import type { Ref } from 'vue';

const userStore = useUserStore()
const myUser = storeToRefs(userStore).user as Ref<IDriveUser>


const formSize = ref('large')
const ruleFormRef = ref<FormInstance>()
// const ruleForm = reactive({
//   firstName: 'Arnaud',
//   lastName: 'Lejeune',
//   email: '',
//   phone: '',
//   company: '',
//   status: '',
//   country: '',
//   accessGroups: ['Public Demos']
// })

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
      //userStore.updatePersonalProfile(myUser)
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
            <div class="progress-bar bg-success aos" role="progressbar" data-aos="slide-right" data-aos-delay="200"
              data-aos-duration="1000" data-aos-easing="ease-in-out" style="width: 85%" aria-valuenow="85"
              aria-valuemin="0" aria-valuemax="100">
              <span class="progress-percent-simple h6 fw-light ms-auto">85%</span>
            </div>
          </div>
          <p class="mb-0">Get the best out of booking by adding the remaining details!</p>
        </div>
        <!-- Content -->
        <div class="bg-body rounded p-3 mt-3">
          <ul class="list-inline hstack flex-wrap gap-2 justify-content-between mb-0">
            <li class="list-inline-item h6 fw-normal mb-0"><a href="#"><i
                  class="bi bi-check-circle-fill text-success me-2"></i>Verified Email</a></li>
            <li class="list-inline-item h6 fw-normal mb-0"><a href="#"><i
                  class="bi bi-check-circle-fill text-success me-2"></i>Verified Mobile Number</a></li>
            <li class="list-inline-item h6 fw-normal mb-0"><a href="#" class="text-primary"><i
                  class="bi bi-plus-circle-fill me-2"></i>Complete Basic Info</a></li>
          </ul>
        </div>
      </div>

      <!-- Personal info START -->
      <div class="card border">
        <!-- Card header -->
        <div class="card-header border-bottom">
          <h4 class="card-header-title">Personal Information</h4>
        </div>

        <!-- Card body START -->
        <div class="card-body">
          <!-- Form START -->

          <el-form ref="ruleFormRef" :model="myUser" :rules="rules" label-width="120px" label-position="top"
            class="demo-ruleForm" :size="formSize" status-icon>
            <el-row :gutter="20">
              <el-col :span="12">
              <el-form-item label="First Name" prop="first_name">
                <el-input v-model="myUser.first_name" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="Last Name" prop="last_name">
                <el-input v-model="myUser.last_name" />
              </el-form-item>
            </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
              <el-form-item label="Company" prop="company">
                <el-input v-model="myUser.company" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="Country" prop="country">
                <el-input v-model="myUser.country" />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
              <el-col :span="12">
              <el-form-item label="Email" prop="email">
                <el-input v-model="myUser.contact_email" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="Phone Number" prop="state">
                <el-input v-model="myUser.phone" />
              </el-form-item>
            </el-col>
          </el-row>


          <el-row :gutter="20">
              <el-col :span="24">

              </el-col>
          </el-row>
           
           
            <el-form-item>
              <el-button type="primary" @click="submitForm(ruleFormRef)">Save</el-button>
              <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
            </el-form-item> 
          </el-form>

          <!-- Form END -->
        </div>
        <!-- Card body END -->

        
      </div>
      <!-- Personal info END -->

    

    </div>
  </div>
  <!-- Main content END -->
</template>

<style>

</style>
