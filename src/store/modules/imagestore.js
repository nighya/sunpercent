import http from "../../http/http";
import router from "../../router";

export default {
  namespaced: true,
  state: {
    imagestate: [],
    imagestate_multi: [],
    imagedetail: [{ image_path: {} }],
    imagedetail_multi: [{ image_path: {} }],
    imagemycontentstate: [],
    imagemycontentstate_multi: [],
    userprofile: [{ profile_image: null }],
    userprofile_image: [{ image_path: null }],
    userprofile_image_multi: [{ image_path: null }]
  },
  getters: {
    mycontentimagegetters: state => {
      return state.imagemycontentstate;
    },
    mycontentimagegetters_multi: state => {
      return state.imagemycontentstate_multi;
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
    },
    userProfile_image_multi_getters: state => {
      return state.userprofile_image_multi;
    }
  },
  mutations: {
    USER_PROFILE: (state, datas) => {
      state.userprofile = datas;
    },
    USER_PROFILE_IMAGE: (state, datas) => {
      state.userprofile_image = datas;
    },
    USER_PROFILE_IMAGE_MULTI: (state, datas) => {
      state.userprofile_image_multi = datas;
    },
    CONTENT_SCORE: (state, datas) => {
      state.imagedetail[0].score_count = datas.score_count;
    },
    SET_MYCONTENT_IMAGE: (state, datas) => {
      state.imagemycontentstate = datas;
    },
    SET_MYCONTENT_IMAGE_MULTI: (state, datas) => {
      state.imagemycontentstate_multi = datas;
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
      const response = await http.get(`/sun/Mypage/mycontentimage/${payload}`, {
        withCredentials: true
      });
      const nomal_data = [];
      const multi_data = [];
      response.data.map(item => {
        if (item.image_path.includes("/multi_")) {
          item.image_path = item.image_path.split(",");
          multi_data.push(item);
        } else {
          nomal_data.push(item);
        }
      });
      commit("SET_MYCONTENT_IMAGE", nomal_data);
      commit("SET_MYCONTENT_IMAGE_MULTI", multi_data);
    },
    async getallimages({ commit }) {
      const response = await http.get(`/sun/getAllimages`, {
        withCredentials: true
      });
      commit("SET_IMAGE", response.data);
    },
    async getallimages_multi({ commit }) {
      const response = await http.get(`/sun/getAllimages_multi`, {
        withCredentials: true
      });
      let image_path_arr = response.data.map(item => {
        item.image_path = item.image_path.split(",");
      });
      // console.log(test);
      commit("SET_IMAGE_MULTI", response.data);
    },
    async getimage({ commit }, payload) {
      const response = await http.get(`/sun/getimage/${payload}`, {
        withCredentials: true
      });
      if (response.data.length == 0) {
        router.push("/NotFound");
      } else {
        commit("SET_IMAGE_DETAIL", response.data);
      }
    },
    async getimage_multi({ commit }, payload) {
      const response = await http.get(`/sun/getimage_multi/${payload}`, {
        withCredentials: true
      });
      if (response.data.length == 0) {
        router.push("/NotFound");
      }
      let image_path_arr = response.data.map(item => {
        item.image_path = item.image_path.split(",");
      });
      commit("SET_IMAGE_DETAIL_MULTI", response.data);
    },

    async deleteImage({ commit }, payload) {
      const response = await http.post(
        `/sun/getimage/${payload.content_uid}`,
        payload,
        {
          withCredentials: true
        }
      );
      commit("DELETE_IMAGE", payload);
    },
    async deleteImage_multi({ commit }, payload) {
      const response = await http.post(
        `/sun/getimage_multi/${payload.content_uid}`,
        payload,
        {
          withCredentials: true
        }
      );
      commit("DELETE_IMAGE_MULTI", payload);
    },

    async contentscore({ commit }, payload) {
      const response = await http.post(
        `/sun/contentscore/${payload.content_uid}`,
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
        `/sun/userpageProfile/${payload.nickname}/${payload.user_uid}`,
        payload,
        {
          withCredentials: true
        }
      );
      commit("USER_PROFILE", response.data);
    },
    async userProfile_image({ commit }, payload) {
      const response = await http.post(
        `/sun/userpageProfileImage/${payload.nickname}/${payload.user_uid}`,
        payload,
        {
          withCredentials: true
        }
      );
      const nomal_data = [];
      const multi_data = [];
      response.data.map(data => {
        if (data.image_path.includes("/multi_")) {
          data.image_path = data.image_path.split(",");
          multi_data.push(data);
        } else {
          nomal_data.push(data);
        }
      });
      commit("USER_PROFILE_IMAGE", nomal_data);
      commit("USER_PROFILE_IMAGE_MULTI", multi_data);
    }
  }
};
