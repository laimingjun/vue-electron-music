import * as types from './mutation-types'
const mutations = {
  [types.SET_SEARCH_HISTORY](state, history) {
    state.searchHistory = history
  },
  [types.SET_SEARCH_QUERY](state, query) {
    state.searchQuery = query
  },
  [types.SET_PLAY_LIST](state, list) {
    state.playList = list
  },
  [types.SET_CURRENT_PLAY_INDEX](state, index) {
    state.currentPlayIndex = index
  },
  [types.SET_PLAYING](state, boolean) {
    state.playing = boolean
  },
  [types.SET_FULL_SCREEN](state, boolean) {
    state.fullScreen = boolean
  },
  [types.SET_PLAY_LIST_VISIBLE](state, boolean) {
    state.playListVisible = boolean
  }
}

export default mutations