import axios from "axios";

const res_uri = "http://localhost:4000/api/test/data";

export default {
  namespaced: true,
  state: {
    userdatas: [
      // { dataId: "첫번째", data1: "111", data2: "데이터1" },
      // { dataId: "두번째", data1: "222", data2: "데이터2" },
    ],
  },
  getters: {
    alldatacount: (state) => {
      return state.userdatas.length;
    },
    allDatalist: (state) => {
      return state.userdatas;
    },
  },
  mutations: {
    UPDATA_DATAS: (state, datas) => {
      const index = state.userdatas.findIndex((t) => t.dataId === datas.dataId);
      if (index !== -1) {
        state.userdatas.splice(index, 1, datas);
      }
    },

    DELETE_DATAS: (state, datas) => {
      state.userdatas = state.userdatas.filter(
        (t) => datas.dataId !== t.dataId
      );
    },
    POST_DATAS: (state, datas) => {
      state.userdatas.push(datas);
    },
    SET_DATAS: (state, datas) => {
      state.userdatas = datas;
    },
  },
  actions: {
    async actionsadduserdata({ commit }, payload) {
      const response = await axios.post(res_uri, payload);
      commit("POST_DATAS", payload);
    },

    async getDatas({ commit }) {
      const response = await axios.get(res_uri,{ withCredentials: true });
      commit("SET_DATAS", response.data);
    },

    async deleteDatas({ commit }, payload) {
      const response = await axios.delete(
        `http://localhost:4000/api/test/UserDataView/${payload}`
      );
      commit("DELETE_DATAS", payload);
    },
    async updataDatas({ commit }, payload) {
      const response = await axios.post(
        `http://localhost:4000/api/test/UserDataView/${payload.id}/Edit`,
        payload
      );
      commit("UPDATA_DATAS", payload);
    },
  },
};
