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
              <Profile />
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
  </div>
</template>

<script>
import Request from "./../components/Request";
import Profile from "./../components/Profile";

export default {
  name: "Dashboard",
  components: {
    Request,
    Profile
  },
  data() {
    return {
      filterText: "",
      dialog: false,
      newRequestData: {
        subject: "",
        description: ""
      }
    };
  },
  computed: {
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
    closeDialog() {
      this.dialog = false;
      this.newRequestData = {};
    },
    createNewRequest() {
      this.$store.dispatch("createRequest", this.newRequestData).then(() => {
        this.closeDialog();
      });
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
