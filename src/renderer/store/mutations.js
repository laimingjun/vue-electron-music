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
  [types.SET_SEQUENCE_LIST](state, list) {
    state.sequenceList = list
  },
  [types.SET_CURRENT_PLAY_INDEX](state, index) {
    state.currentPlayIndex = index
  },
  [types.SET_PLAY_MODE](state, mode) {
    state.playMode = mode
  },
  [types.SET_PLAYING_STATE](state, flag) {
    state.playing = flag
  },
  [types.SET_FULL_SCREEN](state, flag) {
    state.fullScreen = flag
  },
  [types.SET_PLAY_LIST_VISIBLE](state, flag) {
    state.playListVisible = flag
  },
  [types.SET_MAX_WINDOW_STATE](state, flag) {
    state.maxWindow = flag
  },
  [types.SET_LOGIN_DIALOG_VISIBLE](state, flag) {
    state.loginDialogVisible = flag
  },
  [types.SET_USER_INFO](state, userInfo) {
    state.userInfo = userInfo
  },
  [types.SET_USER_SONG_LIST](state, list) {
    state.userSongList = list
  },
  [types.SET_USER_LIKE_LIST](state, list) {
    state.userLikeList = list
  }
}

export default mutations