import storage from 'good-storage'
import {
  Music
} from './music'
import { insertArray, deleteFromArray } from './util'

const SEARCH_KEY = '__search__'
const SEARCH_MAX_LENGTH = 10

const PLAYLIST_KEY = '__playlist__'

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