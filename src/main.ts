import { createApp } from "vue";
import App from "./App.vue";
import AntDVue from "../plugins/AntD";
// import YouWantVue3 from "../packages/index";
import YouWantVue3 from "../lib/you-want-vue3.es.js";
import "../lib/style.css";
import "@/styles/index.less";

createApp(App).use(AntDVue).use(YouWantVue3).mount("#app");
