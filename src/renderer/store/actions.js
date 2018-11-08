import * as types from './mutation-types'
import {
  saveSearch,
  deleteSearch,
  removeSearch
} from '@/common/js/cache'

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