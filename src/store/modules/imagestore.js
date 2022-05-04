import axios from "axios";
import { data } from "vue-apexcharts";
import http from "../../http/http";

const res_uri = "https://192.168.0.12:4000";

export default {
  namespaced: true,
  state: {
    imagestate: [],
    imagedetail: [{ image_path: {} }],
    imagemycontentstate: []
  },
  getters: {
    mycontentimagegetters: state => {
      return state.imagemycontentstate;
    },
    allImagelist: state => {
      return state.imagestate;
    },
    imageDetail: state => {
      return state.imagedetail;
    }
  },
  mutations: {
    CONTENT_SCORE: (state, datas) => {
      state.imagedetail[0].content_average_score = datas.content_average_score;
      state.imagedetail[0].score_count = datas.score_count;
    },
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
        t => datas.content_uid !== t.content_uid
      );
    }
  },
  actions: {
    async mycontentimage({ commit }, payload) {
      const response = await http.get(`/Mypage/mycontentimage/${payload}`, {
        withCredentials: true
      });
      commit("SET_MYCONTENT_IMAGE", response.data);
    },
    async getallimages({ commit }) {
      const response = await http.get(`/getAllimages`, {
        withCredentials: true
      });
      commit("SET_IMAGE", response.data);
    },
    async getimage({ commit }, payload) {
      const response = await http.get(`/getimage/${payload}`, {
        withCredentials: true
      });
      commit("SET_IMAGE_DETAIL", response.data);
    },

    async deleteImage({ commit }, payload) {
      const response = await http.post(
        `/getimage/${payload.content_uid}`,
        payload,
        {
          withCredentials: true
        }
      );
      commit("DELETE_IMAGE", payload);
    },

    async contentscore({ commit }, payload) {
      const response = await http.post(
        `/contentscore/${payload.content_uid}`,
        payload,
        {
          withCredentials: true
        }
      );
      console.log("contentscore payload:  ", payload);
      commit("CONTENT_SCORE", response.data);
    }
  }
};
