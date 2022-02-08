import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
// import '@/style/common.scss'     // global scss
import VueContextMenu from "vue-contextmenu";

import EFormDesign from "../plugins/index";
import "../plugins/styles/common.scss";
import "../plugins/styles/form-design.scss";

Vue.use(VueContextMenu);
Vue.use(ElementUI);
Vue.use(EFormDesign);
Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
