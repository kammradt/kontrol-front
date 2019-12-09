<template>
  <v-btn color="closed" icon dark @click.stop="deleteRequestStage">
    <v-icon v-text="'mdi-delete-empty'" />
  </v-btn>
</template>

<script>
export default {
  name: "DeleteRequestStage",
  props: {
    requestStageId: Number
  },
  methods: {
    deleteRequestStage() {
      this.$store.dispatch("deleteRequestStage", this.requestStageId)
    }
  }
};
</script>
