import {
  loadSearch,
  loadPlayList
} from '@/common/js/cache'

import {
  playMode
} from '@/common/js/config'

const state = {
  searchQuery: '',
  searchHistory: loadSearch(),
  playList: loadPlayList(),
  currentPlayIndex: 0,
  playMode: playMode.sequence,
  playing: false,
  fullScreen: false,
  playListVisible: false,
  maxWindow: false
}

export default state