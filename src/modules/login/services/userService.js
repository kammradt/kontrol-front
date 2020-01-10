import { showError, showMultipleErrors, showSuccess } from './../../../plugins/notyf'
import { getHeader } from './../../util/requestHelperService'


export default {
  async login(loginData) {
    try {
      let response = await this.$http.post("users/login", loginData)
      if (response.status === 200) {
        showSuccess('DOING_LOGIN')
        return response.data.token
      }
    } catch (error) {
      if (error.response.status === 400) {
        showMultipleErrors(error.response.data.errors)
        throw 'InvalidFieldsException'
      }
      if (error.response.status === 401) {
        showError(error.response.data.message)
        throw 'BadCredentialsException'
      }
    }
  },

  async register(newUserData) {
    try {
      let response = await this.$http.post("users", newUserData)
      if (response.status === 201) {
        showSuccess('ACCOUNT_CREATED')
        return response.data
      }
    } catch (error) {
      if (error.response.status === 400) {
        showMultipleErrors(error.response.data.errors)
        throw 'InvalidFieldsException'
      }
      if (error.response.status === 409) {
        showError(error.response.data.message)
        throw 'DuplicatedEmailException'
      }
    }
  },

  async me() {
    try {
      let headers = getHeader()
      let response = await this.$http.get("users/me", { headers })
      if (response.status === 200)
        return response.data
    } catch (error) {
      if (error.response.status === 400)
        showError(error.response.data.message)
      throw 'NotAbleToGetCurrentUser'
    }
  },

  async updateProfile({ name, email }) {
    let body = { name, email }
    let url = `users/${this.$app.$store.getters.USER.id}/profile`
    let headers = getHeader()
    try {
      let response = await this.$http.patch(url, body, { headers })
      if (response.status === 200) {
        showSuccess('PROFILE_UPDATED')
        return response.data
      }
    } catch (error) {
      error.response.status === 400 ? showMultipleErrors(error.response.data.errors) : showError(error.response.data.message)
      throw 'InvalidFieldsException'
    }
  },

  async updateUserPassword({ password, confirmationPassword }) {
    let body = { password, confirmationPassword }
    let url = `users/${this.$app.$store.getters.USER.id}/password`
    let headers = getHeader()

    try {
      let response = await this.$http.patch(url, body, { headers })
      if (response.status === 200) {
        showSuccess('PASSWORD_UPDATED')
        return response;
      }
    } catch (error) {
      if (error.response.data.errors) {
        showMultipleErrors(error.response.data.errors)
        throw 'InvalidFieldsDuringPasswordUpdate'
      }
      showError(error.response.data.message)
      throw 'PasswordsDoNotMatch'
    }
  }
}