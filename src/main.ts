import { createApp } from 'vue';
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import App from './App.vue';
import router from './router/router';
import store from './store/store';
import '@/assets/css/main.css';


const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

app.use(store)
    .use(router)
    .mount('#app');

