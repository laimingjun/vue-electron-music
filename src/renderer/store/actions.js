import * as types from './mutation-types'
import {
  saveSearch,
  deleteSearch,
  removeSearch,
  savePlayList,
  removePlayList
} from '@/common/js/cache'
import {
  insertArray,
  deleteFromArray
} from '@/common/js/util'

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
  commit
}, list) {
  commit(types.SET_PLAY_LIST, savePlayList(list))
}

export const removePlayListHistory = function ({
  commit
}) {
  commit(types.SET_PLAY_LIST, removePlayList())
}

export const saveUserSongList = function ({
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