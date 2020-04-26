import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    playingMusic:{}
  },
  getters: {
    GET_PLAYINGMUSIC: (state) => {
      return state.playingMusic
    }
  },
  mutations: {
    SET_PLAYINGMUSIC: (state, data) => {
      state.playingMusic = data;
    },
  },
  actions: {

  },
  modules: {

  }
})
