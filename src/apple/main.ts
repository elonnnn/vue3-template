import { createApp } from "vue";
import "amfe-flexible";

import App from "./App.vue";
import "vant/lib/index.css";
import "../registerServiceWorker";
import router from "./router";
import store from "../stores";
import lazyLoad from "../utils/lazyLoad";
const app = createApp(App);
app.directive("lazy", lazyLoad);

app.use(store).use(router).mount("#app");
