<template>
  <div>
    <v-speed-dial direction="bottom" style="z-index: 4">
      <template v-slot:activator>
        <v-btn text right icon large color="primary">
          <v-icon v-text="'mdi-dots-vertical'" />
        </v-btn>
      </template>
      <v-btn fab dark color="primary" @click="dialogProfile = true">
        <v-icon>mdi-account</v-icon>
      </v-btn>
      <v-btn fab dark color="closed" @click="logout">
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-speed-dial>

    <v-dialog v-model="dialogProfile" max-width="600px" v-if="user" persistent>
      <v-card>
        <v-card-title v-if="!changingPassword">
          <span class="primary--text headline pb-5">Your profile</span>
        </v-card-title>
        <v-card-title v-else>
          <span class="primary--text headline pb-5">Update password</span>
        </v-card-title>
        <v-card-text v-if="!changingPassword">
          <v-container>
            <v-form v-model="isProfileValid" ref="profileForm">
              <v-row no-gutters>
                <v-col cols="12">
                  <v-text-field
                    v-model="newUserData.name"
                    :placeholder="user.name"
                    :rules="nameRules"
                    :error-count="nameRules.length"
                    outlined
                    label="Name"
                  />
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="newUserData.email"
                    :placeholder="user.email"
                    :rules="emailRules"
                    :error-count="emailRules.length"
                    outlined
                    label="Email"
                  />
                </v-col>
                <v-col cols="12">
                  <v-text-field v-model="user.role" readonly outlined label="Premium Status" />
                </v-col>
              </v-row>
            </v-form>
          </v-container>
        </v-card-text>
        <v-card-text v-else>
          <v-container>
            <v-form v-model="arePasswordsValid" ref="passwordsForm">
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    outlined
                    label="New password"
                    v-model="newUserPasswordData.password"
                    :rules="passwordRules"
                    :error-count="passwordRules.length"
                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append="showPassword = !showPassword"
                    :type="showPassword ? 'text' : 'password'"
                  />
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    outlined
                    label="Confirm your new password"
                    v-model="newUserPasswordData.confirmationPassword"
                    :rules="passwordRules"
                    :error-count="passwordRules.length"
                    :append-icon="showPassword2 ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append="showPassword2 = !showPassword2"
                    :type="showPassword2 ? 'text' : 'password'"
                  />
                </v-col>
              </v-row>
            </v-form>
          </v-container>
        </v-card-text>
        <v-card-text>
          <v-row>
            <v-col cols="6">
              <v-btn color="closed" dark block @click="closeDialog">Close</v-btn>
            </v-col>
            <v-col cols="6">
              <v-btn
                color="primary"
                v-if="!changingPassword"
                block
                @click="updateUserProfile"
                :disabled="!isProfileValid"
              >
                <span class="white--text" v-text="'Save profile'" />
              </v-btn>
              <v-btn
                color="secondary"
                v-else
                block
                @click="updateUserPassword"
                :disabled="!arePasswordsValid"
              >
                <span class="white--text" v-text="'Update Password'" />
              </v-btn>
            </v-col>
            <v-col cols="12">
              <v-btn
                color="support"
                small
                dark
                block
                @click="resetFormValidation"
                v-text="changingPassword ? 'I want to change my profile' : ' I want to change password'"
              />
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { showSuccess } from "./../../../plugins/notyf";
import { mapActions } from "vuex";
import {
  nameRules,
  emailRules,
  passwordRules
} from "./../../util/vuetifyRules";

export default {
  name: "Profile",
  data() {
    return {
      dialogProfile: false,
      newUserData: {
        name: "",
        email: ""
      },
      newUserPasswordData: {
        password: "",
        confirmationPassword: ""
      },
      changingPassword: false,
      showPassword: false,
      showPassword2: false,
      isProfileValid: false,
      arePasswordsValid: false,
      nameRules,
      emailRules,
      passwordRules
    };
  },
  computed: {
    user() {
      if (this.$store.getters.IS_LOADING) return "Loading user...";
      return this.$store.getters.USER;
    }
  },
  methods: {
    ...mapActions(["logout", "updateUserProfile", "updateUserPassword"]),
    ...mapActions({
      _logout: "logout",
      _updateUserProfile: "updateUserProfile",
      _updateUserPassword: "updateUserPassword"
    }),
    updateUserProfile() {
      this._updateUserProfile({ ...this.newUserData }).then(
        this.afterChangingUserInformation
      );
    },
    updateUserPassword() {
      this._updateUserPassword({
        ...this.newUserPasswordData
      }).then(this.afterChangingUserInformation);
    },
    afterChangingUserInformation() {
      this.closeDialog();
      showSuccess("LOGIN_AGAIN_REQUIRED");
      this.logout();
    },
    resetFormValidation() {
      this.changingPassword
        ? this.$refs.passwordsForm.resetValidation()
        : this.$refs.profileForm.resetValidation();
      this.changingPassword = !this.changingPassword;
    },
    closeDialog() {
      this.dialogProfile = false;
      this.changingPassword = false;
      this.newUserData = {};
      this.newUserPasswordData = {};
    },
    logout() {
      this._logout().then(this.goToLoginIndex);
    },
    goToLoginIndex() {
      this.$router.push({ name: "LoginIndex" });
    }
  }
};
</script>
