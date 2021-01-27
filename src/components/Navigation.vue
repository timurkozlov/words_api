<template>
  <nav>
    <ul class="menu">
      <li class="logo">
        <router-link to="/">Word Keeper</router-link>
      </li>
      <li class="item-link">
        <router-link to="/starred">&#9733; Starred Words</router-link>
      </li>
    </ul>
  </nav>
</template>
<script>
export default {
  name: "Navigation",
  methods: {}
};
</script>
<style lang="scss">
nav {
  background: #222;
  padding: 0 15px;
}
a {
  color: white;
  text-decoration: none;
}
.menu {
  list-style-type: none;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
}
.menu li a {
  display: block;
  padding: 15px 5px;
}
.logo {
  font-size: 32px;
  padding: 10px;
}
.item-link {
  font-size: 24px;
  padding: 10px;
}
</style>
