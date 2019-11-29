import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginIndex from '../modules/login/views/LoginIndex'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'LoginIndex',
    component: LoginIndex
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
