import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import state from './state'
import mutations from './mutations'

// import modules from './modules'

Vue.use(Vuex)

export default new Vuex.Store({
  getters,
  state,
  mutations,
  actions,
  strict: process.env.NODE_ENV !== 'production'
})