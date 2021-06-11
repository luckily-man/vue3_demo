import { createApp } from 'vue'
import ElementPlus from 'element-plus';
import './../permission'
import 'element-plus/lib/theme-chalk/index.css';
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/css/global.scss'
import './assets/css/public.scss'
import message from '@utils/elmessage'

const app = createApp(App)
app.use(ElementPlus).use(store).use(router).mount('#app')

app.config.globalProperties.$message = message

