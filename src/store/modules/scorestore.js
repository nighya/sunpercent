import http from "../../http/http"

export default {
  namespaced: true,
  state: {
    scorestate: [],
    scorestate_multi:[],
  },
  getters: {
    scoreContent: state => {
      return state.scorestate;
    }
  },
  mutations: {
    SET_SCORE_CONTENT: (state, datas) => {
      window.dispatchEvent(new Event("resize"));
      state.scorestate = datas;
    },
    SET_SCORE_CONTENT_MULTI: (state, datas) => {
      state.scorestate_multi = datas;
    },
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
    },
    async getscore_multi({ commit }, payload) {
      const content_uid = payload.content_uid
      const response = await http.post(`/getscore_multi/${content_uid}`, {
        withCredentials: true
      });
      commit("SET_SCORE_CONTENT_MULTI", response.data);
    },
  }
};
