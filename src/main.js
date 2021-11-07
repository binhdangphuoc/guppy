import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import mixin from "./mixin"

import vClickOutside from 'v-click-outside'
import axios from "axios";
import VueAxios from "vue-axios";

Vue.use(VueAxios, axios);

Vue.config.productionTip = false
Vue.use(vClickOutside)
Vue.axios.defaults.headers = {
  'Content-type': 'application/json'

}
Vue.axios.defaults.baseURL = "http://localhost:8081";

// Vue.axios.defaults.baseURL = "https://fe0a639a-913d-4b73-a6b9-7ac6ba4d617f.mock.pstmn.io";


new Vue({
  router,
  store,
  mixin,
  render: h => h(App)
}).$mount('#app')
