<template>
  <v-card @click="showRequestStages" :ripple="false" :style="borderStyle">
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
        <v-card tile class="ma-3" v-for="stage in request.stages" :key="stage.id" :id="stage.id" outlined>
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
import { shortDate, longDate } from "./../../util/dateFormatterFilters";
import { scrollToById } from "./../../util/screenBehaviorService";

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
    shortDate: date => shortDate(date),
    longDate: date => longDate(date),
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

      let lastStage = this.request.stages.find(
        stage => stage.state === this.request.state
      );

      scrollToById(lastStage.id);
    }
  }
};
</script>
