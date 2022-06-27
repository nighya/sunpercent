import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import store from "../store/index";


Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/content',
      name: 'Content',
      component:() => import( "@/components/Content" )
    },
    {
      path: '/login',
      name: 'Login',
      component:() => import( "@/components/Login" )
    },
    {
      path: '/findpassword',
      name: 'FindPassword',
      component:() => import( "@/components/FindPassword" )
    },
    {
      path: '/changepassword',
      name: 'ChangePassword',
      component:() => import( "@/components/ChangePassword" ),
      beforeEnter: (to, from, next) => {
        if (
          store.state.loginstore.userstate[0].user_uid === null ||
          store.state.loginstore.userstate[0].user_uid === undefined
        ) {
          next({ path: "/login" });
        } else {
          next();
        }
      },
    },
    {
      path: '/register',
      name: 'Register',
      component:() => import( "@/components/Register" )
    },
    {
      path: '/mypage/:user_uid',
      name: 'Mypage',
      component:() => import( "@/components/Mypage" ),
      beforeEnter: (to, from, next) => {
        if (
          store.state.loginstore.userstate[0].user_uid === null ||
          store.state.loginstore.userstate[0].user_uid === undefined
        ) {
          next({ path: "/login" });
        } else {
          next();
        }
      },
    },
    {
      path: '/contentupload',
      name: 'ContentUpload',
      component:() => import( "@/components/ContentUpload" )
    },
    {
      path: '/:content_uid',
      name: 'ContentDetail',
      component: () => import("@/components/ContentDetail"),
    },
    {
      path: '/content/search',
      name: 'Search',
      component:() => import( "@/components/Search" )
    },
  ]
})
