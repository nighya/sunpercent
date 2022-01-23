import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Content from '@/components/Content'
import Login from '@/components/Login'
import Register from '@/components/Register'
import Mypage from '@/components/Mypage'

import store from "../store/index";


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/content',
      name: 'Content',
      component: Content
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/mypage/:user_uid',
      name: 'Mypage',
      component: Mypage,
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
  ]
})
