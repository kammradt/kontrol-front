<template>
  <div>
    <v-btn
      @click.stop="dialogEditRequest = true"
      dark
      block
      depressed
      color="progress"
      v-text="'Edit'"
    />
    <v-dialog v-model="dialogEditRequest" max-width="600px">
      <v-card>
        <v-card-title>
          <span class="primary--text headline pb-5">Updating a Request</span>
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
                  <v-text-field v-model="newRequestData.description" outlined label="Description" />
                </v-col>
                <v-col cols="12">
                  <v-switch label="Is finished?" v-model="newRequestData.isClosed"></v-switch>
                </v-col>
              </v-row>
            </v-form>
            <v-row>
              <v-col cols="6">
                <v-btn color="closed" dark block @click="closeDialog">Close</v-btn>
              </v-col>
              <v-col cols="6">
                <v-btn color="open" block :disabled="!isValid" @click="updateRequest">
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
import { requestSubjectRules } from "./../../util/vuetifyRules";
export default {
  name: "EditRequest",
  props: {
    request: Object
  },
  data() {
    return {
      dialogEditRequest: false,
      newRequestData: {
        subject: this.request.subject,
        description: this.request.description,
        isClosed: false
      },
      isValid: false,
      requestSubjectRules
    };
  },
  methods: {
    ...mapActions(["updateRequest"]),
    ...mapActions({
      _updateRequest: "updateRequest"
    }),
    updateRequest() {
      this._updateRequest({
        requestId: this.request.id,
        ...this.newRequestData
      }).then(this.closeDialog);
    },
    closeDialog() {
      this.dialogEditRequest = false;
      this.newRequestData = {};
    }
  }
};
</script>

