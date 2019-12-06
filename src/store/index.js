import Vue from 'vue'
import Vuex from 'vuex'

import {
  userState,
  userGetters,
  userActions,
  userMutations
} from './../modules/login/store'

import {
  requestState,
  requestGetters,
  requestActions,
  requestMutations
} from './../modules/dashboard/store'


Vue.use(Vuex)

const state = {
  ...userState,
  ...requestState,
}

const getters = {
  ...userGetters,
  ...requestGetters,
}

const actions = {
  ...userActions,
  ...requestActions,
}

const mutations = {
  ...userMutations,
  ...requestMutations,
}

export default new Vuex.Store({
  state,
  actions,
  mutations,
  getters,
})
