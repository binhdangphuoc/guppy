import createPersistedState from "vuex-persistedstate";
import Vue from 'vue'
import Vuex from 'vuex'
import home from "./home"
import guppy from "./guppy"
import blogs from "./blogs"
import detail from "./detail"
import admin from "./admin"

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    home,
    guppy,
    blogs,
    detail,
    admin
  }
})
