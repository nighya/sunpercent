import http from "../../http/http";

export default {
  namespaced: true,
  state: { sent_note_state: [] },
  getters: {
    getters_getsentnote: state => {
      return state.sent_note_state;
    }
  },
  mutations: {
    SET_GET_SENT_NOTE: async (state, datas) => {
      try {
        const result = await datas.map(data => {
          if (data.view_count > 0) {
            data.view_count = "읽음";
          } else {
            data.view_count = "읽지않음";
          }
        });
      } catch (e) {
        throw e;
      }
      console.log("result  :  " + datas);
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
