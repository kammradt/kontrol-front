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
        <v-card-title>
          <span class="primary--text headline pb-5">Your profile</span>
        </v-card-title>
        <v-card-text>
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
              <v-row v-if="true">
                <v-col cols="12">
                  <v-text-field
                    v-model="newUserData.newPassword"
                    outlined
                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="showPassword ? 'text' : 'password'"
                    label="New Password"
                    hint="At least 8 characters"
                    @click:append="showPassword = !showPassword"
                  />
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="newUserData.newPasswordAgain"
                    outlined
                    :append-icon="showPassword2 ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="showPassword2 ? 'text' : 'password'"
                    label="New Password again"
                    hint="At least 8 characters"
                    @click:append="showPassword2 = !showPassword2"
                  />
                </v-col>
              </v-row>
            </v-row>
            <v-row>
              <v-col cols="6">
                <v-btn color="closed" dark block @click="closeDialog">Close</v-btn>
              </v-col>
              <v-col cols="6">
                <v-btn color="open" dark block @click="saveUser">Save</v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "Profile",
  data() {
    return {
      dialogProfile: false,
      newUserData: {
        name: "",
        email: "",
        newPassword: "",
        newPasswordAgain: ""
      },
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
      this.newUserData = {};
    },
    saveUser() {
      this.$store.dispatch("updateUser", {
          ...this.newUserData
        }).then(() => {
          this.closeDialog();
        });
    }
  }
};
</script>
