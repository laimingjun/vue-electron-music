import storage from 'good-storage'
import {
  Music
} from './music'

const SEARCH_KEY = '__search__'
const SEARCH_MAX_LENGTH = 10

const PLAYLIST_KEY = '__playlist__'

function insertArray(arr, val, compare, maxLen) {
  const index = arr.findIndex(compare)
  if (index === 0) {
    return
  }
  if (index > 0) {
    arr.splice(index, 1)
  }
  arr.unshift(val)
  if (maxLen && arr.length > maxLen) {
    arr.pop()
  }
}

function deleteFromArray(arr, compare) {
  const index = arr.findIndex(compare)
  if (index > -1) {
    arr.splice(index, 1)
  }
}

export function loadSearch() {
  return storage.get(SEARCH_KEY, [])
}

export function saveSearch(query) {
  const searches = storage.get(SEARCH_KEY, [])
  insertArray(searches, query, item => {
    return item === query
  }, SEARCH_MAX_LENGTH)
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

export function savePlayList(playlist) {
  storage.set(PLAYLIST_KEY, playlist)
  return playlist
}

export function removePlayList() {
  storage.set(PLAYLIST_KEY, [])
  return []
}