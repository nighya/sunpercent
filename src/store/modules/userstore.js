import axios from "axios";

const res_uri = "http://192.168.0.12:4000/api/test/user";

export default {
  namespaced: true,
  state: {
    allusers: [
      // { userId: "김씨", password: "111", local: "서울" },
      // { userId: "최씨", password: "222", local: "대전" },
    ],
  },
  getters: {
    //computed
    alluserscount: (state) => {
      return state.allusers.length;
    },
    allUserlist: (state) => {
      return state.allusers;
    },
  },
  mutations: {
    // addusers: (state, payload) => {
    //   state.allusers.push(payload);
    // },
    SET_USERS: (state, users) => {
      state.allusers = users;
    },
    POST_USERS: (state, datas) => {
      state.allusers.push(datas);
    },
    DELETE_USERS: (state, datas) => {
      state.allusers = state.allusers.filter((t) => datas.userId !== t.userId);
    },
    UPDATA_USERS: (state, datas) => {
      const index = state.allusers.findIndex((t) => t.userId === datas.userId);
      if (index !== -1) {
        state.allusers.splice(index, 1, datas);
      }
    },
  },
  actions: {
    async actionsaddusers({ commit }, payload) {
      const response = await axios.post(res_uri, payload);
      commit("POST_USERS", payload);
    },
    async getUsers({ commit }) {
      const response = await axios.get(res_uri,{ withCredentials: true });
      commit("SET_USERS", response.data);
    },
    async deleteUsers({ commit }, payload) {
      const response = await axios.delete(
        `http://192.168.0.12:4000/api/test/UserUserView/${payload}`
      );
      commit("DELETE_USERS", payload);
    },
    async updataUsers({ commit }, payload) {
      const response = await axios.post(
        `http://192.168.0.12:4000/api/test/UserUserView/${payload.id}/Edit`,
        payload
      );
      commit("UPDATA_USERS", payload);
    },
  },
};
