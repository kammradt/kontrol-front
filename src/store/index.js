import Vue from 'vue'
import Vuex from 'vuex'

import userService from './../modules/login/services/userService'

Vue.use(Vuex)

const jwt = window.localStorage.getItem('token');
const userState = {
  user: null,
  token: jwt ? jwt : null,
  loading: false
}

const userActions = {
  async register({ commit }, newUserData) {
    commit("setLoading", true)
    return userService.register(newUserData).then(newUser => {
      commit('setUser', newUser)
      commit("setLoading", false)
    }).catch(() => {
      commit('deleteToken')
      commit('setUser', null)
      commit("setLoading", false)
      throw `ErrorDuringRegisterExpception`
    })
  },

  async login({ commit }, loginData) {
    commit("setLoading", true)
    return userService.login(loginData).then(token => {
      commit("setLoading", false)
      commit('setToken', token)
    }).catch(() => {
      commit('deleteToken')
      commit('setUser', null)
      commit("setLoading", false)
      throw `ErrorDuringLoginExpception`
    })
  },

  async me({ commit }) {
    commit("setLoading", true)
    return userService.me().then(user => {
      commit("setUser", user)
    }).catch(() => {
      throw `ErrorDuringGetCurrentUser`
    }).finally(() => {
      commit("setLoading", false)
    })
  }
}

const userMutations = {
  setToken(state, payload) {
    state.token = payload
    localStorage.setItem(`token`, state.token)
  },

  deleteToken() {
    state.token = ''
    localStorage.setItem(`token`, ``)
  },

  setUser(state, payload) {
    state.user = payload
  },

  setLoading(state, payload) {
    state.loading = payload
  }
}

const state = {
  ...userState
}

const actions = {
  ...userActions
}

const mutations = {
  ...userMutations
}

export default new Vuex.Store({
  state,
  actions,
  mutations,
})
