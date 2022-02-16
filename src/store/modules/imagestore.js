import axios from "axios";

const res_uri = "http://192.168.0.12:4000";

export default {
  namespaced: true,
  state: {
    imagestate: [],
    imagedetail: [{ image_path: {} }],
    imagemycontentstate:[],
  },
  getters: {
    mycontentimagegetters: (state) => {
      return state.imagemycontentstate;
    },
    allImagelist: (state) => {
      return state.imagestate;
    },
    imageDetail: (state) => {
      return state.imagedetail;
    },

  },
  mutations: {
    SET_MYCONTENT_IMAGE: (state, datas) => {
      state.imagemycontentstate = datas;
    },
    SET_IMAGE: (state, datas) => {
      state.imagestate = datas;
    },
    SET_IMAGE_DETAIL: (state, datas) => {
      state.imagedetail = datas;
    },

    DELETE_IMAGE: (state, datas) => {
      state.imagestate = state.imagestate.filter(
        (t) => datas.content_uid !== t.content_uid
      );
    },
  },
  actions: {
    async mycontentimage({ commit },payload) {
      const response = await axios.get(`${res_uri}/Mypage/mycontentimage/${payload}`, { withCredentials: true });
      commit("SET_MYCONTENT_IMAGE", response.data);
    },
    async getallimages({ commit }) {
      const response = await axios.get(`${res_uri}/getAllimages`, { withCredentials: true });
      commit("SET_IMAGE", response.data);
    },
    async getimage({ commit }, payload) {
      const response = await axios.get(`${res_uri}/getimage/${payload}`, { withCredentials: true });
      commit("SET_IMAGE_DETAIL", response.data);
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
