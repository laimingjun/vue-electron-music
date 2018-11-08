import * as types from './mutation-types'
const mutations = {
  [types.SET_COUNT](state, count) {
    state.count = count
  },
  [types.SET_SEARCH_HISTORY](state, history) {
    state.searchHistory = history
  },
  [types.SET_SEARCH_QUERY](state, query) {
    state.searchQuery = query
  }
}

export default mutations