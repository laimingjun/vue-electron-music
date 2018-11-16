<template>
  <!-- 顶部控制栏 -->
  <div class="control">
    <div class="icon-item">
      <i class="el-icon-arrow-left" @click="back"></i>
    </div>
    <div class="icon-item">
      <i class="el-icon-arrow-right" @click="next"></i>
    </div>
    <div class="icon-item">
      <i class="iconfont icon-shuaxin" @click="refresh"></i>
    </div>
    <div class="search-group">
      <div class="search-placeholder" 
        v-show="isPlaceholderShow" 
        @click="searchFocus">
        <i class="iconfont icon-sousuo"></i>
        <span>搜索音乐、MV、歌单</span>
      </div>
      <input class="search-input" ref="searchInput" v-model="keyword" 
          @focus="searchFocus" @blur="searchBlur" @keydown.enter="searchEnter"
          type="text">     
    </div>
    <div class="search-content" v-if="isShowSearchContent">
      <component 
        :suggestList="suggestList" 
        :is="isShowSeach"
        @clickSuggest="toSearchDetail"
        @clickWrapper="clickWrapper"
        @clickDelete="deleteSearch"
        @clickRemove="removeSearch"></component>
    </div>
  </div>
</template>

<script>
import { ERR_OK, searchSuggestUrl } from '@/api/config'
import { httpGet } from '@/api/httpUtil'
import SearchHot from './search-hot/search-hot'
import SearchSuggest from './search-suggest/search-suggest'
import { mapActions, mapMutations } from 'vuex'
export default {
  data() {
    return {
      isPlaceholderShow: true,
      keyword: '',
      suggestList: {},
      isShowSearchContent: false,
      isSelect: false,
      isClickWrapper: false
    }
  },
  computed: {
    isShowSeach() {
      return this.keyword ? 'SearchSuggest' : 'SearchHot'
    }
  },
  methods: {
    clickWrapper() {
      this.isClickWrapper = true
      this.$refs.searchInput.focus()
    },
    searchFocus() {
      this.isShowSearchContent = true
      this.isPlaceholderShow = false
      this.$refs.searchInput.focus()
    },
    searchBlur() {
      setTimeout(() => {
        if (this.isClickWrapper) {
          this.isClickWrapper = false
          return
        }
        this.keyword
          ? (this.isPlaceholderShow = false)
          : (this.isPlaceholderShow = true)
        this.isShowSearchContent = false
      }, 200)
    },
    back() {
      this.$router.go(-1)
    },
    next() {
      this.$router.go(1)
    },
    refresh() {
      this.$emit('refresh')
    },
    searchEnter() {
      if (this.keyword === '') return
      this.isShowSearchContent = false
      this.toSearchDetail()
    },
    toSearchDetail(keyword) {
      this.keyword = keyword || this.keyword
      this.isSelect = true
      this.isPlaceholderShow = false
      if (this.keyword !== '') {
        this.setSearchQuery(this.keyword)
        this.saveSearchHistory(this.keyword)
        if (this.$router.history.current.name !== 'SearchDetail') {
          this.$router.push({
            name: 'SearchDetail',
            params: {
              keyword
            }
          })
        }
      }
    },
    deleteSearch(query) {
      this.deleteSearchHistory(query)
    },
    removeSearch() {
      this.removeSearchHistory()
    },
    _getSerachSuggest(keyword) {
      httpGet(searchSuggestUrl, {
        keywords: this.keyword
      }).then(res => {
        if (res.code === ERR_OK) {
          this.suggestList = res.result
        }
      })
    },
    ...mapActions([
      'saveSearchHistory',
      'deleteSearchHistory',
      'removeSearchHistory'
    ]),
    ...mapMutations({
      setSearchQuery: 'SET_SEARCH_QUERY'
    })
  },
  watch: {
    keyword(val) {
      if (val === '') return
      if (this.isSelect) {
        this.isSelect = false
        return
      }
      this.isShowSearchContent = true
      this._getSerachSuggest(val)
    }
  },
  components: {
    SearchHot,
    SearchSuggest
  }
}
</script>

<style scoped lang="scss">
@import 'scss/variable.scss';
$search-input-width: 220px;
$search-bg: #235164;
$placeholder-color: #ccc;
.control {
  position: relative;
  display: flex;
  width: 100%;
  height: $control-height;
  line-height: $control-height;
  // -webkit-app-region: drag;
  .icon-item {
    width: $control-height;
    text-align: center;
    -webkit-app-region: no-drag;
    cursor: pointer;
    &:hover {
      color: $color-text-highlight;
    }
  }
  .search-group {
    position: relative;
    -webkit-app-region: no-drag;
    .search-input {
      width: $search-input-width;
      padding: 2px 20px;
      background: $search-bg;
      border-radius: 30px;
      color: $color-text;
      &:focus {
        outline: none;
      }
    }
    .search-placeholder {
      position: absolute;
      top: 0;
      left: $search-input-width / 4;
      font-size: $font-size-small;
      color: $placeholder-color;
    }
  }
  .search-content {
    position: absolute;
    top: 40px;
    left: 120px;
    color: #000;
    background: #fff;
    z-index: 99;
  }
}
</style>
