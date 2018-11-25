<template>
  <div class="singer-wrapper">
    <scroll :onScroll="onScroll" @scrollBottom="loadMoreSinger">
      <div class="singer-container">
        <div class="singer-header">
          <div class="singer-cat-content">
            <div class='title'>分类：</div>
            <ul>  
              <li 
                class="cat-item"
                :class="{active: currentCatCode === item.code}"
                @click="changeCatCode(item.code)"
                v-for="item in singerCatList" 
                :key="item.code">{{item.name}}</li>
            </ul>
          </div>
          <div class="singer-cat-content">
            <div class="title" @click="changeInitial('clear')">筛选：</div>
            <ul>
              <li 
                class="initial-item" 
                :class="{active: currentInitial === '热门'}"
                @click="changeInitial('热门')">
                热门
              </li>
              <li 
                class="initial-item"
                @click="changeInitial(item)"
                :class="{active: currentInitial === item}" 
                v-for="item in initialList" 
                :key="item">{{item}}</li>
            </ul>
          </div>
        </div>
        <singer-list :singerList="singerList" @select="toSingerDetail"></singer-list>
      </div>
      <div class="loading-container" v-loading="isLoadding" v-show="isLoadding"></div>
    </scroll>
  </div>
</template>

<script>
import { ERR_OK, singerListHotUrl, singerListUrl } from '@/api/config'
import { initial, singerCatList } from '@/api/apiType'
import { httpGet } from '@/api/httpUtil'
import Scroll from '@/base/scroll/scroll'
import SingerList from '@/base/singer-list/singer-list'
export default {
  data() {
    return {
      onScroll: true,
      singerList: [],
      initial,
      currentInitial: '热门',
      currentCatCode: 0,
      singerCatList,
      currentPage: 1,
      pageSize: 50,
      isLoadding: true,
      hasMore: false
    }
  },
  computed: {
    initialList() {
      return this.initial.slice()
    }
  },
  created() {
    this._getSingListHot()
  },
  methods: {
    loadMoreSinger() {
      if (!this.isLoadding && this.hasMore) {
        this.isLoadding = true
        this.currentPage = this.currentPage + 1
        if (this.currentInitial === '热门') {
          this._getSingListHot()
        } else {
          this._getSingListByCat()
        }
      }
    },
    changeInitial(initial) {
      if (this.currentCatCode === 0) {
        this.currentCatCode = this.singerCatList[1].code
      }
      this.currentInitial = initial
      this.singerList = []
      this.currentPage = 1
      if (initial === 'clear') {
        this.currentInitial = ''
      }
      if (initial === '热门') {
        this.currentCatCode = 0
        this._getSingListHot()
      } else {
        this._getSingListByCat()
      }
    },
    changeCatCode(code) {
      if (this.currentInitial === '热门') {
        this.currentInitial = ''
      }
      this.currentCatCode = code
      this.currentPage = 1
      this.singerList = []
      this._getSingListByCat()
    },
    toSingerDetail(singer) {
      this.$router.push({
        name: 'SingerDetail',
        params: {
          id: singer.id
        }
      })
    },
    _getSingListHot() {
      let offset = (this.currentPage - 1) * this.pageSize
      httpGet(singerListHotUrl, {
        limit: this.pageSize,
        offset
      }).then(res => {
        this.isLoadding = false
        if (res.code === ERR_OK) {
          this.singerList = this.singerList.concat(res.artists)
          this.hasMore = res.more
        }
      })
    },
    _getSingListByCat() {
      let offset = (this.currentPage - 1) * this.pageSize
      let initial = this.currentInitial === '热门' ? '' : this.currentInitial
      httpGet(singerListUrl, {
        cat: this.currentCatCode,
        initial,
        limit: this.pageSize,
        offset
      }).then(res => {
        this.isLoadding = false
        if (res.code === ERR_OK) {
          this.singerList = this.singerList.concat(res.artists)
          this.hasMore = res.more
        }
      })
    }
  },
  components: {
    Scroll,
    SingerList
  }
}
</script>

<style scoped lang="scss">
@import 'scss/variable.scss';
$singer-item-width: 18%;
$singer-item-bg: rgba(28, 86, 104, 0.5);
$title-width: 48px;
$cat-item-width: 100px;
$li-line-height: 26px;
.singer-wrapper {
  height: $music-content-height;
  border-top: 1px solid $light-border-color;
  .singer-container {
    padding: 20px;
    .singer-header {
      .singer-cat-content {
        display: flex;
        margin-bottom: 4px;
        .title {
          width: $title-width;
          text-align: right;
          line-height: $li-line-height;
        }
        ul {
          display: flex;
          flex: 1;
          flex-wrap: wrap;
          li {
            line-height: $li-line-height;
            cursor: pointer;
            &.active {
              color: $color-text-highlight;
            }
          }
          .cat-item {
            width: $cat-item-width;
          }
          .initial-item {
            padding-right: 20px;
          }
        }
      }
    }
  }
  .loading-container {
    margin-top: 20px;
  }
}
</style>
