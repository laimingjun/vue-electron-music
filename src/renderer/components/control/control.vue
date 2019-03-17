<template>
  <!-- 顶部控制栏 -->
  <div class="control">
    <div class="left">
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
        <div class="search-placeholder" v-show="isPlaceholderShow" @click="searchFocus">
          <i class="iconfont icon-sousuo"></i>
          <span>搜索音乐、MV、歌单</span>
        </div>
        <input
          class="search-input"
          ref="searchInput"
          v-model="keyword"
          @focus="searchFocus"
          @blur="searchBlur"
          @keydown.enter="searchEnter"
          type="text"
        >
      </div>
    </div>
    <!-- <div class="btn-group">
      <div class="icon" @click="hideWindow" title="最小化">
        <i class="iconfont icon-icon30"></i>
      </div>
      <div class="icon" @click="toggleMaxWindow" :title="maxWindowTip">
        <i class="iconfont" :class="maxWindowIcon"></i>
      </div>
      <div class="icon" @click="closeWindow" title="关闭">
        <i class="iconfont icon-guanbi"></i>
      </div>
    </div> -->
    <div class="search-content" v-if="isShowSearchContent">
      <component
        :suggestList="suggestList"
        :is="isShowSeach"
        @clickSuggest="toSearchDetail"
        @clickWrapper="clickWrapper"
        @clickDelete="deleteSearch"
        @clickRemove="removeSearch"
      ></component>
    </div>
  </div>
</template>

<script>
// import { ipcRenderer } from 'electron'
import { ERR_OK, searchSuggestUrl } from '@/api/config'
import { httpGet } from '@/api/httpUtil'
import SearchHot from './search-hot/search-hot'
import SearchSuggest from './search-suggest/search-suggest'
import * as types from '@/store/mutation-types'
import { mapActions, mapMutations } from 'vuex'
import { controlWindowMixin } from '@/common/js/mixin'
import { debounce } from '@/common/js/util'
export default {
  mixins: [controlWindowMixin],
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
    hideWindow() {
      // ipcRenderer.send('hide-window')
    },
    closeWindow() {
      // ipcRenderer.send('window-all-closed')
    },
    _getSerachSuggest() {
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
      setSearchQuery: types.SET_SEARCH_QUERY
    })
  },
  watch: {
    keyword(newVal) {
      if (newVal === '') return
      if (this.isSelect) {
        this.isSelect = false
        return
      }
      this.isShowSearchContent = true
      debounce(this._getSerachSuggest, 200)()
    }
  },
  components: {
    SearchHot,
    SearchSuggest
  }
}
</script>

<style scoped lang="scss">
@import "scss/variable.scss";
$search-input-width: 220px;
$search-bg: #235164;
$placeholder-color: #ccc;
.control {
  position: relative;
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: $control-height;
  line-height: $control-height;
  -webkit-app-region: drag;
  .left {
    display: flex;
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
  }

  .btn-group {
    display: flex;
    margin-right: 20px;
    -webkit-app-region: no-drag;
    .icon {
      margin-left: 20px;
      cursor: pointer;
      &:hover {
        color: $color-text-highlight;
      }
      .iconfont {
        font-size: $font-size-small;
      }
    }
  }
  .search-content {
    position: absolute;
    top: 40px;
    left: 120px;
    color: #000;
    background: #fff;
    z-index: 999;
  }
}
</style>
