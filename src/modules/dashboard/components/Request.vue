<template>
  <v-card @click="showRequestStages" :ripple="false" shaped>
    <v-card-title>
      <span primary-title class="primary--text" v-text="request.subject" />
      <v-spacer />
      <span class="caption support--text">{{request.creationDate | shortDate}}</span>
    </v-card-title>
    <v-card-text v-text="request.description" />
    <v-slide-y-transition>
      <v-card-text v-show="showDetails">
        <v-card tile class="ma-3" v-for="stage in request.stages" :key="stage.id" :id="stage.id">
          <v-card-title :class="`${colors[stage.state]}--text`" primary-title>
            {{stage.state | formattedState}}
            <v-spacer />
            <span class="overline support--text">{{request.creationDate | longDate}}</span>
          </v-card-title>
          <v-card-text v-text="stage.description" />
        </v-card>
        <v-card-actions v-if="showNewStageOption">
          <v-row>
            <v-col cols="4">
              <v-btn @click.stop="open" dark block depressed color="progress" v-text="'Edit'" />
            </v-col>
            <v-col cols="8">
              <v-btn @click.stop="addStage" block depressed color="secondary" v-text="'New stage'" />
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
  data: () => ({
    showDetails: false,
    colors: {
      OPEN: "open",
      IN_PROGRESS: "progress",
      CLOSED: "closed"
    },
    newRequestStageData: {
      isClosed: false,
      description: ""
    }
  }),
  computed: {
    showNewStageOption() {
      return this.request.state !== "CLOSED";
    }
  },
  props: {
    request: Object
  },
  filters: {
    shortDate: date => {
      let d = new Date(date);
      return `${d.getMonth()}/${d.getDay()}/${d.getFullYear()}`;
    },
    longDate: date => {
      let d = new Date(date);
      return `${d.getMonth()}/${d.getDay()}/${d.getFullYear()} falta formattar`;
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
    open() {
      console.log("open");
    },
    addStage() {
      console.log("");
    },
    showRequestStages() {
      this.showDetails = !this.showDetails;
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
      }, 100);
    }
  }
};
</script>
