import Vue from 'vue'
import Vuex from 'vuex'

import user from './module/user'
import app from './module/app'
import comment from './module/comment'
import platform from './module/platform'
import management from './module/management'
import statistics from './module/statistics'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {

  },
  mutations: {
    //
  },
  actions: {
    //
  },
  modules: {
    user,
    app,
    comment,
    platform,
    management,
    statistics
  }
})
