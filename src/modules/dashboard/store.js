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
  },

  async createRequest({ commit }, newRequestData) {
    commit("SET_LOADING", true)
    try {
      let newRequest = await requestService.createRequest(newRequestData)
      commit("ADD_NEW_REQUEST", newRequest)
    } finally {
      commit("SET_LOADING", false)
    }
  },

  async addRequestStage({ commit }, newRequestStageData) {
    commit("SET_LOADING", true)
    try {
      let newRequestStage = await requestService.addRequestStage(newRequestStageData)
      console.log()
      commit("ADD_NEW_REQUEST_STAGE", {
        newRequestStage,
        requestId: newRequestStageData.requestId
      })
    } finally {
      commit("SET_LOADING", false)
    }
  }
}

const requestMutations = {
  SET_REQUESTS(state, payload) {
    state.requests = payload
  },
  ADD_NEW_REQUEST(state, payload) {
    state.requests.push(payload)
  },
  ADD_NEW_REQUEST_STAGE(state, payload) {
    // Create a GETTER to do the below
    let request = state.requests.find(request => request.id == payload.requestId)
    request.stages.push(payload.newRequestStage)
  }
}

export {
  requestState,
  requestGetters,
  requestActions,
  requestMutations
}
