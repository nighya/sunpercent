import http from "../../http/http";

export default {
  namespaced: true,
  state: {
    sent_note_state: [],
    received_note_state: []
  },
  getters: {
    getters_getsentnote: state => {
      return state.sent_note_state;
    }
  },
  mutations: {
    SET_GET_SENT_NOTE: async (state, datas) => {
      try {
        const filterData = await datas.filter(d => d.from_delete == 0);
        await filterData.map(data => {
          if (data.view_count > 0) {
            data.view_count = "읽음";
          } else {
            data.view_count = "읽지않음";
          }
        });
        state.sent_note_state = filterData;
      } catch (e) {
        throw e;
      }
    },
    SET_GET_RECEIVED_NOTE: async (state, datas) => {
      try {
        const filterData = await datas.filter(d => d.to_delete == 0);
        await filterData.map(data => {
          if (data.view_count > 0) {
            data.view_count = "읽음";
          } else {
            data.view_count = "읽지않음";
          }
        });
        state.received_note_state = filterData;
      } catch (e) {
        throw e;
      }
    },
  },
  actions: {
    async getsentnote({ commit }, payload) {
      const response = await http.post(`/note/getsentnote`, payload, {
        withCredentials: true
      });
      commit("SET_GET_SENT_NOTE", response.data);
    },

    async getreceivednote({ commit }, payload) {
      const response = await http.post(`/note/getreceivednote`, payload, {
        withCredentials: true
      });
      commit("SET_GET_RECEIVED_NOTE", response.data);
    }
  }
};
