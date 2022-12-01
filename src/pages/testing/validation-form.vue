<template>
  <el-form
    ref="formRef"
    :model="dynamicValidateForm"
    label-width="120px"
    class="demo-dynamic"
  >
  <el-row :gutter="20">
  <el-col>
    <el-form-item
      prop="email"
      label="Email"
      :rules="rules.email"
    >
      <el-input v-model="dynamicValidateForm.email" />
    </el-form-item>
  </el-col> 
  <el-col v-for="(domain, index) in dynamicValidateForm.domains"
      :key="domain.key">
    <el-form-item
      
      :label="'Domain'"
      :prop="'domains.' + index + '.value'"
      :rules="rules.email"
    >
      <el-input v-model="domain.value" />
    </el-form-item>
    
    </el-col>
  </el-row>
    
  <el-row>
    <el-form-item>
      <el-button type="primary" @click="submitForm(formRef)">Submit</el-button>
      <el-button @click="addDomain">New domain</el-button>
      <el-button @click="resetForm(formRef)">Reset</el-button>
    </el-form-item>

  </el-row>

    
  </el-form>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'

const rules = reactive<FormRules>({
  first_name: [
    { required: true, message: 'Please enter first name', trigger: 'blur' },
    { min: 2, max: 30, message: 'Length should be 2 to 30', trigger: 'blur' },
  ],
  last_name: [
    { required: true, message: 'Please enter first name', trigger: 'blur' },
    { min: 2, max: 30, message: 'Length should be 2 to 30', trigger: 'blur' },
  ],
  country: [
    {
      required: true,
      message: 'Please enter Country',
      trigger: 'change',
    }
  ],
  phone: [
    {
      required: true,
      message: 'Please enter Phone number e.164 format',
      trigger: 'change',
      pattern: /^\+[1-9]\d{1,14}$/
    },
  ],
  email: [
    {
      type: 'string',
      required: true,
      pattern:
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      message: 'Please enter email address',
      trigger: 'change',
    },
    { min: 3, message: 'Please enter email', trigger: 'blur' },
  ]
  

})

const formRef = ref<FormInstance>()
const dynamicValidateForm = reactive<{
  domains: DomainItem[]
  email: string
}>({
  domains: [
    {
      key: 1,
      value: '',
    },
  ],
  email: '',
})

interface DomainItem {
  key: number
  value: string
}

const removeDomain = (item: DomainItem) => {
  const index = dynamicValidateForm.domains.indexOf(item)
  if (index !== -1) {
    dynamicValidateForm.domains.splice(index, 1)
  }
}

const addDomain = () => {
  dynamicValidateForm.domains.push({
    key: Date.now(),
    value: '',
  })
}

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      console.log('submit!')
    } else {
      console.log('error submit!')
      return false
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
</script>
