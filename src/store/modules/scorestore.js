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
      const content_uid = payload.content_uid
      const current_user_uid = payload.user_uid
      // console.log("getscore  content_uid   :  " + payload.content_uid)
      // console.log("getscore  current_user_uid 2  :  "+payload.user_uid )
      
      const response = await http.post(`/getscore/${content_uid}`, current_user_uid,{
        withCredentials: true
      });
      commit("SET_SCORE_CONTENT", response.data);
    }
  }
};
