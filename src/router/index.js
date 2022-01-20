import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Content from '@/components/Content'
import Login from '@/components/Login'
import Register from '@/components/Register'
import Mypage from '@/components/Mypage'


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
      path: '/mypage',
      name: 'Mypage',
      component: Mypage
    },
  ]
})
