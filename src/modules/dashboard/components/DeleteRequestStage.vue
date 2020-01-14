<template>
  <v-btn color="closed" icon dark @click.stop="deleteRequestStage(requestStageId)">
    <v-icon v-text="'mdi-delete-empty'" />
  </v-btn>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: "DeleteRequestStage",
  props: {
    requestStageId: Number
  },
  methods: {
    ...mapActions(['deleteRequestStage']),
  }
};
</script>
