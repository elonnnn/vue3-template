import { createApp } from "vue";
import "amfe-flexible";

import App from "./App.vue";
import "vant/lib/index.css";
import "../registerServiceWorker";

const app = createApp(App);

app.mount("#app");
