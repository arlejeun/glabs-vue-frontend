<script setup lang="ts">

import type { FormInstance, FormRules } from 'element-plus'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
const { customer } = storeToRefs(userStore)
//const customer = ref(user.value?.customer?.[0] as IDriveCustomer)

const { width } = useWindowSize()
const isMobile = computed(() => width.value < 750)
const dialogWidth = computed (() => isMobile.value ? '90%' : '30%')
const formSize = ref('large')
const customerFormRef = ref<FormInstance>()

const emailDialogFormVisible = ref(false)
const phoneDialogFormVisible = ref(false)

const customerPhones = computed( () => customer?.value?.identifiers?.filter( x => x.type == 'Voice'))
const customerEmails = computed( () => customer?.value?.identifiers?.filter( x => x.type == 'Email'))

const hasWorkEmail = computed( () => customerEmails?.value?.filter(x => x.name == 'Work Email')?.length > 0)
const hasPersonalEmail = computed( () => customerEmails?.value?.filter(x => x.name == 'Personal Email')?.length > 0)
const hasOtherEmail = computed( () => customerEmails?.value?.filter(x => x.name == 'Other Email')?.length > 0)

const hasWorkPhone = computed( () => customerPhones?.value?.filter(x => x.name == 'Work Phone')?.length > 0)
const hasMobilePhone = computed( () => customerPhones?.value?.filter(x => x.name == 'Cell Phone')?.length > 0)
const hasHomePhone = computed( () => customerPhones?.value?.filter(x => x.name == 'Home Phone')?.length > 0)


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
  ],
})

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!')
      userStore.updateCustomerProfile(customer.value)
    } else {
      console.log('error submit!', fields)
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

const addPhoneNumber = () => {
  phoneDialogFormVisible.value = true
}

const addPhoneSubmit = () => {
  console.log('Add Phone Submitted')
  //emailTypeOptions.map(x => x.label == emailDialogForm.name)
  phoneTypeOptions.filter( opt  => opt.label == phoneDialogForm.name )
  customer.value?.identifiers.push(phoneDialogForm)
  phoneDialogFormVisible.value = false
}


const addEmail = () => {
  emailDialogFormVisible.value = true
}

const  phoneDialogForm = reactive({
  name: '',
  value: '',
  type: 'Voice'
})

const  emailDialogForm = reactive({
  name: '',
  value: '',
  type: 'Email'
})

const emailTypeOptions = reactive([
  {
    value: '1',
    label: 'Work Email',
    disabled: hasWorkEmail

  },
  {
    value: '2',
    label: 'Personal Email',
    disabled: hasPersonalEmail
  },
  {
    value: '3',
    label: 'Other Email',
    disabled: hasOtherEmail
  }
])

const phoneTypeOptions = reactive([
  {
    value: '1',
    label: 'Work Phone',
    disabled: hasWorkPhone
  },
  {
    value: '2',
    label: 'Mobile Phone',
    disabled: hasMobilePhone
  },
  {
    value: '3',
    label: 'Home Phone',
    disabled: hasHomePhone
  }
])

const formLabelWidth = '100px'




</script>

<template>

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

      <el-form ref="customerFormRef" :model="customer" :rules="rules" label-width="120px" label-position="top"
        class="demo-ruleForm" :size="formSize" status-icon>
        <el-row :gutter="20">
          <el-col :xs="24" :span="12">
          <el-form-item label="First Name" prop="first_name">
            <el-input v-model="customer.first_name" />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :span="12">
          <el-form-item label="Last Name" prop="last_name">
            <el-input v-model="customer.last_name" />
          </el-form-item>
        </el-col>
        </el-row>
        <el-row :xs="24" :gutter="20">
          <el-col :span="18">
          <el-form-item label="Address" prop="address">
            <el-input v-model="customer.address" />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :span="6">
          <el-form-item label="Country" prop="country">
            <el-input v-model="customer.country" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
          <el-col :xs="24" :span="8">
          <el-form-item label="City" prop="city">
            <el-input v-model="customer.city" />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :span="8">
          <el-form-item label="State" prop="state">
            <el-input v-model="customer.state" />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :span="8">
          <el-form-item label="Zipcode" prop="zipcode">
            <el-input v-model="customer.zip" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-divider></el-divider>

      <el-row :gutter="20">
        <el-col><h4 class="card-header-title text-primary mt-2 pb-2">Emails<a @click.prevent="addEmail" href=""><i class="small text-primary bi bi-plus-circle mx-3"></i></a></h4></el-col>
      </el-row>
      
      <el-row :gutter="20">
        <el-col v-for="item in customerEmails" :xs="24" :span="8">
          <el-form-item :label="item.name" prop="email">
            <el-input v-model="item.value" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-divider></el-divider>

      <el-row :xs="24" :gutter="20">
        <el-col><h4 class="card-header-title text-primary mt-2 pb-2">Phones<a @click.prevent="addPhoneNumber" href=""><i class="small text-primary bi bi-plus-circle mx-3"></i></a></h4></el-col>
      </el-row>
      
      <el-row :gutter="20">
        <el-col v-for="item in customerPhones" :xs="24" :span="8">
          <el-form-item :label="item.name" prop="phone">
            <el-input v-model="item.value" />
          </el-form-item>
        </el-col>            
      </el-row>

      <el-divider></el-divider>

       
        <el-form-item>
          <el-button type="primary" @click.prevent="submitForm(customerFormRef)">Save</el-button>
          <el-button @click="resetForm(customerFormRef)">Reset</el-button>
        </el-form-item> 
      </el-form>

    </div>
    <!-- Card body END -->
  </div>
  <!-- Personal info END -->


</div>
</div>

<el-dialog v-model="emailDialogFormVisible" :width="dialogWidth" title="Add Email">
<el-form :model="emailDialogForm">
  <el-form-item label="Type" :label-width="formLabelWidth">
    <el-select v-model="emailDialogForm.name" placeholder="Select Type">
      <el-option
        v-for="item in emailTypeOptions"
        :key="item.value"
        :label="item.label"
        :value="item.label"
        :disabled="item.disabled"
      />
    </el-select>
  </el-form-item>
    <el-form-item label="Email" :label-width="formLabelWidth">
      <el-input v-model="emailDialogForm.value" autocomplete="off" />
  </el-form-item>
</el-form>

<template #footer>
  <span class="dialog-footer">
    <el-button @click="emailDialogFormVisible = false">Cancel</el-button>
    <el-button type="primary" @click="addPhoneSubmit">
      Confirm
    </el-button>
  </span>
</template>

</el-dialog>

<el-dialog v-model="phoneDialogFormVisible" :width="dialogWidth" title="Add Phone Number">
<el-form :model="phoneDialogForm">
  <el-form-item label="Type" :label-width="formLabelWidth">
    <el-select v-model="phoneDialogForm.name" placeholder="Select Type">
      <el-option
        v-for="item in phoneTypeOptions"
        :key="item.value"
        :label="item.label"
        :value="item.label"
        :disabled="item.disabled"
      />
    </el-select>
  </el-form-item>
    <el-form-item label="Phone #" :label-width="formLabelWidth">
      <el-input v-model="phoneDialogForm.value" autocomplete="off" />
  </el-form-item>
</el-form>

<template #footer>
  <span class="dialog-footer">
    <el-button @click="emailDialogFormVisible = false">Cancel</el-button>
    <el-button type="primary" @click="addPhoneSubmit">
      Confirm
    </el-button>
  </span>
</template>

</el-dialog>



<pre>
  {{userStore.status}}
  {{userStore.token}}
</pre>
<!-- <pre>
  {{user}}
</pre> -->
<pre>
  {{customer}}
</pre>

</template>

<style>

</style>
