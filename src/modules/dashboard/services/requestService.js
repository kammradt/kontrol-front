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
  }
}