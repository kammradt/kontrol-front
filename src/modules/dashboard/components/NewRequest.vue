<template>
  <div>
    <v-dialog v-model="newRequestDialog" max-width="600px" persistent>
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
            <v-form v-model="isValid">
              <v-row no-gutters>
                <v-col cols="12">
                  <v-text-field
                    v-model="newRequestData.subject"
                    :rules="requestSubjectRules"
                    :error-count="requestSubjectRules.length"
                    outlined
                    label="Subject"
                  />
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="newRequestData.description"
                    :rules="requestDescriptionRules"
                    :error-count="requestDescriptionRules.length"
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
                  <v-btn color="open" block :disabled="!isValid" @click="createNewRequest">
                    <span class="white--text" v-text="'Save'" />
                  </v-btn>
                </v-col>
              </v-row>
            </v-form>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import {
  requestSubjectRules,
  requestDescriptionRules
} from "./../../util/vuetifyRules";

export default {
  name: "NewRequest",
  data: () => ({
    newRequestDialog: false,
    newRequestData: {
      subject: "",
      description: ""
    },
    isValid: false,
    requestSubjectRules,
    requestDescriptionRules
  }),
  methods: {
    ...mapActions(["createRequest"]),
    createNewRequest() {
      this.createRequest(this.newRequestData).then(this.closeDialog);
    },
    closeDialog() {
      this.newRequestDialog = false;
      this.newRequestData = {};
    }
  }
};
</script>