<template>
  <v-card @click="showRequestStages" :ripple="false" shaped :style="borderStyle">
    <v-card-title>
      <span primary-title class="primary--text" v-text="request.subject" />
      <v-spacer />
      <span class="caption support--text">{{request.creationDate | shortDate}}</span>
    </v-card-title>
    <v-card-text>
      <v-row>
        <v-col cols="10" v-text="request.description" />
        <v-col cols="2" v-show="showDetails">
          <DeleteRequest :requestId="request.id" />
        </v-col>
      </v-row>
    </v-card-text>

    <v-slide-y-transition>
      <v-card-text v-show="showDetails">
        <v-card tile class="ma-3" v-for="stage in request.stages" :key="stage.id" :id="stage.id">
          <v-card-title :class="`${colors[stage.state]}--text`" primary-title>
            {{stage.state | formattedState}}
            <v-spacer />
            <span class="overline support--text">{{stage.realizationDate | longDate}}</span>
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="10" v-text="stage.description" />
              <v-col cols="2">
                <DeleteRequestStage :requestStageId="stage.id" />
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
        <RequestFiles :requestId="request.id" :files="request.files" />
        <v-card-actions v-if="showNewStageOption">
          <v-row>
            <v-col cols="4">
              <EditRequest :request="request" />
            </v-col>
            <v-col cols="5">
              <NewRequestStage :requestId="request.id" />
            </v-col>
            <v-col cols="3">
              <AddFilesToRequest :requestId="request.id" />
            </v-col>
          </v-row>
        </v-card-actions>
      </v-card-text>
    </v-slide-y-transition>
  </v-card>
</template>

<script>
export default {
  name: "Request",
  props: {
    request: Object
  },
  components: {
    NewRequestStage: () => import("./NewRequestStage"),
    EditRequest: () => import("./EditRequest"),
    DeleteRequest: () => import("./DeleteRequest"),
    DeleteRequestStage: () => import("./DeleteRequestStage"),
    AddFilesToRequest: () => import("./AddFilesToRequest"),
    RequestFiles: () => import("./RequestFiles")
  },
  data() {
    return {
      showDetails: false,
      colors: {
        OPEN: "open",
        IN_PROGRESS: "progress",
        CLOSED: "closed"
      },
      files: []
    };
  },
  computed: {
    showNewStageOption() {
      return this.request.state !== "CLOSED";
    },
    borderStyle() {
      let colorByState = {
        OPEN: this.$vuetify.theme.themes.light.open,
        IN_PROGRESS: this.$vuetify.theme.themes.light.progress,
        CLOSED: this.$vuetify.theme.themes.light.closed
      };
      return `border-left: 4px solid ${colorByState[this.request.state]}`;
    }
  },
  filters: {
    shortDate: date => {
      let d = new Date(date);
      return `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
    },
    longDate: date => {
      let d = new Date(date);
      return `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}`;
    },
    formattedState(state) {
      let formatted = {
        OPEN: "Open",
        IN_PROGRESS: "In Progress",
        CLOSED: "Closed"
      };
      return formatted[state];
    }
  },
  methods: {
    showRequestStages() {
      this.showDetails = !this.showDetails;
      if (this.request.stages.length === 0) return;

      let last = this.request.stages.find(stage => stage.state === `CLOSED`);
      let penultimate = this.request.stages.find(
        stage => stage.state === `IN_PROGRESS`
      );
      let first = this.request.stages.find(stage => stage.state === `OPEN`);

      setTimeout(() => {
        document
          .getElementById(
            last ? last.id : penultimate ? penultimate.id : first.id
          )
          .scrollIntoView({ block: "start", behavior: "smooth" });
      }, 10);
    }
  }
};
</script>
