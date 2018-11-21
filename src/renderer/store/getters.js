export const searchHistory = state => state.searchHistory

export const searchQuery = state => state.searchQuery

export const playList = state => state.playList

export const currentMusic = state => state.playList[state.currentPlayIndex] || {
  name: '音乐让生活更美好',
  album: {
    picUrl: 'src/renderer/common/images/default.png'
  }
}

export const currentPlayIndex = state => state.currentPlayIndex

export const playMode = state => state.playMode

export const playing = state => state.playing

export const fullScreen = state => state.fullScreen

export const playListVisible = state => state.playListVisible

export const maxWindow = state => state.maxWindow