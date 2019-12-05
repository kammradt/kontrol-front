import notyf from './../../../plugins/notyf'

export default {
  async login(loginData) {
    try {
      let response = await this.$app.$http.post("users/login", loginData)
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
      let response = await this.$app.$http.post("users", newUserData)
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
    try {
      let headers = this.$app.$store.getters.HEADER
      let response = await this.$app.$http.get("users/me", { headers })
      if (response.status === 200)
        return response.data
    } catch (error) {
      if (error.response.status === 400)
        notyf.error(error.response.data.message);
      if (error.response.status === 404)
        notyf.error(error.response.data.message);
      throw 'NotAbleToGetCurrentUser'
    }
  },

  async updateUser({ newPassword, newPasswordAgain, name, email }) {
    if (newPassword !== newPasswordAgain) {
      notyf.error("Passwords dont match!");
      throw "PasswordsAreNotEqual"
    }
    try {
      let body = { name, email, password: newPassword }
      let headers = this.$app.$store.getters.HEADER
      let response = await this.$app.$http.put(`users/${this.$app.$store.getters.USER.id}`, body, { headers })
      if (response.status === 200) {
        notyf.success("Profile updated!")
        return response.data
      }
    } catch (error) {
      if (error.response.status === 400) {
        error.response.data.errors.forEach(e => {
          notyf.error(e);
        })
        throw 'InvalidFieldsException'
      } else {
        notyf.error(error.response.data.message)
      }
    }
  }
}