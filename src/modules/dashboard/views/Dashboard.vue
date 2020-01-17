<template>
  <v-container :style="gradientBackground" fluid fill-height align-content-start>
    <v-row no-gutters>
      <v-col cols="12" sm="8" offset-sm="2" md="6" offset-md="3">
        <v-card>
          <v-card-title>
            <v-btn text right icon color="primary">
              <v-icon @click="enableRandomBackgroundColor = !enableRandomBackgroundColor" large primary left pr-3 v-text="'mdi-magnify'" />
            </v-btn>
            <v-text-field label="Search your request here" class="title pr-3" v-model="filterText" />
            <Profile />
          </v-card-title>
        </v-card>
      </v-col>

      <v-row>
        <v-col
          cols="12"
          sm="8"
          offset-sm="2"
          md="6"
          offset-md="3"
          v-for="request in filteredRequests"
          :key="request.id"
        >
          <Request :request="request" />
        </v-col>
      </v-row>

      <NewRequest />
    </v-row>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Dashboard",
  components: {
    Request: () => import("./../components/Request"),
    Profile: () => import("./../components/Profile"),
    NewRequest: () => import("./../components/NewRequest")
  },
  data: () => ({
    filterText: "",
    enableRandomBackgroundColor: false
  }),
  computed: {
    requests() {
      if (this.$store.getters.IS_LOADING) return;
      return this.$store.getters.REQUESTS;
    },
    filteredRequests() {
      if (!this.requests) return;
      return this.requests.filter(request =>
        request.subject.toLowerCase().includes(this.filterText.toLowerCase())
      );
    },
    gradientBackground() {
      if (this.enableRandomBackgroundColor)
        return `background-image: linear-gradient(to top, ${this.randomHEX()} 0%, ${this.randomHEX()} 100%)`;
      return ``
    }
  },
  methods: {
    ...mapActions(["me", "getRequests"]),
    randomHEX() {
      return `#${Math.random()
        .toString(16)
        .slice(2, 8)}`;
    }
  },
  mounted() {
    this.me().then(() => {
      this.getRequests();
    });
  }
};
</script>
