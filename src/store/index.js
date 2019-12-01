import Vue from 'vue'
import Vuex from 'vuex'

import userStore from './../modules/login/store'

Vue.use(Vuex)


const state = {
  ...userStore.userState
}

const getters = {
  ...userStore.userGetters
}

const actions = {
  ...userStore.userActions
}

const mutations = {
  ...userStore.userMutations
}

export default new Vuex.Store({
  state,
  actions,
  mutations,
  getters,
})
