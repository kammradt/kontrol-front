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
            <span class="overline support--text">{{stage.realizationDate | longDate}}</span>
          </v-card-title>
          <v-card-text v-text="stage.description" />
        </v-card>
        <v-card-actions v-if="showNewStageOption">
          <v-row>
            <v-col cols="4">
              <v-btn
                @click.stop="openDialogUpdate"
                dark
                block
                depressed
                color="progress"
                v-text="'Edit'"
              />
            </v-col>
            <v-col cols="8">
              <v-btn
                @click.stop="openDialog"
                block
                depressed
                color="secondary"
                v-text="'New stage'"
              />
            </v-col>
          </v-row>
        </v-card-actions>
      </v-card-text>
    </v-slide-y-transition>

    <v-dialog v-model="dialog" max-width="600px">
      <v-card>
        <v-card-title>
          <span class="primary--text headline pb-5">Creating new Request Stage</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row no-gutters>
              <v-col cols="12">
                <v-text-field
                  outlined
                  v-model="newRequestStageData.description"
                  label="Description"
                />
              </v-col>
              <v-col cols="12">
                <v-switch label="Is finished?" v-model="newRequestStageData.isClosed"></v-switch>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">
                <v-btn color="closed" dark block @click="closeDialog">Close</v-btn>
              </v-col>
              <v-col cols="6">
                <v-btn color="open" dark block @click="createNewRequestStage">Save</v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogUpdate" max-width="600px">
      <v-card>
        <v-card-title>
          <span class="primary--text headline pb-5">Updating a Request</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row no-gutters>
              <v-col cols="12">
                <v-text-field v-model="newRequestData.subject" outlined label="Subject" />
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="newRequestData.description" outlined label="Description" />
              </v-col>
              <v-col cols="12">
                <v-switch label="Is finished?" v-model="newRequestData.isClosed"></v-switch>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">
                <v-btn color="closed" dark block @click="closeDialog">Close</v-btn>
              </v-col>
              <v-col cols="6">
                <v-btn color="open" dark block @click="updateRequest">Save</v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
export default {
  name: "Request",
  data() {
    return {
      showDetails: false,
      colors: {
        OPEN: "open",
        IN_PROGRESS: "progress",
        CLOSED: "closed"
      },
      newRequestStageData: {
        isClosed: false,
        description: "",
        requestId: this.request.id
      },
      newRequestData: {
        subject: this.request.subject,
        description: this.request.description,
        isClosed: false
      },
      dialog: false,
      dialogUpdate: false
    };
  },
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
      return `${d.getMonth()}/${d.getDay()}/${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}`;
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
    openDialogUpdate() {
      this.dialogUpdate = true;
    },
    openDialog() {
      this.dialog = true;
    },
    createNewRequestStage() {
      this.$store
        .dispatch("addRequestStage", this.newRequestStageData)
        .then(() => {
          this.closeDialog();
        });
    },
    updateRequest() {
      this.$store
        .dispatch("updateRequest", {
          requestId: this.request.id,
          ...this.newRequestData
        })
        .then(() => {
          this.closeDialog();
        });
    },
    closeDialog() {
      this.dialog = false;
      this.dialogUpdate = false;
      this.newRequestStageData = {};
      this.newRequestData = {};
    },
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
      }, 100);
    }
  }
};
</script>
