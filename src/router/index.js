import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Starred from "../views/Starred.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/starred",
    name: "starred",
    component: Starred
  }
];

const router = new VueRouter({
  routes
});

export default router;
