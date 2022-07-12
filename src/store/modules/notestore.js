import http from "../../http/http";

export default {
  namespaced: true,
  state: { sent_note_state: [] },
  getters: {
    getters_getsentnote: state => {
      return state.sent_note_state;
    },
  },
  mutations: {
    SET_GET_SENT_NOTE: (state, datas) => {
      state.sent_note_state = datas;
    }
  },
  actions: {
    async getsentnote({ commit }, payload) {
      const response = await http.post(`/note/getsentnote`, payload, {
        withCredentials: true
      });
      commit("SET_GET_SENT_NOTE", response.data);
    }
  }
};
