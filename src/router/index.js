import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/components/page/Login'
import Home from '@/components/commen/Home'
import PublishMedia from '@/components/page/PublishMovie'
import PublishImgText from '@/components/page/PublishImgText'
import Movie from '@/components/page/Movie'
import Audio from '@/components/page/Audio'
import ImgText from '@/components/page/ImgText'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/home',
      component: Home,
      children: [
        {
          path: '/movie',
          component: Movie
        },
        {
          path: '/audio',
          component: Audio
        },
        {
          path: '/imgText',
          component: ImgText
        }
      ]
    },
    {
      path: '/publish',
      component: Home,
      children: [
        {
          path: '/',
          component: PublishMedia
        },
        {
          path: '/imgText',
          component: PublishImgText
        }
      ]
    }
  ]
})
