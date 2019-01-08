import * as types from './mutation-types'
import {
  saveSearch,
  deleteSearch,
  removeSearch,
  saveSequenceList,
  savePlayList,
  removeSequenceList,
  removePlayList,
  savePlayMode,
  saveCurrentPlayIndex
} from '@/common/js/cache'
import {
  insertArray,
  deleteFromArray,
  shuffle
} from '@/common/js/util'
import {
  playMode
} from '@/common/js/config'

export const saveSearchHistory = function ({
  commit
}, query) {
  commit(types.SET_SEARCH_HISTORY, saveSearch(query))
}

export const deleteSearchHistory = function ({
  commit
}, query) {
  commit(types.SET_SEARCH_HISTORY, deleteSearch(query))
}

export const removeSearchHistory = function ({
  commit
}) {
  commit(types.SET_SEARCH_HISTORY, removeSearch())
}

export const savePlayAndSequenceListHistory = function ({
  commit,
  state
}, {
  list,
  index = 0
}) {
  let playlist = [...list]
  if (state.playMode === playMode.random) {
    playlist = shuffle(list)
    index = playlist.findIndex(item => {
      return item.id === list[index].id
    })
  }
  commit(types.SET_PLAY_LIST, savePlayList(playlist))
  commit(types.SET_SEQUENCE_LIST, saveSequenceList(list))
  commit(types.SET_CURRENT_PLAY_INDEX, index)
  commit(types.SET_PLAYING_STATE, true)
}

export const insertMusic = function ({
  commit,
  state
}, {
  music
}) {
  let sequenceList = [...state.sequenceList] // 顺序播放列表
  let playList = [...state.playList]
  let currentIndex = state.currentPlayIndex // 播放列表索引
  let index = sequenceList.findIndex(item => {
    return item.id === music.id
  })
  // 判断播放列表是否存在播放歌曲
  if (index > -1) {
    currentIndex = index
  } else {
    if (state.playMode === playMode.random) { // 判断是否为随机播放
      let currentSong = state.playList[currentIndex] // 当前播放歌曲
      currentIndex = sequenceList.findIndex(item => {
        return item.id === currentSong.id
      }) // 获取顺序列表 播放索引
    }
    currentIndex += 1 // 在当前歌曲后添加
    sequenceList.splice(currentIndex, 0, music)
    playList.splice(currentIndex, 0, music)
    commit(types.SET_PLAY_LIST, savePlayList(playList))
    commit(types.SET_SEQUENCE_LIST, saveSequenceList(sequenceList))
  }
  commit(types.SET_CURRENT_PLAY_INDEX, saveCurrentPlayIndex(currentIndex))
}

export const removePlayListHistory = function ({
  commit
}) {
  commit(types.SET_PLAY_LIST, removePlayList())
  commit(types.SET_SEQUENCE_LIST, removeSequenceList())
}

export const savePlayModeHistory = function ({
  commit
}, mode) {
  commit(types.SET_PLAY_MODE, savePlayMode(mode))
}

export const saveCurrentPlayIndexHistory = function ({
  commit
}, index) {
  commit(types.SET_CURRENT_PLAY_INDEX, saveCurrentPlayIndex(index))
}

export const insertUserSongList = function ({
  commit,
  state
}, song) {
  let songList = [...state.userSongList]
  insertArray(songList, song, item => {
    return item.id === song.id
  })
  commit(types.SET_USER_SONG_LIST, songList)
}

export const deleteUserSongList = function ({
  commit,
  state
}, id) {
  let songList = [...state.userSongList]
  deleteFromArray(songList, item => {
    return item.id === id
  })
  commit(types.SET_USER_SONG_LIST, songList)
}

export const insertUserLikeList = function ({
  commit,
  state
}, id) {
  let likeList = [...state.userLikeList]
  insertArray(likeList, id, item => {
    return item === id
  })
  commit(types.SET_USER_LIKE_LIST, likeList)
}

export const deleteUserLikeList = function ({
  commit,
  state
}, id) {
  let likeList = [...state.userLikeList]
  deleteFromArray(likeList, item => {
    return item === id
  })
  commit(types.SET_USER_LIKE_LIST, likeList)
}