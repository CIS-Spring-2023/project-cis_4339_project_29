import { createApp } from 'vue'
import router from './router'
import App from './App.vue'
import './index.css'
import { createPinia } from 'pinia'

const app = createApp(App)
const pinia = createPinia();


app.use(router)
app.use(pinia)
app.mount('#app')
