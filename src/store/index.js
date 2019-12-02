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
  defaultHeader: { Authorization: `Bearer ${userState.token}` },
  ...userState,
  ...requestState,
}

const getters = {
  HEADER: (state) => state.defaultHeader,
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
