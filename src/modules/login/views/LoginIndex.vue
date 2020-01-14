<template>
  <v-container fluid style="max-width: initial">
    <v-row align="center" justify="center" class="pt-10">
      <v-col cols="12" sm="8" md="4">
        <v-card class="elevation-12">
          <v-toolbar :color="color">
            <v-spacer />
            <v-tooltip top>
              <template v-slot:activator="{ on }">
                <v-btn icon dark v-on="on" @click="changeForm">
                  <v-icon v-text="'mdi-plus-circle'" />
                </v-btn>
              </template>
              <span v-text="'Register'" />
            </v-tooltip>
          </v-toolbar>
          <v-toolbar :color="color" extended extension-height="75" dark flat>
            <v-spacer />
            <v-toolbar-title class="display-2 font-weight-light test" v-text="'Kontrol'" />
            <v-icon right x-large v-text="'mdi-yin-yang'" />
            <v-spacer />
          </v-toolbar>
          <v-card-text>
            <v-form v-model="isValid">
              <v-text-field
                v-model="loginForm.name"
                v-show="!isTryingToLogin"
                label="Name"
                type="text"
                prepend-icon="mdi-account-circle"
              />
              <v-text-field
                v-model="loginForm.email"
                :rules="emailRules"
                error-count="2"
                label="Email"
                type="text"
                prepend-icon="mdi-account-circle"
              />
              <v-text-field
                v-model="loginForm.password"
                :rules="passwordRules"
                error-count="2"
                label="Password"
                type="password"
                prepend-icon="mdi-lock"
              />
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn
              @click="isTryingToLogin ? login() : register()"
              :color="color"
              :loading="loading"
              :disabled="loading || !isValid"
              block
            >{{isTryingToLogin ? 'Login' : 'Register'}}</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";
import { passwordRules, emailRules } from "./../../util/vuetifyRules";

export default {
  name: "LoginIndex",
  data: () => ({
    loginForm: {
      name: "",
      email: "",
      password: ""
    },
    isTryingToLogin: true,
    isValid: false,
    passwordRules,
    emailRules
  }),
  computed: {
    color() {
      return this.isTryingToLogin ? "primary" : "secondary";
    },
    loading() {
      return this.$store.getters.IS_LOADING;
    }
  },
  methods: {
    ...mapActions(["login", "register"]),
    ...mapActions({
      _login: "login",
      _register: "register"
    }),
    changeForm() {
      this.isTryingToLogin = !this.isTryingToLogin;
    },
    login() {
      this._login(this.loginForm).then(this.goToLoginIndex);
    },
    goToLoginIndex() {
      this.$router.push({ name: "LoginIndex" });
    },
    register() {
      this._register(this.loginForm).then(() => {
        this.isTryingToLogin = !this.isTryingToLogin;
      });
    }
  }
};
</script>
