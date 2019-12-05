import notyf from './../../../plugins/notyf'


export default {
  async getRequests() {
    try {
      let params = { page: 0, size: 10 }
      let headers = this.$app.$store.getters.HEADER
      let response = await this.$app.$http.get(`/users/${this.$app.$store.getters.USER.id}/requests`, { params, headers })
      if (response.status === 200)
        return response.data.elements
    } catch (error) {
      notyf.error(error)
      throw 'NotAbleToGetCurrentUserRequests'
    }
  },

  async createRequest(newRequestData) {
    try {
      let body = { ...newRequestData, user: { id: this.$app.$store.getters.USER.id } }
      let headers = this.$app.$store.getters.HEADER
      let response = await this.$app.$http.post('/requests', body, { headers })
      if (response.status === 201)
        return response.data
    } catch (error) {
      if (error.response.status === 400)
        error.response.data.errors.forEach(e => {
          notyf.error(e);
        })
      throw 'ErrorCreatingNewRequest'
    }
  },

  async addRequestStage(newRequestStageData) {
    try {
      let body = {
        user: { id: this.$app.$store.getters.USER.id },
        request: { id: newRequestStageData.id },
        state: newRequestStageData.isClosed ? 'CLOSED' : 'IN_PROGRESS',
        description: newRequestStageData.description
      }
      let headers = this.$app.$store.getters.HEADER
      let response = await this.$app.$http.post('/request-stages', body, { headers })
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }

}