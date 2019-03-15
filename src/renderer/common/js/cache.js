import storage from 'good-storage'
import {
  Music
} from './music'
import {
  insertArray,
  deleteFromArray
} from './util'
import {
  playMode
} from './config'

const SEARCH_KEY = '__search__'
const SEARCH_MAX_LENGTH = 10

const SEQUENCE_LIST_KEY = '__sequenceList__'
const PLAYLIST_KEY = '__playList__'
const PLAYMODE_KEY = '__playMode__'
const CURRENT_PLAY_INDEX_KEY = '__currentPlayIndex__'

export function loadSearch() {
  return storage.get(SEARCH_KEY, [])
}

export function saveSearch(query) {
  const searches = storage.get(SEARCH_KEY, [])
  insertArray(
    searches,
    query,
    item => {
      return item === query
    },
    SEARCH_MAX_LENGTH
  )
  storage.set(SEARCH_KEY, searches)
  return searches
}

export function deleteSearch(query) {
  let searches = storage.get(SEARCH_KEY, [])
  deleteFromArray(searches, item => {
    return item === query
  })
  storage.set(SEARCH_KEY, searches)
  return searches
}

export function removeSearch() {
  storage.set(SEARCH_KEY, [])
  return []
}

export function loadPlayList() {
  let list = storage.get(PLAYLIST_KEY, [])
  list = list.map(item => {
    return new Music(item)
  })
  return list
}

export function savePlayList(list) {
  storage.set(PLAYLIST_KEY, list)
  return list
}

export function removePlayList() {
  storage.set(PLAYLIST_KEY, [])
  return []
}

export function loadSequenceList() {
  let list = storage.get(SEQUENCE_LIST_KEY, [])
  list = list.map(item => {
    return new Music(item)
  })
  return list
}

export function saveSequenceList(list) {
  storage.set(SEQUENCE_LIST_KEY, list)
  return list
}

export function removeSequenceList() {
  storage.set(SEQUENCE_LIST_KEY, [])
  return []
}

export function loadPlayMode() {
  return storage.get(PLAYMODE_KEY, playMode.sequence)
}

export function savePlayMode(mode) {
  storage.set(PLAYMODE_KEY, mode)
  return mode
}

export function loadCurrentPlayIndex() {
  return storage.get(CURRENT_PLAY_INDEX_KEY, 0)
}

export function saveCurrentPlayIndex(index) {
  return storage.set(CURRENT_PLAY_INDEX_KEY, index)
}