<template>
  <div>{{currentUser}}</div>
</template>

<script>
export default {
  name: "Dashboard",
  computed: {
    currentUser() {
      return this.$store.state.user;
    }
  },
  beforeCreate() {
    setTimeout(() => {
      this.$store.dispatch("me");
    }, 0);
  }
};
</script>
