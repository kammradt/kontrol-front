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
      let response = await this.$app.$http.get("users/me", { headers: { Authorization: `Bearer ${this.$app.$store.getters.TOKEN}` } })
      if (response.status === 200)
        return response.data
    } catch (error) {
      if (error.response.status === 400)
        notyf.error(error.response.data.message);
      throw 'NotAbleToGetCurrentUser'
    }
  }
}