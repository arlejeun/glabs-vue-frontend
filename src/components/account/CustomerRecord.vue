<script setup lang="ts">

import type { FormInstance, FormRules } from 'element-plus'
import { useUserStore } from '@/stores/user'
import type { IDriveUser, IDriveCustomer, IDriveIdentifier } from "@/interfaces";
import type { Ref } from 'vue';

const userStore = useUserStore()
const myUser = storeToRefs(userStore).user as Ref<IDriveUser>
const myCustomerForm = storeToRefs(userStore).getCustomerProfile as Ref<IDriveCustomer>
const { width } = useWindowSize()
const isMobile = computed(() => width.value < 750)
const dialogWidth = computed (() => isMobile.value ? '90%' : '30%')
const formSize = ref('large')
const ruleFormRef = ref<FormInstance>()

const emailDialogFormVisible = ref(false)
const phoneDialogFormVisible = ref(false)

const customerPhones = computed( () => myCustomerForm?.value?.identifiers?.filter( x => x.type == 'Voice'))
const customerEmails = computed( () => myCustomerForm?.value?.identifiers?.filter( x => x.type == 'Email'))

const hasWorkEmail = computed( () => customerEmails?.value?.filter(x => x.name == 'Work Email')?.length > 0)
const hasPersonalEmail = computed( () => customerEmails?.value?.filter(x => x.name == 'Personal Email')?.length > 0)
const hasOtherEmail = computed( () => customerEmails?.value?.filter(x => x.name == 'Other Email')?.length > 0)

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
    },
  ]
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

const addPhoneConfig = () => {
  console.log('Add Phone Request')
  phoneDialogFormVisible.value = true
}

const addPhoneSubmit = () => {
  console.log('Add Phone Submitted')
  //emailTypeOptions.map(x => x.label == emailDialogForm.name)
  emailTypeOptions.filter( opt  => opt.label == emailDialogForm.name )
  myCustomerForm.value?.identifiers.push(emailDialogForm)
  emailDialogFormVisible.value = false
}


const addEmail = () => {
  console.log('Add Email')
  emailDialogFormVisible.value = true
}

const  phoneDialogForm = reactive({
  name: 'Personal Phone',
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

const phoneTypeOptions = ref([
  {
    value: '1',
    label: 'Work Phone',
    disabled: true
  },
  {
    value: '2',
    label: 'Mobile Phone'
  },
  {
    value: '3',
    label: 'Home Phone',
  }
])

const formLabelWidth = '100px'



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

          <!-- <p>{{myUser}}</p>
          <p>{{myCustomer}}</p> -->
          <el-form ref="ruleFormRef" :model="myCustomerForm" :rules="rules" label-width="120px" label-position="top"
            class="demo-ruleForm" :size="formSize" status-icon>
            <el-row :gutter="20">
              <el-col :xs="24" :span="12">
              <el-form-item label="First Name" prop="name">
                <el-input v-model="myCustomerForm.first_name" />
              </el-form-item>
            </el-col>
            <el-col :xs="24" :span="12">
              <el-form-item label="Last Name" prop="name">
                <el-input v-model="myCustomerForm.last_name" />
              </el-form-item>
            </el-col>
            </el-row>
            <el-row :xs="24" :gutter="20">
              <el-col :span="18">
              <el-form-item label="Address" prop="address">
                <el-input v-model="myCustomerForm.address" />
              </el-form-item>
            </el-col>
            <el-col :xs="24" :span="6">
              <el-form-item label="Country" prop="country">
                <el-input v-model="myCustomerForm.country" />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
              <el-col :xs="24" :span="8">
              <el-form-item label="City" prop="city">
                <el-input v-model="myCustomerForm.city" />
              </el-form-item>
            </el-col>
            <el-col :xs="24" :span="8">
              <el-form-item label="State" prop="state">
                <el-input v-model="myCustomerForm.state" />
              </el-form-item>
            </el-col>
            <el-col :xs="24" :span="8">
              <el-form-item label="Zipcode" prop="zipcode">
                <el-input v-model="myCustomerForm.zip" />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col><h4 class="card-header-title text-primary mt-2 pb-2">Emails<a @click.prevent.stop="addEmail" href=""><i class="small text-primary bi bi-plus-circle mx-3"></i></a></h4></el-col>
          </el-row>
          
          <el-row :gutter="20">
            <el-col v-for="item in customerEmails" :xs="24" :span="8">
              <el-form-item :label="item.name" prop="email">
                <el-input v-model="item.value" />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :xs="24" :gutter="20">
            <el-col><h4 class="card-header-title text-primary mt-2 pb-2">Phones<a @click.prevent.stop="addPhoneConfig" href=""><i class="small text-primary bi bi-plus-circle mx-3"></i></a></h4></el-col>
          </el-row>
          
          <el-row :gutter="20">
            <el-col v-for="item in customerPhones" :xs="24" :span="8">
              <el-form-item :label="item.name" prop="phone">
                <el-input v-model="item.value" />
              </el-form-item>
            </el-col>            
          </el-row>

           
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
  <!-- Main content END -->
</template>

<style>

</style>
