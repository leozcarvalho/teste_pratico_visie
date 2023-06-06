import Vue from 'vue'
import App from './App.vue'
import router from './router'
import "bootstrap";
import 'bootstrap/dist/css/bootstrap.css';
import VueMask from 'v-mask'
import Vuelidate from 'vuelidate'
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

Vue.config.productionTip = false

Vue.use(VueMask)
Vue.use(Vuelidate)

const options = {
  // You can set your default options here
};

Vue.use(Toast, options);


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
