import { createApp } from 'vue'
import { createPinia } from 'pinia'

import router from './router'
import App from '@/App.vue'

// import "./assets/main.css";
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
