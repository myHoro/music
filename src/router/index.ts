import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

export const navRoutes: Array<RouteConfig> = [
  {
    path: '/discovery',
    name: 'discovery',
    component: () => import(/* webpackChunkName: "discovery" */ '../views/discovery.vue'),
    meta: {
      title: '发现音乐',
      icon: 'discoverymusic'
    }
  },
  {
    path: '/recommended',
    name: 'recommended',
    component: () => import(/* webpackChunkName: "discovery" */ '../views/discovery.vue'),
    meta: {
      title: '推荐歌单',
      icon: 'recommended'
    }
  },
  {
    path: '/newsong',
    name: 'newsong',
    component: () => import(/* webpackChunkName: "discovery" */ '../views/discovery.vue'),
    meta: {
      title: '最新音乐',
      icon: 'newsong'
    }
  },
  {
    path: '/newmv',
    name: 'newmv',
    component: () => import(/* webpackChunkName: "discovery" */ '../views/discovery.vue'),
    meta: {
      title: '最新MV',
      icon: 'mv'
    }
  },
]

const routes: Array<RouteConfig> = [
  {
    path: '/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/login.vue')
  },
  {
    path: '/',
    name: 'Home',
    component: Home
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
