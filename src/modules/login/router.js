import LoginIndex from './views/LoginIndex'

export default [
  {
    path: '/login',
    alias: '/',
    name: 'LoginIndex',
    component: LoginIndex,
    meta: {
      isLoginPage: true
    }
  }
]
