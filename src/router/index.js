import Vue from 'vue'
import VueRouter from 'vue-router'
import notyf from './../plugins/notyf'
import store from './../store/index'

import loginRoutes from './../modules/login/router'
import dashboardRoutes from './../modules/dashboard/router'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    ...loginRoutes,
    ...dashboardRoutes
  ]
})

router.beforeEach((to, from, next) => {
  let hasToken = store.state.token

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (hasToken) {
      next()
      return
    }
    next({ name: 'LoginIndex' })
    notyf.error("Please, login first");
  } else if (to.meta.isLoginPage && hasToken) {
    next({ name: 'Dashboard' })
  } else {
    next()
  }
})

export default router
