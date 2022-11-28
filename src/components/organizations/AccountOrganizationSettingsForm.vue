<script setup lang="ts">
import type { IDriveCustomerOrgSettings } from '@/interfaces'
import type { FormInstance, FormRules } from 'element-plus'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()  
const  { isAdmin } = storeToRefs(userStore)

const regionValues = [
  'APAC',
  'APAC_Partner',
  'CANADA',
  'CANADA_Partner',
  'CEC',
  'EMEA',
  'EMEA_Partner',
  'GTS',
  'LATAM',
  'LATAM_Partner',
  'MemberServices',
  'NA_ARCHITECTS',
  'NA_CANADA',
  'NA_GOVERMENT',
  'NA_GOVERNMENT',
  'NA_USC',
  'NA_USE',
  'NA_USW',
  'NA_VELOCITY',
  'SC_APAC',
  'US_Partner',
  'USC',
  'USE',
  'USW',
  'Velocity',
  'WEM',
  'Bold360',
  'HealthCare',
]

const ivrLangOptions = [
  { label: 'English - US (AA)', value: 'en-US' },
  { label: 'French - Canada', value: 'fr-CA' },
  { label: 'German', value: 'de-DE' },
  { label: 'Italian', value: 'it-IT' },
]

const bankingOptions = [
  { label: '---', value: 'none' },
  { label: 'Activate Card', value: 'activate' },
  { label: 'Overdraft upsell', value: 'overdraft' },
  { label: 'Past Due', value: 'past_due' },
  { label: 'Enroll Autopay', value: 'autopay' },
  { label: 'Authorization Code', value: 'authorization_code' },
]

const regions = regionValues.map((x) => {
  return { value: x, label: x }
})

const props = defineProps<{ settings: IDriveCustomerOrgSettings }>()

const rules = reactive<FormRules>({
  first_name: [
    { message: 'Please enter first name', trigger: 'blur' },
    { min: 2, max: 30, message: 'Length should be 2 to 30', trigger: 'blur' },
  ],
  last_name: [
    { message: 'Please enter first name', trigger: 'blur' },
    { min: 2, max: 30, message: 'Length should be 2 to 30', trigger: 'blur' },
  ],
  country: [
    {
      //required: true,
      message: 'Please enter Country',
      trigger: 'change',
    }
  ]
})

const ruleFormRef = ref<FormInstance>()

async function submitForm (formEl: FormInstance | undefined) {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!')
    } else {
      console.log('error submit!', fields)
    }
  })
}

function resetForm (formEl: FormInstance | undefined) {
  if (!formEl) return
  formEl.resetFields()
}

</script>

<template>

    <div class="card-body">

       <h5><i class="bi bi-wrench-adjustable fa-fw me-2 mb-3"></i>Settings</h5>

      <el-divider></el-divider>


      <el-form ref="ruleFormRef" :model="props.settings" :rules="rules" label-width="120px" label-position="top"
        class="demo-ruleForm" status-icon>

        <h6>Agent Script parameters</h6>

        
        <el-row :gutter="20">
          <el-col :xs="24" :span="10">
            <el-form-item label="Company Name">
              <el-input v-model="props.settings.as_company" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :span="10">
            <el-form-item label="Header">
              <el-input v-model="props.settings.as_header" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :span="4">
            <el-form-item class="mb-3" label="Color">
              <el-color-picker v-model="props.settings.as_color"></el-color-picker>
            </el-form-item>
          </el-col>
        </el-row>

       
        <el-row :gutter="20">
          <el-col :xs="24" :span="24">
            <el-form-item label="Script Button URL">
              <el-input v-model="props.settings.as_button_url" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xs="24" :span="24">
            <el-form-item class="mb-3" label="Script Embedded URL">
              <el-input v-model="props.settings.as_embedded_url" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xs="24" :span="20">
            <el-form-item class="mb-3" label="Image URL">
              <el-input v-model="props.settings.as_image_url" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :span="4">
            <img class="preview" :src="props.settings.as_image_url">
          </el-col>

        </el-row>

        <el-divider></el-divider>

        <h6>Routing parameters</h6>

        <el-row :gutter="20">

          <el-col v-show="!isAdmin" :span="6">
            <el-input v-model="props.settings.routing_region" disabled></el-input>
          </el-col>

          <el-col v-show="isAdmin" :span="6">
            <el-form-item label="Region">
              <el-select v-model="props.settings.routing_region" placeholder="Select Region">
                <el-option v-for="item in regions" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :xs="24" :span="6">
            <el-form-item label="User PIN">
              <el-input disabled v-model="props.settings.routing_userpin" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :span="6">
            <el-form-item class="mb-3" label="Skill 1">
              <el-input disabled v-model="props.settings.routing_skill1" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :span="6">
            <el-form-item class="mb-3" label="Skill 2">
              <el-input disabled v-model="props.settings.routing_skill2" />
            </el-form-item>
          </el-col>
        </el-row>


        <el-row :gutter="20">
          <el-col :xs="24" :span="6">
            <el-form-item label="Account Name" >
              <el-input v-model="props.settings.routing_account_name" disabled></el-input>
            </el-form-item>
          </el-col>

          <el-col :xs="24" :span="8">
            <el-form-item label="IVR Language">

              <el-select v-model="props.settings.ivr_lang" placeholder="Select IVR Langugae">
                <el-option v-for="item in ivrLangOptions" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>

            </el-form-item>
          </el-col>

          <el-col :xs="24" :span="5">
            <el-form-item label="Smart Advisor" >
              <el-tooltip popper-class="bg-primary" content="Use Smart Advisor for GSol" placement="top">
                <el-checkbox class="" v-model="props.settings.smart_advisor" label="Smart Advisor" border>
                </el-checkbox>
              </el-tooltip>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :span="5">
            <el-form-item label="Enable Survey" >
              <el-tooltip popper-class="bg-primary" content="Enable Survey" placement="top">
                <el-checkbox class="" v-model="props.settings.enableSurveys" label="Enable Survey" border>
                </el-checkbox>
              </el-tooltip>
            </el-form-item>
          </el-col>

        </el-row>

        <el-row :gutter="20">

          <el-col :span="12">
            <el-form-item label="External Contact ID">
              <el-input v-model="props.settings.ext_contact_id" disabled></el-input>
            </el-form-item>
          </el-col>

          <el-col :xs="24" :span="6">
            <el-form-item label="Synchronize" >
              <el-tooltip popper-class="bg-primary" content="Update PCN External Contact with Customer Record details when submitting form." placement="top">
                <el-checkbox v-model="props.settings.ext_contact_sync" label="Synchronize" border>
                </el-checkbox>
              </el-tooltip>
            </el-form-item>
          </el-col>
        </el-row> 


        <el-form-item>
          <el-button type="primary" @click.stop.prevent="submitForm(ruleFormRef)">Save</el-button>
          <el-button @click.stop.prevent="resetForm(ruleFormRef)">Reset</el-button>
        </el-form-item>
      </el-form>

    </div>


</template>

<style>
img.preview {
  max-height: 100px;
  float: right;
}
</style>
