<template>
  <div>
    <div v-if="files.length > 0">
      {{files}}
      <v-row>
        <v-col cols="12" v-for="file in files" :key="file.id">
          <v-btn @click.stop block outlined v-text="file.name" color="primary" />
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
  }
};
</script>