import Vue from "vue";
import Vuex from "vuex";
import { favourites } from "./favourites";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  modules: {
    favourites
  },
  mutations: {},
  actions: {},
  getters: {}
});
