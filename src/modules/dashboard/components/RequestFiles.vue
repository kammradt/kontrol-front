<template>
  <div>
    <div v-if="files.length > 0">
      <v-row v-for="file in files" :key="file.id">
        <v-col cols="10">
          <v-btn @click.stop="downloadFile(file.id)" color="primary" block outlined>{{file.name}}</v-btn>
        </v-col>
        <v-col cols="2">
          <v-btn icon color="closed" @click.stop="deletefile(file.id)">
            <v-icon>mdi-delete-empty</v-icon>
          </v-btn>
          <a
            :id="`fileToDownload-${file.id}`"
            :href="file.location"
            v-show="false"
            download
            @click.stop
          />
        </v-col>
      </v-row>
    </div>
    <div v-else>
      <v-btn @click.stop block outlined v-text="'No files :('" color="secondary" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    files: Array,
    requestId: Number
  },
  methods: {
    downloadFile(fileId) {
      document.getElementById(`fileToDownload-${fileId}`).click();
    },
    deletefile(fileId) {
      this.$store.dispatch("deleteFile", {
        requestId: this.requestId,
        fileId
      });
    }
  }
};
</script>