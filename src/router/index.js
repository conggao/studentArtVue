import Vue from 'vue'
import Router from 'vue-router'

import Master from '@/components/commen/Master'
import Home from '@/components/commen/Home'
import Publish from '@/components/commen/Publish'
import PublishMedia from '@/components/page/PublishMovie'
import PublishImgText from '@/components/page/PublishImgText'
import Movie from '@/components/page/Movie'
import MovieInfo from '@/components/page/MovieInfo'
import Audio from '@/components/page/Audio'
import ImgText from '@/components/page/ImgText'
import Media from '@/components/page/Media'

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
      component: Master
    },
    {
      path: '/home',
      component: Home,
      children: [
        {
          path: 'movie',
          component: Movie
        },
        {
          path: 'movieInfo',
          component: MovieInfo
        },
        {
          path: 'audio',
          component: Audio
        },
        {
          path: 'imgText',
          component: ImgText
        },
        {
          path: 'media',
          component: Media
        }
      ]
    },
    {
      path: '/publish',
      component: Publish,
      children: [
        {
          path: 'movie',
          component: PublishMedia
        },
        {
          path: 'imgText',
          component: PublishImgText
        }
      ]
    }
  ]
})
