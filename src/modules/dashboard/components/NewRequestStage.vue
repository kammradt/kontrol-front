<template>
  <div>
    <v-btn
      @click.stop="newRequestStageDialog = true"
      block
      depressed
      color="secondary"
      v-text="'New stage'"
    />
    <v-dialog v-model="newRequestStageDialog" max-width="600px">
      <v-card>
        <v-card-title>
          <span class="primary--text headline pb-5">Creating new Request Stage</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-form v-model="isValid">
              <v-row no-gutters>
                <v-col cols="12">
                  <v-text-field
                    outlined
                    v-model="newRequestStageData.description"
                    :rules="requestDescriptionRules"
                    :error-count="requestDescriptionRules.length"
                    label="Description"
                  />
                </v-col>
                <v-col cols="12">
                  <v-switch label="Is finished?" v-model="newRequestStageData.isClosed"></v-switch>
                </v-col>
              </v-row>
            </v-form>
            <v-row>
              <v-col cols="6">
                <v-btn color="closed" dark block @click="closeDialog">Close</v-btn>
              </v-col>
              <v-col cols="6">
                <v-btn color="open" block :disabled="!isValid" @click="createNewRequestStage">
                  <span class="white--text" v-text="'Save'" />
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { requestDescriptionRules } from "./../../util/vuetifyRules";

export default {
  name: "NewRequestStage",
  props: {
    requestId: Number
  },
  data() {
    return {
      newRequestStageDialog: false,
      newRequestStageData: {
        isClosed: false,
        description: "",
        requestId: this.requestId
      },
      isValid: false,
      requestDescriptionRules
    };
  },
  methods: {
    ...mapActions(["addRequestStage"]),
    createNewRequestStage() {
      this.addRequestStage(this.newRequestStageData).then(this.closeDialog);
    },
    closeDialog() {
      this.newRequestStageDialog = false;
      this.newRequestStageData = {};
    }
  }
};
</script>

