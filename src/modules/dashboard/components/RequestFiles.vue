<template>
  <div>
    <div v-if="files.length > 0">
      <v-row>
        <v-col cols="12" v-for="file in files" :key="file.id">
          <v-btn
            @click.stop="downloadFile(file.id)"
            v-text="file.name"
            color="primary"
            block
            outlined
          />
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
    files: Array
  },
  methods: {
    downloadFile(fileId) {
      document.getElementById(`fileToDownload-${fileId}`).click();
    }
  }
};
</script>