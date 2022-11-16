<script setup lang="ts">

import type { FormInstance, FormRules } from 'element-plus'

const formSize = ref('large')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive({
  firstName: 'Arnaud',
  lastName: 'Lejeune',
  emailWork: '',
  emailPersonal: '',
  emailOther: '',
  phoneWork:'',
  phoneCell:'',
  phoneHome: '',
  address: '',
  city: '',
  state: '',
  zipcode: '',
  country: ''
})

  const phoneNumber = ref()
  const results = ref()

const rules = reactive<FormRules>({
  name: [
    { required: true, message: 'Please input Activity name', trigger: 'blur' },
    { min: 2, max: 30, message: 'Length should be 2 to 30', trigger: 'blur' },
  ],
  country: [
    {
      required: true,
      message: 'Please select Country',
      trigger: 'change',
    },
  ],
  count: [
    {
      required: true,
      message: 'Please select Activity count',
      trigger: 'change',
    },
  ],
  date1: [
    {
      type: 'date',
      required: true,
      message: 'Please pick a date',
      trigger: 'change',
    },
  ],
  date2: [
    {
      type: 'date',
      required: true,
      message: 'Please pick a time',
      trigger: 'change',
    },
  ],
  type: [
    {
      type: 'array',
      required: true,
      message: 'Please select at least one activity type',
      trigger: 'change',
    },
  ],
  resource: [
    {
      required: true,
      message: 'Please select activity resource',
      trigger: 'change',
    },
  ],
  desc: [
    { required: true, message: 'Please input activity form', trigger: 'blur' },
  ],
})

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
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

const options = Array.from({ length: 10000 }).map((_, idx) => ({
  value: `${idx + 1}`,
  label: `${idx + 1}`,
}))

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
     

      <!-- Personal info START -->
      <div class="card border">
        <!-- Card header -->
        <div class="card-header border-bottom">
          <h4 class="card-header-title text-primary">Customer Information</h4>
        </div>

        <!-- Card body START -->
        <div class="card-body">

          <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="120px" label-position="top"
            class="demo-ruleForm" :size="formSize" status-icon>
            <el-row :gutter="20">
              <el-col :span="12">
              <el-form-item label="First Name" prop="name">
                <el-input v-model="ruleForm.firstName" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="Last Name" prop="name">
                <el-input v-model="ruleForm.lastName" />
              </el-form-item>
            </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="18">
              <el-form-item label="Address" prop="address">
                <el-input v-model="ruleForm.address" />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="Country" prop="country">
                <el-input v-model="ruleForm.country" />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
              <el-col :span="8">
              <el-form-item label="City" prop="city">
                <el-input v-model="ruleForm.city" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="State" prop="state">
                <el-input v-model="ruleForm.state" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="Zipcode" prop="zipcode">
                <el-input v-model="ruleForm.zipcode" />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
              <el-col :span="12">
              <el-form-item label="Work Email" prop="email">
                <el-input v-model="ruleForm.emailWork" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="Personal Email" prop="email">
                <el-input v-model="ruleForm.emailPersonal" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="Other Email" prop="email">
                <el-input v-model="ruleForm.emailOther" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
              <el-col :span="8">
              <el-form-item label="Work Phone" prop="phone">
                <el-input v-model="ruleForm.phoneWork" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="Cell Phone" prop="phone">
                <el-input v-model="ruleForm.phoneCell" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="Home Phone" prop="phone">
                <el-input v-model="ruleForm.phoneHome" />
              </el-form-item>
            </el-col>
          </el-row>
           <!-- <el-row :gutter="20">
              <el-col :span="12">
                <MazPhoneNumberInput
                    v-model="phoneNumber"
                    show-code-on-list
                    color="info"
                    :preferred-countries="['FR', 'BE', 'DE', 'US', 'GB']"
                    :ignored-countries="['AC']"
                    @update="results = $event"
                    :success="results?.isValid"
                  />
        
            </el-col>
            <el-col :span="12">
              <el-form-item label="Last Name" prop="lastName">
                <el-input v-model="ruleForm.name" />
              </el-form-item>
            </el-col>
           
           </el-row> -->
           
            <el-form-item>
              <el-button type="primary" @click="submitForm(ruleFormRef)">Save</el-button>
              <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
            </el-form-item> 
          </el-form>

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
