import notyf from './../../../plugins/notyf'

export default {
  async login(loginData) {
    try {
      let response = await this.$http.post("users/login", loginData)
      if (response.status === 200) {
        notyf.success("Logging...");
        return response.data.token
      }
    } catch (error) {
      if (error.response.status === 400) {
        error.response.data.errors.forEach(e => {
          notyf.error(e);
        })
        throw 'InvalidFieldsException'
      }
      if (error.response.status === 401) {
        notyf.error(error.response.data.message);
        throw 'BadCredentialsException'
      }
    }
  },

  async register(newUserData) {
    try {
      let response = await this.$http.post("users", newUserData)
      if (response.status === 201) {
        notyf.success("Account created");
        return response.data
      }
    } catch (error) {
      if (error.response.status === 400) {
        error.response.data.errors.forEach(e => {
          notyf.error(e);
        })
        throw 'InvalidFieldsException'
      }
      if (error.response.status === 409) {
        notyf.error(error.response.data.message);
        throw 'DuplicatedEmailException'
      }
    }
  },

  async me() {
    let headers = { Authorization: `Bearer ${localStorage.getItem('token')}` }
    try {
      let response = await this.$http.get("users/me", { headers })
      if (response.status === 200)
        return response.data
    } catch (error) {
      console.log(error)
      if (error.response.status === 400)
        notyf.error(error.response.data.message);
      if (error.response.status === 404)
        notyf.error(error.response.data.message);
      throw 'NotAbleToGetCurrentUser'
    }
  },

  async updateProfile({ name, email }) {
    let body = { name, email }
    let headers = { Authorization: `Bearer ${localStorage.getItem('token')}` }
    let url = `users/${this.$store.getters.USER.id}/profile`

    try {
      let response = await this.$http.patch(url, body, { headers })
      if (response.status === 200) {
        notyf.success("Profile updated!")
        return response.data
      }
    } catch (error) {
      if (error.response.status === 400) {
        error.response.data.errors.forEach(e => {
          notyf.error(e);
        })
      } else {
        notyf.error(error.response.data.message)
      }
      throw 'InvalidFieldsException'
    }
  },

  async updateUserPassword({ password, confirmationPassword }) {
    let body = { password, confirmationPassword }
    let headers = { Authorization: `Bearer ${localStorage.getItem('token')}` }
    let url= `users/${this.$store.getters.USER.id}/password`

    try {
      let response = await this.$http.patch(url, body, {headers})
      if (response.status === 200) {
        notyf.success('Password updated!')
        return response;
      }
    } catch (error) {
      if (error.response.data.errors) {
        error.response.data.errors.forEach(e => {
          notyf.error(e);
        })
        throw 'InvalidFieldsDuringPasswordUpdate'
      }
      notyf.error(error.response.data.message)
      throw 'PasswordsDoNotMatch'
    }
  }
}