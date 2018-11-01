<template>
  <div class="search-detail-wrapper">
    <scroll>
        <div class="nav-container">
          <ul class="nav">
            <li 
              v-for="item in searchTypeList" 
              :key="item.type"
              :class="{active: currentType === item.type}"
              @click="changeType(item.type)"
              >{{item.name}}
            </li>
          </ul>
          <div class="hint">共查找到{{resultCount}}条</div>
        </div>
        
        <div class="search-detail">
          <component :is="currentCompent"></component>
        </div>
    </scroll> 
  </div>
</template>

<script>
import { ERR_OK, searchUrl } from '@/api/config'
import { httpGet } from '@/api/httpUtil'
import { searchTypeList } from '@/api/apiType'
import Scroll from '@/base/scroll/scroll'
import MusicList from '@/base/music-list/music-list'
export default {
  data() {
    return {
      searchTypeList,
      currentType: 1,
      currentCompent: 'MusicList',
      result: [],
      keywords: '',
      resultCount: 0
    }
  },
  created() {
    this.keywords = this.$route.params.keyword
    this._getSearchResult()
  },
  methods: {
    changeType(type) {
      this.currentType = type
      this._getSearchResult()
    },
    _getSearchResult() {
      httpGet(searchUrl, {
        keywords: this.keywords,
        type: this.currentType
      }).then(res => {
        if (res.code === ERR_OK) {
          let result = res.result
          this.result = result
          for (let key in result) {
            if (typeof result[key] === 'number') {
              this.resultCount = result[key]
              return
            }
          }
        }
      })
    }
  },
  components: {
    Scroll,
    MusicList
  }
}
</script>

<style scoped lang='scss'>
@import 'scss/variable.scss';
.search-detail-wrapper {
  height: $music-content-height;
  .nav-container {
    display: flex;
    justify-content: space-between;
    padding: 10px 30px 0 30px;
    background: $music-content-bg;
    .nav {
      display: flex;
      li {
        height: $control-height;
        line-height: $control-height;
        margin-right: 20px;
        font-size: $font-size-medium;
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
  .search-detail {
    padding: 0 30px;
  }
}
</style>
