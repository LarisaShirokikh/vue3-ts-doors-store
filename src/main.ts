import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/router";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import Vue3Toastify, {
  updateGlobalOptions,
  type ToastContainerOptions,
} from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import Antd from "ant-design-vue";
import { Button, message } from "ant-design-vue";
import "ant-design-vue/dist/reset.css";

const app = createApp(App);


updateGlobalOptions({ rtl: true });

app
  .use(Antd)
  .use(Button)
  .use(ElementPlus)
  .use(router)
  .use(Vue3Toastify, {
    autoClose: 2000,
  } as ToastContainerOptions)
  .mount("#app");

  //app.config.globalProperties.$message = message;
