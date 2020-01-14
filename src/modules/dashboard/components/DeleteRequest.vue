<template>
  <v-btn color="closed" icon dark @click.stop="deleteRequest(requestId)">
    <v-icon v-text="'mdi-delete-empty'" />
  </v-btn>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "DeleteRequest",
  props: {
    requestId: Number
  },
  methods: {
    ...mapActions(["deleteRequest"])
  }
};
</script>
