<template>
  <div>
    <v-btn color="success" @click.stop="openFileUploader" block>
      <v-icon>mdi-camera-plus</v-icon>
    </v-btn>
    <v-file-input
      v-show="false"
      @click.stop
      @change="sendFiles"
      :id="`uploadFiles-${requestId}`"
      small-chips
      multiple
      v-model="files"
    />
  </div>
</template>

<script>
export default {
  props: {
    requestId: Number
  },
  data() {
    return {
      files: []
    };
  },
  methods: {
    openFileUploader() {
      document.getElementById(`uploadFiles-${this.requestId}`).click();
    },
    sendFiles() {
      const formDataFiles = new FormData();
      for (let file of this.files) formDataFiles.append("files", file);
      this.$store.dispatch("addFilesToRequest", {
        requestId: this.requestId,
        formDataFiles
      });
    }
  }
};
</script>
