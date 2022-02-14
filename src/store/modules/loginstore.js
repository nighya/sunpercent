import axios from "axios";

const res_uri = "http://192.168.0.12:4000/login";

export default {
  namespaced: true,
  state: {
    userstate: [{ user_uid: null, email: null, nickname: null, gender: null, max_score:null,profile_image:null }],
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
    SET_MEMBER: (state, datas) => {
      state.userstate = datas;
    },
    register(state, payload) {},
    loginToken(state, payload) {
      // VueCookies.set("accessToken", payload.accessToken, "60s");
      // VueCookies.set("refreshToken", payload.refreshToken, "1h");
      state.userstate[0].user_uid = payload.user_uid;
      state.userstate[0].email = payload.email;
      state.userstate[0].nickname = payload.nickname;
      state.userstate[0].gender = payload.gender;
      state.userstate[0].max_score = payload.max_score;
      state.userstate[0].profile_image = payload.profile_image;
      state.isLogined = true;
      // state.userstate = payload
    },
    LOGOUT(state) {
      state.userstate[0].user_uid = null;
      state.userstate[0].email = null;
      state.userstate[0].nickname = null;
      state.userstate[0].gender = null;
      state.userstate[0].max_score =null;
      state.userstate[0].profile_image = null;
      state.isLogined = false;
    }
  },
  actions: {
    // async actionsadduserLogin({ commit }, payload) {
    //   const response = await axios.post(res_uri, payload);
    //   commit("POST_LOGIN", payload);
    // },
    async login({ commit }, payload) {
      try {
        const response = await axios.post(res_uri, payload, {
          withCredentials: true
        });
        commit("loginToken", response.data);
      } catch (err) {
        alert("로그인 되지 않았습니다.");
        throw err;
      }
    },
    logout({ commit }) {
      commit("LOGOUT");
    },

    register: ({ commit }, params) => {
      return new Promise((resove, reject) => {
        axios
          .post("http://192.168.0.12:4000/register", params, {
            withCredentials: true
          })
          .then(res => {
            commit("register", res.data);
            console.log(res);
            resove(res);
          })
          .catch(err => {
            alert("회원등록이 되지 않았습니다.이메일이나 닉네임을 바꿔 다시 등록해 주세요.");
            reject(err.message);
          });
      });
    },
    async getMember({ commit }, payload) {
      const response = await axios.get(
        `http://192.168.0.12:4000/api/test/Mypage/${payload}`,
        { withCredentials: true }
      );
      commit("SET_MEMBER", response.data);
    },
    async profile_image_update({ commit }, payload) {
      const fd = new FormData();
      fd.append("image", payload.image);
      fd.append("user_uid", payload.user_uid);
      try {
        const response = await axios.post(
          `http://192.168.0.12:4000/Mypage/${payload.user_uid}`,
          fd,
          {
            withCredentials: true
          }
        );
        commit("SET_PROFILE_IMAGE", response.data);
      } catch (err) {
        console.log(err)
      }
    },
  }
};
