import http from "../../http/http";

export default {
  namespaced: true,
  state: {
    imagestate: [],
    imagestate_multi: [],
    imagedetail: [{ image_path: {} }],
    imagedetail_multi: [{ image_path: {} }],
    imagemycontentstate: [],
    userprofile: [{ profile_image: null }],
    userprofile_image: [{ image_path: null }]
  },
  getters: {
    mycontentimagegetters: state => {
      return state.imagemycontentstate;
    },
    allImagelist: state => {
      return state.imagestate;
    },
    allImagelist_multi: state => {
      return state.imagestate_multi;
    },
    imageDetail: state => {
      return state.imagedetail;
    },
    imageDetail_multi: state => {
      return state.imagedetail_multi;
    },
    userProfile_getters: state => {
      return state.userprofile;
    },
    userProfile_image_getters: state => {
      return state.userprofile_image;
    }
  },
  mutations: {
    USER_PROFILE: (state, datas) => {
      state.userprofile = datas;
    },
    USER_PROFILE_IMAGE: (state, datas) => {
      state.userprofile_image = datas;
    },
    CONTENT_SCORE: (state, datas) => {
      state.imagedetail[0].score_count = datas.score_count;
    },
    SET_MYCONTENT_IMAGE: (state, datas) => {
      state.imagemycontentstate = datas;
    },
    SET_IMAGE: (state, datas) => {
      state.imagestate = datas;
    },
    SET_IMAGE_MULTI: (state, datas) => {
      state.imagestate_multi = datas;
    },
    SET_IMAGE_DETAIL: (state, datas) => {
      state.imagedetail = datas;
    },
    SET_IMAGE_DETAIL_MULTI: (state, datas) => {
      state.imagedetail_multi = datas;
    },

    DELETE_IMAGE: (state, datas) => {
      state.imagestate = state.imagestate.filter(
        t => datas.content_uid !== t.content_uid
      );
    },
    DELETE_IMAGE_MULTI: (state, datas) => {
      state.imagestate_multi = state.imagestate_multi.filter(
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
    async getallimages_multi({ commit }) {
      const response = await http.get(`/getAllimages_multi`, {
        withCredentials: true
      });
      let image_path_arr = response.data.map(item => {
        item.image_path = item.image_path.split(",");
      });
      // console.log(test);
      commit("SET_IMAGE_MULTI", response.data);
    },
    async getimage({ commit }, payload) {
      const response = await http.get(`/getimage/${payload}`, {
        withCredentials: true
      });
      commit("SET_IMAGE_DETAIL", response.data);
    },
    async getimage_multi({ commit }, payload) {
      const response = await http.get(`/getimage_multi/${payload}`, {
        withCredentials: true
      });
      let image_path_arr = response.data.map(item => {
        item.image_path = item.image_path.split(",");
      });
      commit("SET_IMAGE_DETAIL_MULTI", response.data);
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
    async deleteImage_multi({ commit }, payload) {
      const response = await http.post(
        `/getimage_multi/${payload.content_uid}`,
        payload,
        {
          withCredentials: true
        }
      );
      commit("DELETE_IMAGE_MULTI", payload);
    },

    async contentscore({ commit }, payload) {
      const response = await http.post(
        `/contentscore/${payload.content_uid}`,
        payload,
        {
          withCredentials: true
        }
      );
      // console.log("contentscore payload:  ", payload);
      commit("CONTENT_SCORE", response.data);
    },
    async userProfile({ commit }, payload) {
      const response = await http.post(
        `/userpageProfile/${payload.nickname}/${payload.user_uid}`,
        payload,
        {
          withCredentials: true
        }
      );
      commit("USER_PROFILE", response.data);
    },
    async userProfile_image({ commit }, payload) {
      const response = await http.post(
        `/userpageProfileImage/${payload.nickname}/${payload.user_uid}`,
        payload,
        {
          withCredentials: true
        }
      );

      commit("USER_PROFILE_IMAGE", response.data);
    }
  }
};
