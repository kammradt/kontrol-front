import Vue from 'vue'
import App from './App.vue'
import router from './router'

import store from './store/index'

import vuetify from './plugins/vuetify'
import axiosInstace from './plugins/axios'

import userService from './modules/login/services/userService'


Vue.config.productionTip = false
Vue.prototype.$http = axiosInstace

let rootVue = new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')


userService.$app = rootVue;