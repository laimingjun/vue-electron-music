import * as types from './mutation-types'
import {
  saveSearch,
  deleteSearch,
  removeSearch,
  savePlayList,
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

export const savePlayListHistory = function ({
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
  commit(types.SET_PLAY_LIST, playlist)
  commit(types.SET_SEQUENCE_LIST, savePlayList(list))
  commit(types.SET_CURRENT_PLAY_INDEX, index)
  commit(types.SET_PLAYING_STATE, true)
}

export const removePlayListHistory = function ({
  commit
}) {
  commit(types.SET_PLAY_LIST, removePlayList())
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