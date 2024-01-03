import { createApp } from 'vue';
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import App from './App.vue';
import router from './router/router';
import store from './store/store';
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import Vue3Toastify, { updateGlobalOptions, type ToastContainerOptions } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import '@/assets/css/main.css';


const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
updateGlobalOptions({ rtl: true });

app.use(store)
.use(ElementPlus)
  .use(router)
  .use(Vue3Toastify, {
    autoClose: 3000,
  } as ToastContainerOptions)
  .mount('#app');

