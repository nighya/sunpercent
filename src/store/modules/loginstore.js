import axios from "axios";

const res_uri = "http://localhost:4000/api/test/login";

export default {
  namespaced: true,
  state: {
    userstate: [{ user_uid: null, email: null, nickname: null, gender: null }],
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
    SET_MEMBER: (state, datas) => {
      state.userstate = datas;
    },
    register(state, payload) {},
    loginToken(state, payload) {
      // VueCookies.set("accessToken", payload.accessToken, "60s");
      // VueCookies.set("refreshToken", payload.refreshToken, "1h");
      console.log(payload);
      state.userstate[0].uid = payload.uid;
      state.userstate[0].id = payload.id;
      state.userstate[0].nickname = payload.nickname;
      state.userstate[0].message = payload.message;
      state.isLogined = true;
      // state.userstate = payload
    },
    LOGOUT(state) {
      state.userstate[0].uid = null;
      state.userstate[0].id = null;
      state.userstate[0].nickname = null;
      state.userstate[0].message = null;
      state.isLogined = false;
    }
  },
  actions: {
    // async actionsadduserLogin({ commit }, payload) {
    //   const response = await axios.post(res_uri, payload);
    //   commit("POST_LOGIN", payload);
    // },
    async login({ commit }, payload) {
      const response = await axios.post(res_uri, payload, {
        withCredentials: true
      });
      commit("loginToken", response.data);
    },
    logout({ commit }) {
      commit("LOGOUT");
    },

    register: ({ commit }, params) => {
      return new Promise((resove, reject) => {
        axios
          .post("http://localhost:4000/register", params, {
            withCredentials: true
          })
          .then(res => {
            commit("register", res.data);
            console.log(res);
            resove(res);
          })
          .catch(err => {
            console.log(err.message);
            reject(err.message);
          });
      });
    },
    async getMember({ commit }, payload) {
      const response = await axios.get(
        `http://localhost:4000/api/test/Mypage/${payload}`,
        { withCredentials: true }
      );
      commit("SET_MEMBER", response.data);
    }
  }
};
