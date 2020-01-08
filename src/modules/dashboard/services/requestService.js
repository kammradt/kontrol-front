import notyf from './../../../plugins/notyf'


export default {
  async getRequests() {
    let params = { page: 0, size: 10 }
    let headers = { Authorization: `Bearer ${localStorage.getItem('token')}` }
    try {
      let response = await this.$http.get(`/users/${this.$app.$store.getters.USER.id}/requests`, { params, headers })
      if (response.status === 200)
        return response.data.elements
    } catch (error) {
      notyf.error(error.response.data.message)
      throw 'NotAbleToGetCurrentUserRequests'
    }
  },

  async createRequest(newRequestData) {
    try {
      let body = { ...newRequestData, user: { id: this.$app.$store.getters.USER.id } }
      let headers = { Authorization: `Bearer ${localStorage.getItem('token')}` }
      let response = await this.$http.post('/requests', body, { headers })
      if (response.status === 201) {
        notyf.success("Request created!")
        return response.data
      }
    } catch (error) {
      if (error.response.status === 400)
        error.response.data.errors.forEach(e => {
          notyf.error(e);
        })
      throw 'ErrorCreatingNewRequest'
    }
  },

  async addFilesToRequest({ requestId, formDataFiles }) {
    try {
      let headers = { Authorization: `Bearer ${localStorage.getItem('token')}` }
      let response = await this.$http.post(`/requests/${requestId}/files`, formDataFiles, { headers })
      if (response.status === 201) {
        notyf.success("File uploaded!")
        return response.data
      }
    } catch (error) {
      notyf.error(error.response.data.message)
      throw 'ErrorAddingFilesToRequest'
    }
  },

  async addRequestStage({ requestId, isClosed, description }) {
    try {
      let body = {
        user: { id: this.$app.$store.getters.USER.id },
        request: { id: requestId },
        state: isClosed ? 'CLOSED' : 'IN_PROGRESS',
        description: description
      }
      let headers = { Authorization: `Bearer ${localStorage.getItem('token')}` }
      let response = await this.$http.post('/request-stages', body, { headers })
      if (response.status === 201) {
        notyf.success("Stage added!")
        return response.data
      }
    } catch (error) {
      if (error.response.status === 400)
        error.response.data.errors.forEach(e => {
          notyf.error(e);
        })
      throw 'ErrorCreatingNewRequestStage'
    }
  },

  async updateRequest({ requestId, subject, description, isClosed }) {
    try {
      let body = {
        user: { id: this.$app.$store.getters.USER.id },
        subject,
        description,
        state: isClosed ? 'CLOSED' : 'IN_PROGRESS',
      }
      let headers = { Authorization: `Bearer ${localStorage.getItem('token')}` }
      let response = await this.$http.put(`/requests/${requestId}`, body, { headers })
      if (response.status === 200) {
        notyf.success("Request updated!")
        return response.data
      }
    } catch (error) {
      if (error.response.status === 400) {
        error.response.data.errors.forEach(e => {
          notyf.error(e);
        })
      } else {
        notyf.error(error.response.data.message);
      }
      throw 'ErrorUpdatingRequest'
    }
  },

  async deleteRequest(requestId) {
    let headers = { Authorization: `Bearer ${localStorage.getItem('token')}` }
    try {
      let response = await this.$http.delete(`/requests/${requestId}`, { headers })
      if (response.status === 200)
        notyf.success('Deleted!');
    } catch (error) {
      notyf.error(error.response.data.message)
      throw 'NotAbleToDeleteRequest'
    }
  },

  async deleteRequestStage(requestStageId) {
    let headers = { Authorization: `Bearer ${localStorage.getItem('token')}` }
    try {
      let response = await this.$http.delete(`/request-stages/${requestStageId}`, { headers })
      if (response.status === 200) {
        notyf.success('Deleted!');
        return response.data
      }
    } catch (error) {
      notyf.error(error.response.data.message)
      throw 'NotAbleToDeleteRequestStage'
    }

  }

}