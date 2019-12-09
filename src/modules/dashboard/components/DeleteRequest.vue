<template>
  <v-btn color="closed" icon dark @click.stop="deleteRequest">
    <v-icon v-text="'mdi-delete-empty'" />
  </v-btn>
</template>

<script>
export default {
  name: "DeleteRequest",
  props: {
    requestId: Number
  },
  methods: {
    deleteRequest() {
      this.$store.dispatch("deleteRequest", this.requestId)
    }
  }
};
</script>
