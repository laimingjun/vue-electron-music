import defaultPic from '../common/images/default.png'

export const searchHistory = state => state.searchHistory

export const searchQuery = state => state.searchQuery

export const playList = state => state.playList

export const sequenceList = state => state.sequenceList

export const currentMusic = state => state.playList[state.currentPlayIndex] || {
  name: '音乐让生活更美好',
  album: {
    picUrl: defaultPic
  }
}

export const currentPlayIndex = state => state.currentPlayIndex

export const playMode = state => state.playMode

export const playing = state => state.playing

export const fullScreen = state => state.fullScreen

export const playListVisible = state => state.playListVisible

export const maxWindow = state => state.maxWindow

export const userInfo = state => state.userInfo

export const loginDialogVisible = state => state.loginDialogVisible

export const userSongList = state => state.userSongList

export const userLikeList = state => state.userLikeList