// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import httpurl from './http/http'
import vuetify from './plugins/vuetify'
import store from './store'
import VueApexCharts from 'vue-apexcharts'
Vue.use(VueApexCharts)
Vue.component('apexchart', VueApexCharts)

import VueSimpleAlert from "vue-simple-alert";
Vue.use(VueSimpleAlert);

import ToggleButton from "vue-js-toggle-button";
Vue.use(ToggleButton);
// import io from "socket.io-client";
import io from "socket.io-client";
const socket = io("https://socket.sunpercent.com", {
  withCredentials: true
});

Vue.prototype.$socket = socket;

Vue.prototype.$httpurl = "https://sunpercent.com";

Vue.config.productionTip = false

Vue.use(vuetify);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  vuetify,
  store,
  httpurl,
  template: '<App/>'
})
