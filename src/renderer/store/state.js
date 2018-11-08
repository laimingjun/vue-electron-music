import {
  loadSearch
} from '@/common/js/cache'

const state = {
  searchQuery: '',
  searchHistory: loadSearch(),
  count: 1
}

export default state