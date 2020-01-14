<template>
  <div>
    <div v-if="files.length > 0">
      <v-row v-for="file in files" :key="file.id">
        <v-col cols="10">
          <v-btn @click.stop="downloadFile(file.id)" color="primary" block outlined>{{file.name}}</v-btn>
        </v-col>
        <v-col cols="2">
          <v-btn icon color="closed" @click.stop="deleteFile({requestId, fileId: file.id})">
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
import { mapActions } from "vuex";

export default {
  name: "RequestFiles",
  props: {
    files: Array,
    requestId: Number
  },
  methods: {
    ...mapActions(["deleteFile"]),
    downloadFile(fileId) {
      document.getElementById(`fileToDownload-${fileId}`).click();
    }
  }
};
</script>