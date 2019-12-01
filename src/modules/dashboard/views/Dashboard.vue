<template>
  <div>{{ user }}</div>
</template>

<script>
export default {
  name: "Dashboard",
  computed: {
    user() {
      if (this.$store.getters.IS_LOADING) return `Loading`;
      return this.$store.getters.USER;
    }
  },
  mounted() {
    setTimeout(() => {
      this.$store.dispatch("me");
    }, 0);
  }
};
</script>
