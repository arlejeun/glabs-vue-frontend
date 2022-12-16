<script setup lang="ts">

import type { FormInstance, FormRules, ElProgress } from 'element-plus'
import { useUserStore } from '@/stores/user'
import { useCountryStore } from '@/stores/country'
import type { IDriveUser, IDriveUserDTO } from '@/interfaces';

const props = defineProps(['account'])
const myUser = ref(props.account)

const userStore = useUserStore()
const { settings } = storeToRefs(userStore)
const { createUserProfile } = userStore

const countryStore = useCountryStore()
const { countries } = storeToRefs(countryStore)
const { fetchCountries, selectCountry } = countryStore

//Initialize countries only at the beginning
if (countries.value?.length == 0) fetchCountries()

const typeOptions = [
  { value: 1, label: 'Unknown' },
  { value: 2, label: 'Internal' },
  { value: 3, label: 'Partner' },
  { value: 4, label: 'Customer' },
  { value: 5, label: 'Prospect' },
]
const formSize = ref('')
const registrationFormRef = ref<FormInstance>()
const registrationRules = reactive<FormRules>({
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
      pattern: /^\+[1-9]\d{1,14}$/,
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
      myUser.value.country = {connect: {"id": myUser.value.country_id}}
      myUser.value.settings = {create: {"id_provider": myUser.value.idp}}
      const {country_id, idp, ...userForm} = myUser.value
      //userStore.updatePersonalProfile(user)
      createUserProfile(userForm)

//        createUserProfile({
//   "first_name": "Andrew",
//   "last_name": "Filonov",
//   "email": "lejeune.arnaud@gmail.com",
//   "phone_number": "+61410935298",
//   "company": "SalesForce",
//   "job_function": "Sales Engineer",
//   "country": {
//     "connect": {"id": myUser.country_id}
//   },
//   "region": "EMEA",
//   "department": "Marketing",
//   "gen_contact_name": "John Doe",
//   "gen_contact_email": "John.Doe@genesys.com",
//   "avatar_url": "https://en.wikipedia.org/wiki/File:UEFI_variables_on_Linux_screenshot.png",
//   "settings": {
//     "create": {
//       "notifications": true,
//       "notifications_channels": [
//         "Email"
//       ],
//       "id_provider": "Google"
//     }
//   }
// }
//)

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
  console.log(myUser.value?.country_id);
  selectCountry(myUser.value?.country_id)

}

</script>

<template>
  <!--- Profile Form -->
  <div class="row">
    <div class="col">

      <div class="card mb-4 border">
                <!-- Card header -->
                <div class="card-header">
                  <h4 class="card-header-title"></h4>
                </div>
                <div class="card-body">
                  <div class="row">
                    <div class="col-auto">
                      <img src="@/assets/images/persons/pose-fs-9.png"/>
                    </div>
                    <div class="col">
                      <el-alert
                        title="Thank you for submitting your registration"
                        type="info"
                        description="more text description"
                        show-icon
                      />
                    </div>
                  </div>
                  
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