import { createApp } from 'vue'
import { createPinia } from 'pinia'

// Import ELementPlus (Vite Plugin to auto import component on demand)
/*
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
app.use(ElementPlus)
*/

// Import Bootstrap
import '@/assets/scss/style.scss'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import '@/assets/scss/vendor/bootstrap-icons/bootstrap-icons.css'

// Import Fontawesome
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

import MazPhoneNumberInput from 'maz-ui/components/MazPhoneNumberInput'
import 'maz-ui/css/main.css'

import router from './router'
import App from '@/App.vue'

library.add(fas)

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.component('fa', FontAwesomeIcon)
app.component('MazPhoneNumberInput', MazPhoneNumberInput)

app.mount('#app')
