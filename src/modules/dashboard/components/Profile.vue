<template>
  <div>
    <v-speed-dial direction="bottom" style="z-index: 4">
      <template v-slot:activator>
        <v-btn text right icon large color="primary">
          <v-icon v-text="'mdi-dots-vertical'" />
        </v-btn>
      </template>
      <v-btn fab dark color="primary" @click="openProfile">
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
            <v-row no-gutters>
              <v-col cols="12">
                <v-text-field
                  v-model="newUserData.name"
                  :placeholder="user.name"
                  outlined
                  label="Name"
                />
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="newUserData.email"
                  :placeholder="user.email"
                  outlined
                  label="Email"
                />
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="user.role" readonly outlined label="Premium Status" />
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-text v-else>
          <v-container>
            <v-row no-gutters>
              <v-col cols="12">
                <v-text-field
                  outlined
                  label="New password"
                  v-model="newUserPasswordData.password"
                  :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append="showPassword = !showPassword"
                  :type="showPassword ? 'text' : 'password'"
                  hint="At least 8 characters"
                />
              </v-col>
              <v-col cols="12">
                <v-text-field
                  outlined
                  label="Confirm your new password"
                  v-model="newUserPasswordData.confirmationPassword"
                  :append-icon="showPassword2 ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append="showPassword2 = !showPassword2"
                  :type="showPassword2 ? 'text' : 'password'"
                />
              </v-col>
            </v-row>
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
                dark
                block
                @click="updateUserProfile"
                v-text="'Save profile'"
              />
              <v-btn
                color="secondary"
                v-else
                dark
                block
                @click="updateUserPassword"
                v-text="'Update Password'"
              />
            </v-col>
            <v-col cols="12">
              <v-btn
                color="support"
                v-if="!changingPassword"
                small
                dark
                block
                @click="changingPassword = true"
                v-text="'I want to change password'"
              />
              <v-btn
                color="support"
                v-else
                small
                dark
                block
                @click="changingPassword = false"
                v-text="'I want to change my profile'"
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
      showPassword2: false
    };
  },
  computed: {
    user() {
      if (this.$store.getters.IS_LOADING) return "Loading user...";
      return this.$store.getters.USER;
    }
  },
  methods: {
    openProfile() {
      this.dialogProfile = true;
    },
    logout() {
      this.$store.dispatch("logout").then(() => {
        this.$router.push({ name: "LoginIndex" });
      });
    },
    closeDialog() {
      this.dialogProfile = false;
      this.changingPassword = false;
      this.newUserData = {};
    },
    afterChangingUserInformation() {
      this.closeDialog();
      showSuccess("LOGIN_AGAIN_REQUIRED");
      this.logout();
    },
    updateUserProfile() {
      if (this.newUserData.name === "") this.newUserData.name = this.user.name;
      if (this.newUserData.email === "") this.newUserData.email = this.user.email;

      this.$store
        .dispatch("updateUserProfile", {
          ...this.newUserData
        })
        .then(() => {
          this.afterChangingUserInformation();
        });
    },
    updateUserPassword() {
      this.$store
        .dispatch("updateUserPassword", { ...this.newUserPasswordData })
        .then(() => {
          this.afterChangingUserInformation();
        });
    }
  }
};
</script>
