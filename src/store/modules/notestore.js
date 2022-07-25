import http from "../../http/http";

export default {
  namespaced: true,
  state: {
    sent_note_state: [],
    received_note_state: [],
    confirm_received_state:0
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
        // await filterData.map(data => {
        //   if (data.view_count > 0) {
        //     data.view_count = "읽음";
        //   } else {
        //     data.view_count = "읽지않음";
        //   }
        // });

        state.sent_note_state = filterData;
      } catch (e) {
        throw e;
      }
    },
    SET_GET_RECEIVED_NOTE: async (state, datas) => {
      try {
        const filterData = await datas.filter(d => d.to_delete == 0);
        // await filterData.map(data => {
        //   if (data.view_count > 0) {
        //     data.view_count = "읽음";
        //   } else {
        //     data.view_count = "읽지않음";
        //   }
        // });
        state.confirm_received_state = 0
        await datas.map(data => {
          if (data.view_count == 0) {
            state.confirm_received_state += 1
        }})
        state.received_note_state = filterData;
      } catch (e) {
        throw e;
      }
    },
    DELETE_SENT_NOTE_DETAIL: (state, datas) => {
      state.sent_note_state = state.sent_note_state.filter(
        t => datas.id_num !== t.id_num
      );
    },

    DELETE_SENT_NOTE_SELECTED: (state, datas) => {
      datas.map(item => {
        state.sent_note_state = state.sent_note_state.filter(
          t => item.id_num !== t.id_num
        );
      });
    },

    DELETE_RECEIVED_NOTE_DETAIL: (state, datas) => {
      state.received_note_state = state.received_note_state.filter(
        t => datas.id_num !== t.id_num
      );
    },

    DELETE_RECEIVED_NOTE_SELECTED: (state, datas) => {
      datas.map(item => {
        state.received_note_state = state.received_note_state.filter(
          t => item.id_num !== t.id_num
        );
      });
    }
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
    },

    async deletesentnotedetail({ commit }, payload) {
      try {
        const response = await http.post(
          `/notedelete/deleteSentNoteDetail`,
          payload,
          {
            withCredentials: true
          }
        );
      } catch (err) {}
      console.log(payload);
      commit("DELETE_SENT_NOTE_DETAIL", payload);
    },

    async deletereceivednotedetail({ commit }, payload) {
      try {
        const response = await http.post(
          `/notedelete/deleteReceivedNoteDetail`,
          payload,
          {
            withCredentials: true
          }
        );
      } catch (err) {}

      commit("DELETE_RECEIVED_NOTE_DETAIL", payload);
    },

    async deletesentnoteselected({ commit }, payload) {
      try {
        const response = http.post(
          `/notedelete/deleteSentNoteSelected`,
          payload,
          {
            withCredentials: true
          }
        );
      } catch (err) {}
      commit("DELETE_SENT_NOTE_SELECTED", payload);
    },

    async deletreceivednoteselected({ commit }, payload) {
      try {
        const response = http.post(
          `/notedelete/deleteReceivedNoteSelected`,
          payload,
          {
            withCredentials: true
          }
        );
      } catch (err) {}
      commit("DELETE_RECEIVED_NOTE_SELECTED", payload);
    },

    async confirmreceivednote({ commit }, payload) {
      try {
        const response = await http.post(
          `/confirm_received_NoteDetail`,
          payload,
          { withCredentials: true }
        );
      } catch (err) {}
    }
  }
};
