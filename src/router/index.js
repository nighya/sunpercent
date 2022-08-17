import Vue from "vue";
import Router from "vue-router";
import store from "../store/index";

Vue.use(Router);

export default new Router({
  scrollBehavior() {
    return { x: 0, y: 0 };
  },

  mode: "history",
  routes: [
    {
      path: "/",
      name: "Home",
      component: () => import("@/components/Home")
      // beforeEnter: (to, from, next) => {
      //   if (store.state.loginstore.userstate[0].needchpw > 0) {
      //     next({ path: "/changepassword" });
      //   } else {
      //     next();
      //   }
      // }
    },
    {
      path: "/content",
      name: "Content",
      component: () => import("@/components/Content"),
      beforeEnter: (to, from, next) => {
        if (store.state.loginstore.userstate[0].needchpw > 0) {
          next({ path: "/changepassword" });
        } else {
          next();
        }
      }
    },
    {
      path: "/Content_multi",
      name: "Content_multi",
      component: () => import("@/components/Content_multi"),
      beforeEnter: (to, from, next) => {
        if (store.state.loginstore.userstate[0].needchpw > 0) {
          next({ path: "/changepassword" });
        } else {
          next();
        }
      }
    },
    {
      path: "/login",
      name: "Login",
      component: () => import("@/components/Login"),
      beforeEnter: (to, from, next) => {
        let local_value = false;
        const filter_word = [
          "/content_multi/",
          "/content/",
          "/mypage/",
          "/userpage/"
        ];
        const from_path = filter_word.map(data => from.path.includes(data));
        const pre_path = from_path.filter(data => {
          if (data == true) {
            local_value = true;
          }
        });
        if (local_value) {
          // console.log("필터 성공 로컬스토리지 안지움");
          next();
        } else {
          // console.log("필터없음 로컬스토리지 지움");
          localStorage.removeItem("pre_target");
          next();
        }
        if (from.path === "/register") {
          // console.log("register라서 로컬스토리지 지움");
          localStorage.removeItem("pre_target");
          next();
        }
      }
    },
    {
      path: "/findpassword",
      name: "FindPassword",
      component: () => import("@/components/FindPassword")
    },
    {
      path: "/changepassword",
      name: "ChangePassword",
      component: () => import("@/components/ChangePassword"),
      beforeEnter: (to, from, next) => {
        if (
          store.state.loginstore.userstate[0].email === null ||
          store.state.loginstore.userstate[0].email === undefined
        ) {
          next({ path: "/login" });
        } else {
          next();
        }
      }
    },
    {
      path: "/register",
      name: "Register",
      component: () => import("@/components/Register")
    },
    {
      path: "/mypage/:user_uid",
      name: "Mypage",
      component: () => import("@/components/Mypage"),
      beforeEnter: (to, from, next) => {
        if (
          store.state.loginstore.userstate[0].user_uid === null ||
          store.state.loginstore.userstate[0].user_uid === undefined
        ) {
          alert("로그인이 필요 합니다.");
          next({ path: "/login" });
        } else {
          next();
        }
        if (store.state.loginstore.userstate[0].needchpw > 0) {
          next({ path: "/changepassword" });
        } else {
          next();
        }
      }
    },
    {
      path: "/contentupload",
      name: "ContentUpload",
      component: () => import("@/components/ContentUpload"),
      beforeEnter: (to, from, next) => {
        if (
          store.state.loginstore.userstate[0].user_uid === null ||
          store.state.loginstore.userstate[0].user_uid === undefined
        ) {
          if (confirm("로그인이 필요 합니다. 로그인 하시겠습니까?")) {
            next({ path: "/login" });
          }
        } else {
          next();
        }
      }
    },
    {
      path: "/contentupload_multi",
      name: "ContentUpload_multi",
      component: () => import("@/components/ContentUpload_multi"),
      beforeEnter: (to, from, next) => {
        if (
          store.state.loginstore.userstate[0].user_uid === null ||
          store.state.loginstore.userstate[0].user_uid === undefined
        ) {
          if (confirm("로그인이 필요 합니다. 로그인 하시겠습니까?")) {
            next({ path: "/login" });
          }
        } else {
          next();
        }
      }
    },
    {
      path: "/content/:content_uid",
      name: "ContentDetail",
      component: () => import("@/components/ContentDetail")
    },
    {
      path: "/content_multi/:content_uid",
      name: "ContentDetail_multi",
      component: () => import("@/components/ContentDetail_multi")
    },
    {
      path: "/search",
      name: "Search",
      component: () => import("@/components/Search")
    },
    {
      path: "/note/:nickname/:user_uid",
      name: "Note",
      component: () => import("@/components/Note"),
      beforeEnter: (to, from, next) => {
        if (
          store.state.loginstore.userstate[0].email === null ||
          store.state.loginstore.userstate[0].email === undefined
        ) {
          alert("로그인이 필요 합니다.");
          next({ path: "/login" });
        } else {
          next();
        }
      }
    },
    {
      path: "/MyNote/:user_uid",
      name: "MyNote",
      component: () => import("@/components/MyNote"),
      beforeEnter: (to, from, next) => {
        if (
          store.state.loginstore.userstate[0].email === null ||
          store.state.loginstore.userstate[0].email === undefined
        ) {
          alert("로그인이 필요 합니다.");
          next({ path: "/login" });
        } else {
          next();
        }
      }
    },
    {
      path: "/userpage/:nickname/:user_uid",
      name: "UserPage",
      component: () => import("@/components/UserPage")
    },
    {
      path: "/withdrawal",
      name: "Withdrawal",
      component: () => import("@/components/Withdrawal")
    },
    {
      path: "/TermsOfUse",
      name: "TermsOfUse",
      component: () => import("@/components/TermsOfUse")
    },
    {
      path: "/PolicyPrivacy",
      name: "PolicyPrivacy",
      component: () => import("@/components/PolicyPrivacy")
    },
    // {
    //   path: "*",
    //   redirect: "/NotFound"
    // },
    {
      path: "/NotFound",
      name: "NotFound",
      component: () => import("@/components/NotFound")
    }
  ]
});
