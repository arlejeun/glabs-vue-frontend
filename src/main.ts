import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { abilitiesPlugin } from '@casl/vue'
import ability from '@/plugins/casl/ability'

//import ElementPlus from 'element-plus'
//import '@/assets/scss/vendor/bootstrap/scss/bootstrap.scss'
//import '@/assets/scss/element/index.scss'

// Import Bootstrap
import '@/assets/scss/audit/style.scss'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import '@/assets/scss/audit/vendor/bootstrap-icons/bootstrap-icons.css'

// import '@/assets/scss/element/index.scss'
// import 'element-plus/dist/index.css'

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
//app.use(ElementPlus)
app.use(createPinia())
app.use(router)

app.component('fa', FontAwesomeIcon)
app.component('MazPhoneNumberInput', MazPhoneNumberInput)

app.use(abilitiesPlugin, ability, {
    useGlobalProperties: true,
  })

app.mount('#app')
