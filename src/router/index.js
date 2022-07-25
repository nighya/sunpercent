import Vue from "vue";
import Router from "vue-router";
import store from "../store/index";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "Home",
      component: () => import("@/components/Home"),
      beforeEnter: (to, from, next) => {
        if (store.state.loginstore.userstate[0].needchpw > 0) {
          next({ path: "/changepassword" });
        } else {
          next();
        }
      }
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
      path: "/login",
      name: "Login",
      component: () => import("@/components/Login")
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
          next({ path: "/login" });
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
          next({ path: "/login" });
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
          next({ path: "/login" });
        } else {
          next();
        }
      }
    },
    {
      path: "/userpage/:nickname/:user_uid",
      name: "Userpage",
      component: () => import("@/components/Userpage")
    }
    // {
    //   path: "*",
    //   redirect: "/404"
    // },
    // {
    //   path: "/404",
    //   name: "NotFound",
    //   component: () => import("@/components/NotFound")
    // }
  ]
});
