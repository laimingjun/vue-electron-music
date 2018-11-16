import {
  loadSearch,
  loadPlayList
} from '@/common/js/cache'

const state = {
  searchQuery: '',
  searchHistory: loadSearch(),
  playList: loadPlayList(),
  currentPlayIndex: 0,
  playMode: 0,
  playing: false,
  fullScreen: false,
  playListVisible: false
}

export default state