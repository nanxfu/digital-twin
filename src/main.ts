import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ArcoVue from '@arco-design/web-vue';
import ArcoVueIcon from '@arco-design/web-vue/es/icon';
import '@arco-design/web-vue/dist/arco.css';
// import './style.css'
import App from './App.vue'

const app = createApp(App)
const pinia = createPinia()

app.use(ArcoVue)
app.use(ArcoVueIcon);
app.use(pinia)
app.mount('#app')
