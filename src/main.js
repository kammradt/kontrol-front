import Vue from 'vue'
import App from './App.vue'
import router from './router'

import store from './store/index'

import vuetify from './plugins/vuetify'
import axiosInstace from './plugins/axios'

import userService from './modules/login/services/userService'
import requestService from './modules/dashboard/services/requestService'

Vue.config.productionTip = false
Vue.prototype.$http = axiosInstace

userService.$http = axiosInstace;
requestService.$http = axiosInstace;

new Vue({
  router,
  store,
  vuetify,
  beforeCreate() {
    requestService.$app = this;
    userService.$app = this;
  },
  render: h => h(App)
}).$mount('#app')


