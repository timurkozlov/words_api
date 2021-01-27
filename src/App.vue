<template>
  <div id="app">
    <Navigation />
    <router-view />
  </div>
</template>
<script>
import Navigation from "@/components/Navigation.vue";

export default {
  name: "App",
  components: {
    Navigation
  },
  computed: {},
  created() {}
};
</script>
<style lang="scss">
body {
  font-family: sans-serif;
  font-size: 24px;
  background: #f8f9fa;
}
#app {
  height: 100%;
  max-width: 100%;
}
.row {
  display: flex;
  align-content: flex-start;
}
.search-column {
  max-width: 40%;
}
.items-column {
  flex: 1;
  width: 70%;
}
@media (max-width: 1100px) {
  .row {
    display: block;
  }
  .search-column {
    margin-left: 8px;
    max-width: 80%;
  }
  .items-column {
    width: 100%;
  }
}
</style>
