<template>
  <div class="search-hot-wrapper">
    <div class="content">
      <div class="title"><i class="iconfont icon-sousuo"></i>热门搜索</div>
      <ul class="hot-list">
        <li v-for="(item, index) in searchHots" :key="index" @click="toSearchDetail(item.first)">
          {{item.first}}</li>
      </ul>
    </div>
    <div class="content">
      <div class="title"><i class="iconfont icon-lishi"></i>搜索历史</div> 
      <ul class="hot-list">
        <li class="item" 
          v-for="(item, index) in searchHistory" 
          :key="index"
          @mouseenter="showClose(index)"
          @mouseleave="hideClose">
          <span>{{item.first}}</span>
          <span v-show="currentHoverIndex === index">
            <i class="iconfont icon-guanbi"></i>
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { ERR_OK, searchHotUrl } from '@/api/config'
import { httpGet } from '@/api/httpUtil'
// const MAX_HISTORY_LENGTH = 20
export default {
  data() {
    return {
      currentHoverIndex: null,
      searchHots: [],
      searchHistory: []
    }
  },
  created() {
    this._getSearchHot()
  },
  methods: {
    showClose(index) {
      this.currentHoverIndex = index
    },
    hideClose() {
      this.currentHoverIndex = null
    },
    toSearchDetail(keyword) {
      this.$emit('clickSuggest', keyword)
    },
    _getSearchHot() {
      httpGet(searchHotUrl).then(res => {
        if (res.code === ERR_OK) {
          this.searchHots = res.result.hots
        }
      })
    }
  }
}
</script>

<style scoped lang='scss'>
@import 'scss/variable.scss';
$hot-content-width: 401px;
$hot-item-height: 26px;
.search-hot-wrapper {
  display: flex;
  width: $hot-content-width;
  border-radius: 2px;
  .content {
    flex: 1;
    &:first-child {
      border-right: 1px solid #eee;
    }
    .title {
      padding: 2px 0 2px 6px;
      height: $hot-item-height;
      line-height: $hot-item-height;
      color: #bbb;
      border-bottom: 1px solid #eee;
      .iconfont {
        margin-right: 6px;
        font-size: $font-size-medium;
      }
    }
    .hot-list {
      li {
        padding-left: 20px;
        padding-right: 5px;
        display: flex;
        justify-content: space-between;
        height: $hot-item-height;
        line-height: $hot-item-height;
        &:hover {
          background: rgba($color: #eee, $alpha: 0.8);
        }
        .iconfont {
          color: $color-text-hint;
          font-size: $font-size-small;
        }
      }
    }
  }
}
</style>
