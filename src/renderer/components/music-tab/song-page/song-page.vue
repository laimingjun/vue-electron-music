<template>
  <div class="song-page-wrapper">
    <scroll>
      <div class="song-page-container">
        <h2>热门分类</h2>
        <ul class="hot-tags">
          <li v-for="item in hotTags" :key="item.id" @click="toSongByTag(item.name)">
            {{item.name}}
          </li>
          <li @click="toAllTag()">全部分类</li>
        </ul>
        <div class="song-header">
          <div class="title">
            精选歌单
          </div>
          <div class="order">
            <span :class="{active: currentOrder === 'hot'}" @click="toggleOrder('hot')">最热</span>
            <span :class="{active: currentOrder === 'new'}" @click="toggleOrder('new')">最新</span>
          </div>
        </div>
        <song-list 
          @selectSong="selectSong" 
          :songList="songList"></song-list>
        <div class="pages-container">
            <el-pagination
              :page-size="pageSize"
              :total="total"
              layout="prev, pager, next, jumper"
              @current-change="currentChange">
            </el-pagination>
        </div>
      </div>
    </scroll>
   </div>
</template>

<script>
import { httpGet } from '@/api/httpUtil'
import { ERR_OK, hotTagUrl } from '@/api/config'
import { songMixin } from '@/common/js/mixin'
import Scroll from '@/base/scroll/scroll'
import SongList from '@/base/song-list/song-list'

export default {
  mixins: [songMixin],
  data() {
    return {
      hotTags: []
    }
  },
  created() {
    this._getHotTag()
    this._getTopSongList()
  },
  methods: {
    toggleOrder(order) {
      this.currentOrder = order
      this._getTopSongList()
    },
    _getHotTag() {
      httpGet(hotTagUrl).then(res => {
        if (res.code === ERR_OK) {
          res.tags.length = 9
          this.hotTags = res.tags
        }
      })
    },
    toAllTag() {
      this.$router.push({
        name: 'SongTag'
      })
    },
    toSongByTag(tag) {
      this.$router.push({
        name: 'SongByTag',
        params: {
          tag
        }
      })
    }
  },
  components: {
    SongList,
    Scroll
  }
}
</script>

<style scoped lang="scss">
@import 'scss/variable.scss';
$tag-width: 19.4%;
.song-page-wrapper {
  height: $music-content-height;
  background: $music-content-bg;
  .song-page-container {
    padding: 20px 30px;
    .song-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      .title {
        font-size: $font-size-large-x;
        letter-spacing: 4px;
      }
      .order {
        span {
          margin-left: 10px;
          cursor: pointer;
          &:hover,
          &.active {
            color: $color-text-highlight;
          }
        }
      }
    }
    .hot-tags {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      margin-top: 10px;
      margin-bottom: 20px;
      li {
        width: $tag-width;
        height: $tag-height;
        line-height: $tag-height;
        margin-top: 10px;
        text-align: center;
        font-size: $font-size-small;
        background: $tag-bg;
        cursor: pointer;
        &:hover {
          background: $hover-bg;
        }
      }
    }
    .pages-container {
      margin-top: 20px;
    }
  }
}
</style>
