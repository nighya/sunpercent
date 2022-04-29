import Vue from "vue";
import Vuex from "vuex";
import loginstore from "./modules/loginstore"
import createPersistedState from "vuex-persistedstate";
import imagestore from "./modules/imagestore";
import scorestore from "./modules/scorestore";


Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    //모듈이름:임포트한이름
    loginstore: loginstore,
    imagestore: imagestore,
    scorestore: scorestore,
  },
  plugins: [createPersistedState({
    storage: window.sessionStorage,
    paths:["loginstore"]
  })]
});
