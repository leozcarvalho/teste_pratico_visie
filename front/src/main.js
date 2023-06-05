import Vue from 'vue'
import App from './App.vue'
import router from './router'
import "bootstrap";
import 'bootstrap/dist/css/bootstrap.css';
import VueMask from 'v-mask'
import Vuelidate from 'vuelidate'

Vue.config.productionTip = false

Vue.use(VueMask)
Vue.use(Vuelidate)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
