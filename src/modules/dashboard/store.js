import requestService from "./services/requestService"

const requestState = {
  requests: []
}

const requestGetters = {
  REQUESTS: requestState => requestState.requests
}

const requestActions = {
  async getRequests({ commit }) {
    commit("SET_LOADING", true)
    try {
      let requests = await requestService.getRequests()
      commit("SET_REQUESTS", requests)
    } catch (error) {
      commit("SET_REQUESTS", [])
      throw 'ErrorDuringGetCurrentUserRequests'
    } finally {
      commit("SET_LOADING", false)
    }
  }
}

const requestMutations = {
  SET_REQUESTS(state, payload) {
    state.requests = payload
  }
}

export {
  requestState,
  requestGetters,
  requestActions,
  requestMutations
}
