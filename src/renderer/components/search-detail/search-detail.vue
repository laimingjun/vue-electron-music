<template>
  <div class="search-detail-wrapper">
    <div class="nav-container">
      <ul class="nav">
        <li
          v-for="item in searchTypeList"
          :key="item.type"
          :class="{active: currentType === item.type}"
          @click="changeType(item.type, item.component)"
        >{{item.name}}</li>
      </ul>
      <div class="hint">{{searchQuery}}共查找到{{resultCount}}条记录</div>
    </div>
    <div class="search-container">
      <scroll :onScroll="true" @scrollBottom="loadMore">
        <div class="search-detail">
          <component :is="currentComponent" v-bind="result" :hasMore="hasMore"></component>
          <div class="loading-container" v-loading="loading" v-show="loading"></div>
        </div>
      </scroll>
    </div>
  </div>
</template>

<script>
import { ERR_OK, searchUrl } from '@/api/config'
import { httpGet } from '@/api/httpUtil'
import { searchTypeList } from '@/api/apiType'
import Scroll from '@/base/scroll/scroll'
import SearchMusic from './search-music/search-music'
import SearchAlbum from './search-album/search-album'
import SearchMv from './search-mv/search-mv'
import SearchSinger from './search-singer/search-singer'
import SearchSongList from './search-song-list/search-song-list'
import SearchUser from './search-user/search-user'
import SearchVideo from './search-video/search-video'
import SearcLyric from './search-lyric/search-lyric'
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      searchTypeList,
      currentType: 1,
      currentComponent: 'SearchMusic',
      pageIndex: 1,
      pageSize: 50,
      result: {},
      resultList: [],
      resultCount: 0,
      hasMore: true,
      loading: true
    }
  },
  computed: {
    ...mapGetters(['searchQuery'])
  },
  created() {
    this._getSearchResult()
  },
  methods: {
    changeType(type, component) {
      this.currentType = type
      this.currentComponent = component
      this.result = {}
      this.resultList = []
      this.resultCount = 0
      this.loading = true
      this._getSearchResult()
    },
    loadMore() {
      if (!this.loading && this.hasMore) {
        this.pageIndex = this.pageIndex + 1
        this.loading = true
        this._getSearchResult()
      }
    },
    _getSearchResult() {
      if (this.searchQuery === '') {
        this.$router.push({
          path: '/musicTab'
        })
      }
      let offset = (this.pageIndex - 1) * this.pageSize
      httpGet(searchUrl, {
        keywords: this.searchQuery,
        type: this.currentType,
        offset,
        limit: this.pageSize
      }).then(res => {
        this.loading = false
        if (res.code === ERR_OK) {
          this._normalizeResult(res.result)
        }
      })
    },
    _normalizeResult(result) {
      let totalResult = []
      let arrKey = ''
      for (let key in result) {
        if (typeof result[key] === 'number') {
          this.resultCount = result[key]
        }
        if (result[key] instanceof Array) {
          arrKey = key
          totalResult = result[key]
        }
      }
      if (totalResult) {
        this.resultList = result[arrKey] = this.resultList.concat(totalResult)
        this.result = result
        this.hasMore = true
      }
      if (this.pageIndex * this.pageSize > this.resultCount) {
        this.hasMore = false
      }
    }
  },
  watch: {
    searchQuery() {
      this.result = {}
      this.resultList = []
      this.resultCount = 0
      this._getSearchResult()
    }
  },
  components: {
    Scroll,
    SearchMusic,
    SearchAlbum,
    SearchMv,
    SearchSinger,
    SearchSongList,
    SearchUser,
    SearchVideo,
    SearcLyric
  }
}
</script>

<style scoped lang='scss'>
@import "scss/variable.scss";
$nav-height: 52px;
.search-detail-wrapper {
  position: relative;
  height: $music-content-height;
  padding-top: $nav-height;
  padding-bottom: 20px;
  .nav-container {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-between;
    height: $nav-height;
    padding: 10px 30px 0 30px;
    background: $music-content-bg;
    z-index: 99;
    .nav {
      display: flex;
      li {
        height: $control-height;
        line-height: $control-height;
        margin-right: 30px;
        font-size: $font-size-medium;
        cursor: pointer;
        &:hover {
          color: $color-text-highlight;
        }
        &.active {
          color: $color-text-highlight;
          border-bottom: 2px solid $color-text-highlight;
        }
      }
    }
    .hint {
      height: $control-height;
      line-height: $control-height;
      color: $color-text-hint;
    }
  }
  .search-container {
    height: calc(100% - #{$control-height - 10px});
    .search-detail {
      padding: 10px 30px;
    }
  }

  .loading-container {
    margin-top: 30px;
  }
}
</style>
