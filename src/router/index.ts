import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

import Home from '../views/Home.vue'
const discovery = () => import(/* webpackChunkName: "discovery" */ '@/views/discovery.vue')
const recommended = () => import(/* webpackChunkName: "recommended" */ '@/views/recommended.vue')
const newsong = () => import(/* webpackChunkName: "newsong" */ '@/views/newsong.vue')
const newmv = () => import(/* webpackChunkName: "discovery" */ '@/views/newmv.vue')
Vue.use(VueRouter)

export const navRoutes: Array<RouteConfig> = [
  {
    path: '/discovery',
    name: 'discovery',
    component: discovery,
    meta: {
      title: '发现音乐',
      icon: 'discoverymusic'
    }
  },
  {
    path: '/recommended',
    name: 'recommended',
    component: recommended,
    meta: {
      title: '推荐歌单',
      icon: 'recommended'
    }
  },
  {
    path: '/newsong',
    name: 'newsong',
    component: newsong,
    meta: {
      title: '最新音乐',
      icon: 'newsong'
    }
  },
  {
    path: '/newmv',
    name: 'newmv',
    component: newmv,
    meta: {
      title: '最新MV',
      icon: 'mv'
    }
  },
]

const routes: Array<RouteConfig> = [
  {
    path: '/',
    redirect:'/discovery'
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  ...navRoutes
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
