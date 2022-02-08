// 导入样式
import "./styles/common.scss";
import "./styles/form-design.scss";

// 组件导入
import EFormDesign from './index.vue';
import EFormShow from './FormDesign/showPage/ShowForm';

const components = [EFormDesign, EFormShow]
const install = function(Vue) {
  // use ant组件
  if (install.installed) return;
  install.installed = true;
  components.map(component => {
    Vue.component(component.name, component);

  })
}

if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}

export default {
  install
}