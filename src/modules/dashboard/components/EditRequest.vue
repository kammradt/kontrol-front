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
  </div>
</template>

<script>
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
      }
    };
  },
  methods: {
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
      this.dialogEditRequest = false;
      this.newRequestData = {};
    }
  }
};
</script>

