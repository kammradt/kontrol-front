import notyf from './../../../plugins/notyf'

export default {
  async login(loginData) {
    return this.$app.$http
      .post("users/login", loginData)
      .then(res => {

        if (res.status === 200) {
          notyf.success("Logging...");
          return res.data.token
        }
      })
      .catch(err => {
        if (err.response.status === 400) {
          err.response.data.errors.forEach(e => {
            notyf.error(e);
          })
          throw 'InvalidFieldsException'
        }

        if (err.response.status === 401) {
          notyf.error(err.response.data.message);
          throw 'BadCredentialsException'
        }

      });
  },
  async register(newUserData) {
    return this.$app.$http
      .post("users", newUserData)
      .then(res => {
        if (res.status === 201) {
          notyf.success("Account created");
          return res.data
        }
      })
      .catch(err => {
        if (err.response.status === 400) {
          err.response.data.errors.forEach(e => {
            notyf.error(e);
          })
          throw 'InvalidFieldsException'
        }

        if (err.response.status === 409) {
          notyf.error(err.response.data.message);
          throw 'DuplicatedEmailException'
        }
      });
  },
  async me() {
    return this.$app.$http
      .get("users/me", {
        headers: {
          Authorization: `Bearer ${this.$app.$store.state.token}`,
        }
      }).then(res => {
        if (res.status === 200)
          return res.data
      })
      .catch(err => {
        if (err.response.status === 400)
          notyf.error(err.response.data.message);
        throw 'NotAbleToGetCurrentUser'
      })
  }
}