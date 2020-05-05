import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    isPlaying:false, //是否播放音乐
    playingMusic:{}, //正在播放音乐数据
    
    playlistShow: false, //左边播放列表显隐
    playlistMusic:[],  //播放列表
    playlistHistory: localStorage.getItem('play_history')?JSON.parse(localStorage.getItem('play_history')!):[] //历史记录
  },
  getters: {
    GET_ISPLAYING: state => {
      return state.isPlaying
    },
    GET_PLAYINGMUSIC: state => {
      return state.playingMusic
    },
    GET_PLAYLISTSHOW: (state): boolean => {
      return state.playlistShow
    },
    GET_PLAYLISTMUSIC: state => {
      return state.playlistMusic
    },
    GET_PLAYLISTHISTORY: state => {
      return state.playlistHistory
    }
  },
  mutations: {
    SET_ISPLAYING: (state, data: boolean) => {
      state.isPlaying = data
    },
    SET_PLAYINGMUSIC: (state, data) => {
      state.playingMusic = data;
    },
    SET_PLAYLISTSHOW: (state, data: boolean) => {
      state.playlistShow = data
    },
    SET_PLAYLISTMUSIC: (state, data) => {
      state.playlistMusic = data
    },
    SET_PLAYLISTHISTORY: (state, data) => {
      state.playlistHistory = data
    }
  },
  actions: {

  },
  modules: {

  }
})
