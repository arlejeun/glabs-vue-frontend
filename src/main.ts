import { createApp } from 'vue'
import { createPinia } from 'pinia'

// Import ELementPlus (Vite Plugin to auto import component on demand)
/*
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
app.use(ElementPlus)
*/

import router from './router'
import App from '@/App.vue'

// Import Bootstrap
import "@/assets/scss/style.scss"
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

// Import Fontawesome
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from '@fortawesome/free-solid-svg-icons';

library.add(fas)

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.component('fa', FontAwesomeIcon)

app.mount('#app')
