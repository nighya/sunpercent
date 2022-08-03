import Vue from "vue";
import Vuex from "vuex";
import loginstore from "./modules/loginstore";
import createPersistedState from "vuex-persistedstate";
import imagestore from "./modules/imagestore";
import scorestore from "./modules/scorestore";
import notestore from "./modules/notestore";

import SecureLS from "secure-ls";
const ls = new SecureLS({
  encodingType: "aes", // changeable
  isCompression: false,
  encryptionSecret: process.env.COOKIE_SECRET, // change this
  useSessionStorage: true
});

import { EncryptStorage } from "encrypt-storage";
import VuexPersistence from "vuex-persist";
export const encryptStorage = new EncryptStorage(`"${ process.env.COOKIE_SECRET }"`, {
  storageType: "sessionStorage"
  // storageType: "localStorage"
});
const vuexLocal = new VuexPersistence({
  storage: encryptStorage,
  modules: ["loginstore"]
});

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
    notestore: notestore
  },
  plugins: [
    createPersistedState({
      // storage: window.sessionStorage,
      storage: {
        getItem: key => ls.get(JSON.stringify(key)),
        setItem: (key, value) => JSON.stringify(ls.set(key, value)),
        removeItem: key => JSON.stringify(ls.remove(key)),
      },
      paths: ["imagestore", "scorestore"],
      
    }),
    vuexLocal.plugin
  ]
});
