<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <v-card>
            <v-card-title>
              <v-btn text right icon color="primary">
                <v-icon large primary left pr-3 v-text="'mdi-magnify'" />
              </v-btn>
              <v-text-field
                label="Search your request here"
                class="title pr-3"
                v-model="filterText"
              />
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
              
            </v-card-title>
          </v-card>
        </v-col>
        <v-col cols="12" v-for="request in filteredRequests" :key="request.id">
          <Request :request="request" />
        </v-col>

        <v-dialog v-model="dialog" max-width="600px">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" fab dark large fixed right bottom v-on="on">
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="primary--text headline pb-5">Creating new Request</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row no-gutters>
                  <v-col cols="12">
                    <v-text-field v-model="newRequestData.subject" outlined label="Subject" />
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="newRequestData.description"
                      outlined
                      label="Description"
                    />
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="6">
                    <v-btn color="closed" dark block @click="closeDialog">Close</v-btn>
                  </v-col>
                  <v-col cols="6">
                    <v-btn color="open" dark block @click="createNewRequest">Save</v-btn>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
          </v-card>
        </v-dialog>
      </v-row>
    </v-container>

    <v-dialog v-model="dialogProfile" max-width="600px" v-if="user">
      <v-card>
        <v-card-title>
          <span class="primary--text headline pb-5">Your profile</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row no-gutters>
              <v-col cols="12">
                <v-text-field v-model="newUserData.name" :placeholder="user.name" outlined label="Name" />
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="newUserData.email" :placeholder="user.email" outlined label="Email" />
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
import Request from "./../components/Request";

export default {
  name: "Dashboard",
  components: { Request },
  data() {
    return {
      filterText: "",
      dialog: false,
      dialogProfile: false,
      newRequestData: {
        subject: "",
        description: ""
      },
      newUserData: {
        name: '',
        email: '',
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
    },
    requests() {
      if (this.$store.getters.IS_LOADING) return;
      return this.$store.getters.REQUESTS;
    },
    filteredRequests() {
      if (!this.requests) return;
      return this.requests.filter(request =>
        request.subject.toLowerCase().includes(this.filterText)
      );
    }
  },
  methods: {
    openProfile() {
      this.dialogProfile = true;
    },
    logout() {
      this.$store.dispatch("logout").then(() => {
        this.$router.push({ name: 'LoginIndex' });
      }) 
    },
    closeDialog() {
      this.dialog = false;
      this.dialogProfile = false;
      this.newRequestData = {};
    },
    createNewRequest() {
      this.$store.dispatch("createRequest", this.newRequestData).then(() => {
        this.closeDialog();
      });
    },
    saveUser() {
      this.$store.dispatch("updateUser", {
        ...this.newUserData 
      }).then(() => {
        this.closeDialog();
      })
    }
  },
  mounted() {
    setTimeout(() => {
      this.$store.dispatch("me").then(() => {
        this.$store.dispatch("getRequests");
      });
    }, 0);
  }
};
</script>
