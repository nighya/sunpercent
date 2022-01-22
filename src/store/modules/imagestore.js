import axios from "axios";

const res_uri = "http://localhost:4000/api/test/getAllimages";

export default {
  namespaced: true,
  state: {
    imagestate: [],
  },
  getters: {
    allImagelist: (state) => {
      return state.imagestate;
    },
  },
  mutations: {
    SET_IMAGE: (state, datas) => {
      state.imagestate = datas;
    },
    DELETE_IMAGE: (state, datas) => {
      state.imagestate = state.imagestate.filter(
        (t) => datas.content_uid !== t.content_uid
      );
    },
  },
  actions: {
    async getallimages({ commit }) {
      const response = await axios.get(res_uri, { withCredentials: true });
      commit("SET_IMAGE", response.data);
    },
    async deleteImage({ commit }, payload) {
      const response = await axios.post(
        `http://localhost:4000/api/test/getimage/${payload.content_uid}`,
        payload
      );
      console.log("이미지스토어payload:", payload);
      commit("DELETE_IMAGE", payload);
    },
  },
};
