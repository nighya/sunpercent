import http from "../../http/http";
import router from "../../router/index";
import ls from "localstorage-slim";
ls.config.encrypt = true;

export default {
  namespaced: true,
  state: {
    userstate: [
      {
        user_uid: null,
        email: null,
        nickname: null,
        gender: null,
        max_score: null,
        profile_image: null,
        point: null
      }
    ],
    isLogined: false
  },
  getters: {
    getMembergetters: state => {
      return state.userstate;
    },
    isLoginedgetters: state => {
      return state.isLogined;
    }
  },
  mutations: {
    // POST_LOGIN: (state, datas) => {
    //   state.userstate.push(datas);
    // },
    SET_PROFILE_IMAGE: (state, datas) => {
      state.userstate[0].profile_image = datas.profile_image;
    },
    DELETE_PROFILE_IMAGE: (state, datas) => {
      state.userstate[0].profile_image = null;
    },

    SET_USER_POINT: (state, payload) => {
      // console.log("payload.point1   :   " + JSON.stringify(payload[0].point))
      // console.log("payload.point2   :   "+Object.keys(payload))
      state.userstate[0].point = JSON.stringify(payload[0].point);
    },

    register(state, payload) {},
    // PASSWORD_RESET_MAIL_SEND(state, payload){},

    loginToken(state, payload) {
      // VueCookies.set("accessToken", payload.accessToken, "60s");
      // VueCookies.set("refreshToken", payload.refreshToken, "1h");
      state.userstate[0].user_uid = payload.user_uid;
      state.userstate[0].email = payload.email;
      state.userstate[0].nickname = payload.nickname;
      state.userstate[0].gender = payload.gender;
      state.userstate[0].profile_image = payload.profile_image;
      state.userstate[0].point = payload.point;
      state.userstate[0].needchpw = payload.needchpw;
      state.isLogined = true;
      // state.userstate = payload
    },
    LOGOUT(state) {
      state.userstate[0].user_uid = null;
      state.userstate[0].email = null;
      state.userstate[0].nickname = null;
      state.userstate[0].gender = null;
      state.userstate[0].profile_image = null;
      state.userstate[0].point = null;
      state.userstate[0].needchpw = null;
      state.isLogined = false;
    }
  },
  actions: {
    // async actionsadduserLogin({ commit }, payload) {
    //   const response = await http.post(res_uri, payload);
    //   commit("POST_LOGIN", payload);
    // },
    async login({ commit }, payload) {
      
      try {
        const get_lo_storage = ls.get("pre_target");
        const response = await http.post("/sun/login", payload, {
          withCredentials: true
        });
        commit("loginToken", response.data);
        
        if (get_lo_storage !== null) {
          // console.log("get_lo_storage ?????? if??? ?????? : "+get_lo_storage)
          router.go(-1);
        } else {
          // console.log("get_lo_storage ?????? else??? ?????? : "+get_lo_storage)
          router.push("/");
        }
      } catch (err) {
        alert("????????? ?????? ???????????????.");
        console.log("Login ??????  :" + err);
        throw err;
      }
    },
    logout({ commit }) {
      commit("LOGOUT");
    },

    async getUserPoint({ commit }, payload) {
      try {
        // console.log("getUserPoint payload   :   "+ payload)
        const response = await http.post("/sun/getUserPoint", payload, {
          withCredentials: true
        });
        commit("SET_USER_POINT", response.data);
        // console.log("response.data  :"+JSON.stringify(response.data))
      } catch (err) {
        // console.log("getUser error  :  " + err);
        throw err;
      }
    },

    register: ({ commit }, params) => {
      return new Promise((resove, reject) => {
        http
          .post("/sun/register", params, {
            withCredentials: true
          })
          .then(res => {
            commit("register", res.data);
            console.log(res);
            resove(res);
          })
          .catch(err => {
            alert(
              "??????????????? ?????? ???????????????.??????????????? ???????????? ?????? ?????? ????????? ?????????."
            );
            reject(err.message);
          });
      });
    },
    async profile_image_update({ commit }, payload) {
      const fd = new FormData();
      fd.append("image", payload.image);
      fd.append("user_uid", payload.user_uid);
      try {
        const response = await http.post(
          `/sun/Mypage/${payload.user_uid}`,
          fd,
          {
            withCredentials: true
          }
        );
        commit("SET_PROFILE_IMAGE", response.data);
      } catch (err) {
        alert(
          "????????? ?????? ????????? ?????????????????????. ????????? ???????????? ?????????????????? ?????? ??????????????? ????????? ?????????."
        );
      }
    },
    async profile_image_delete({ commit }, payload) {
      try {
        const response = await http.post(
          `/sun/Mypage/deleteProfileImage/${payload.user_uid}`,
          payload,
          {
            withCredentials: true
          }
        );
        commit("DELETE_PROFILE_IMAGE", response.data);
      } catch (err) {
        console.log("????????? ?????? ??????   :  " + err);
        alert("????????? ?????? ???????????? ?????????????????????.");
      }
    }
  }
};
