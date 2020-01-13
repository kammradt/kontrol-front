import { showError, showMultipleErrors, showSuccess } from './../../../plugins/notyf'
import { getHeader } from './../../util/requestHelperService'

export default {

  async getRequests() {
    let params = { page: 0, size: 10 }
    let headers = getHeader()

    try {
      let response = await this.$http.get(`/users/${this.$app.$store.getters.USER.id}/requests`, { params, headers })
      if (response.status === 200)
        return response.data.elements
    } catch (error) {
      showError(error.response.data.message)
      throw 'NotAbleToGetCurrentUserRequests'
    }
  },

  async createRequest(newRequestData) {
    let headers = getHeader()
    try {
      let body = { ...newRequestData, user: { id: this.$app.$store.getters.USER.id } }
      let response = await this.$http.post('/requests', body, { headers })
      if (response.status === 201) {
        showSuccess("REQUEST_CREATED")
        return response.data
      }
    } catch (error) {
      if (error.response.status === 400)
        showMultipleErrors(error.response.data.errors)
      throw 'ErrorCreatingNewRequest'
    }
  },

  async addFilesToRequest({ requestId, formDataFiles }) {
    let headers = getHeader()
    try {
      let response = await this.$http.post(`/requests/${requestId}/files`, formDataFiles, { headers })
      if (response.status === 201) {
        showSuccess("FILES_UPLOADED")
        return response.data
      }
    } catch (error) {
      showError(error.response.data.message)
      throw 'ErrorAddingFilesToRequest'
    }
  },

  async deleteFile({ requestId, fileId }) {
    let headers = getHeader()
    try {
      let response = await this.$http.delete(`/requests/${requestId}/files/${fileId}`, { headers })
      if (response.status === 200)
        showSuccess("FILE_DELETED")
    } catch (error) {
      showError(error.response.data.message)
      throw 'ErrorDeletingFiles'
    }
  },

  async addRequestStage({ requestId, isClosed, description }) {
    let headers = getHeader()
    let body = {
      user: { id: this.$app.$store.getters.USER.id },
      request: { id: requestId },
      state: isClosed ? 'CLOSED' : 'IN_PROGRESS',
      description: description
    }
    try {

      let response = await this.$http.post('/request-stages', body, { headers })
      if (response.status === 201) {
        showSuccess("STAGE_ADDED")
        return response.data
      }
    } catch (error) {
      if (error.response.status === 400)
        showMultipleErrors(error.response.data.errors)
      else
        showError(error.response.data.message)
      throw 'ErrorCreatingNewRequestStage'
    }
  },

  async updateRequest({ requestId, subject, description, isClosed }) {
    let headers = getHeader()
    let body = {
      user: { id: this.$app.$store.getters.USER.id },
      subject,
      description,
      state: isClosed ? 'CLOSED' : 'IN_PROGRESS',
    }

    try {
      let response = await this.$http.put(`/requests/${requestId}`, body, { headers })
      if (response.status === 200) {
        showSuccess("REQUEST_UPDATED")
        return response.data
      }
    } catch (error) {
      if (error.response.status === 400) {
        showMultipleErrors(error.response.data.errors)
      } else {
        showError(error.response.data.message)
      }
      throw 'ErrorUpdatingRequest'
    }
  },

  async deleteRequest(requestId) {
    let headers = getHeader()
    try {
      let response = await this.$http.delete(`/requests/${requestId}`, { headers })
      if (response.status === 200)
        showSuccess("REQUEST_DELETED")
    } catch (error) {
      showError(error.response.data.message)
      throw 'NotAbleToDeleteRequest'
    }
  },

  async deleteRequestStage(requestStageId) {
    let headers = getHeader()
    try {
      let response = await this.$http.delete(`/request-stages/${requestStageId}`, { headers })
      if (response.status === 200)
        showSuccess("STAGE_DELETED")
    } catch (error) {
      showError(error.response.data.message)
      throw 'NotAbleToDeleteRequestStage'
    }
  }

}