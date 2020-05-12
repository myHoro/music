import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import { playlist } from '@/request/api'

const discovery = () => import(/* webpackChunkName: "discovery" */ '@/views/discovery.vue')
const recommended = () => import(/* webpackChunkName: "recommended" */ '@/views/recommended.vue')
const newsong = () => import(/* webpackChunkName: "newsong" */ '@/views/newsong.vue')
const newmv = () => import(/* webpackChunkName: "newmv" */ '@/views/newmv.vue')
const search = () => import(/* webpackChunkName: "search" */ '@/views/search/index.vue')
const searchMusic = () => import(/* webpackChunkName: "searchMusic" */ '@/views/search/music.vue')
const searchSongList = () => import(/* webpackChunkName: "searchSongList" */ '@/views/search/songList.vue')
const searchMvs = () => import(/* webpackChunkName: "searchMvs" */ '@/views/search/mvs.vue')
const playlistDetail = () =>  import(/* webpackChunkName: "playlistDetail" */ '@/views/playlistDetail.vue')
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
    path:'/playlistDetail/:id',
    name:'playlistDetail',
    component: playlistDetail,
    props: true,
    meta:{
      title: '歌单详情'
    }
  },
  {
    path: '/search/:keywords', //当使用此方法传递参数的时候，需要用name去路由跳转。不然页面无法正常跳转
    name: 'search',
    component: search,
    props: true, //通过 :param, props:true传递参数，可以再此页面 通过props方法接受参数，@Prop() keywords!: string、props:['keywords']
    meta: {
      title: '搜索'
    },
    children:[
      {
        path: '/', //子路由当有默认页面时，跳转，还是需要使用需要跳转的name或path，直接使用 search跳转，不会定位到searchMusic，需要直接指定跳转searchMusic。
        redirect: 'searchMusic',
      },
      {
        path:'searchMusic',
        name:'searchMusic',
        component: searchMusic
      },
      {
        path:'searchSongList',
        name:'searchSongList',
        component: searchSongList
      },
      {
        path:'searchMvs',
        name:'searchMvs',
        component: searchMvs
      }
    ]
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // },
  ...navRoutes
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
