import Vue from "vue";
import Vuex from "vuex";
import userstore from "./modules/userstore"
import datastore from "./modules/datastore"
import loginstore from "./modules/loginstore"
import createPersistedState from "vuex-persistedstate";
import imagestore from "./modules/imagestore";


Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    //모듈이름:임포트한이름
    userstore: userstore,
    datastore: datastore,
    loginstore: loginstore,
    imagestore: imagestore,
  },
  plugins: [createPersistedState({
    storage: window.sessionStorage,
    paths:["loginstore"]
  })]
});
