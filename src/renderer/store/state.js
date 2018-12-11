import {
  loadSearch,
  loadPlayList,
  loadPlayMode,
  loadCurrentPlayIndex
} from '@/common/js/cache'

const state = {
  searchQuery: '',
  searchHistory: loadSearch(),
  playList: loadPlayList(),
  sequenceList: loadPlayList(),
  currentPlayIndex: loadCurrentPlayIndex(),
  playMode: loadPlayMode(),
  playing: false,
  fullScreen: false,
  playListVisible: false,
  maxWindow: false,
  loginDialogVisible: false,
  userInfo: {},
  userSongList: [],
  userLikeList: []
}

export default state