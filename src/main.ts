import { createApp } from 'vue'; 
import App from './App.vue';
import router from './router/router';
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import Vue3Toastify, { updateGlobalOptions, type ToastContainerOptions } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';


const app = createApp(App);

updateGlobalOptions({ rtl: true });

app.use(ElementPlus)
  .use(router)
  .use(Vue3Toastify, {
    autoClose: 3000,
  } as ToastContainerOptions)
 app.mount('#app');
