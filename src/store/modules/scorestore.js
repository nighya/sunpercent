import axios from "axios";

const res_uri = "http://192.168.0.12:4000";

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
      const response = await axios.get(`${res_uri}/getscore/${payload}`, {
        withCredentials: true
      });
      commit("SET_SCORE_CONTENT", response.data);
    }
  }
};
