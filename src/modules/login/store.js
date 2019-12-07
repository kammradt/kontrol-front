

import userService from './services/userService'

const jwt = window.localStorage.getItem('token');
const userState = {
  user: null,
  token: jwt ? jwt : null,
  loading: false
}

const userGetters = {
  USER: userState => userState.user,
  IS_LOADING: userState => userState.loading,
  TOKEN: userState => userState.token
}

const userActions = {
  async register({ commit }, newUserData) {
    commit("SET_LOADING", true)
    try {
      let newUser = await userService.register(newUserData)
      commit('SET_USER', newUser)
      commit("SET_LOADING", false)
    } catch (err) {
      commit('DELETE_TOKEN')
      commit('SET_USER', null)
      commit("SET_LOADING", false)
      throw 'ErrorDuringRegisterExpception'
    }

  },
  async login({ commit }, loginData) {
    commit("SET_LOADING", true)
    try {
      let token = await userService.login(loginData)
      commit("SET_LOADING", false)
      commit('SET_TOKEN', token)
    } catch (err) {
      commit('DELETE_TOKEN')
      commit('SET_USER', null)
      commit("SET_LOADING", false)
      throw 'ErrorDuringLoginExpception'
    }
  },

  async logout({ commit }) {
    commit('DELETE_TOKEN')
    commit('SET_USER', null)
  },

  async me({ commit }) {
    commit("SET_LOADING", true)
    try {
      let currentUser = await userService.me()
      commit("SET_USER", currentUser)
    } catch (err) {
      commit('DELETE_TOKEN')
      commit('SET_USER', null)
      throw 'ErrorDuringGetCurrentUser'
    } finally {
      commit("SET_LOADING", false)
    }
  },

  async updateUserProfile({ commit }, newUserData) {
    commit("SET_LOADING", true)
    try {
      let updatedUser = await userService.updateProfile(newUserData)
      commit("SET_USER", updatedUser)
    } catch (error) {
      throw 'ErrorDuringUpdatingCurrentUser'
    } finally {
      commit("SET_LOADING", false)
    }
  },

  async updateUserPassword({commit}, newUserPasswordData) {
    commit("SET_LOADING", true)
    try {
      await userService.updateUserPassword(newUserPasswordData)
    } catch (error) {
      throw 'ErrorDuringUpdatingCurrentUserPassword'
    } finally {
      commit("SET_LOADING", false)
    }
  }
}

const userMutations = {
  SET_TOKEN(state, payload) {
    localStorage.setItem('token', payload)
    state.token = payload
  },

  DELETE_TOKEN(state) {
    state.token = ''
    localStorage.setItem('token', '')
  },

  SET_USER(state, payload) {
    state.user = payload
  },

  SET_LOADING(state, payload) {
    state.loading = payload
  }
}

export {
  userState,
  userGetters,
  userActions,
  userMutations,
}