import axios from "axios";
import http from "../../http/http"
const res_uri = "https://192.168.0.12:4000";

export default {
  namespaced: true,
  state: { scorestate: [] },
  getters: {
    scoreContent: state => {
      return state.scorestate;
    }
  },
  mutations: {
    SET_SCORE_CONTENT: (state, datas) => {
      window.dispatchEvent(new Event("resize"));
      state.scorestate = datas;
    }
  },
  actions: {
    async getscore({ commit }, payload) {
      console.log("getscore  payload   :  "+ payload)
      const response = await http.get(`/getscore/${payload}`, {
        withCredentials: true
      });
      commit("SET_SCORE_CONTENT", response.data);
    }
  }
};
