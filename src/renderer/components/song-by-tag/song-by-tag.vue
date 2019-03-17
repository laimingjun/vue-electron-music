<template>
  <div class="song-by-tag-wrapper">
    <scroll>
      <div class="song-by-tag">
        <h2>{{$route.params.tag}}</h2>
        <div class="song-header">
          <!-- <div class="btn-mini active">
            <i class="iconfont icon-bofangqi-bofang"</i>随机播放
          </div> -->
          <div class="order">
            <span :class="{active: currentOrder === 'hot'}" @click="toggleOrder('hot')">最热</span>
            <span :class="{active: currentOrder === 'new'}" @click="toggleOrder('new')">最新</span>
          </div>
        </div>
        <song-list @selectSong="selectSong" :songList="songList"></song-list>
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
import { songMixin } from '@/common/js/mixin'
import Scroll from '@/base/scroll/scroll'
import SongList from '@/base/song-list/song-list'

export default {
  mixins: [songMixin],
  created() {
    this.tag = this.$route.params.tag
    this._getTopSongList()
  },
  components: {
    Scroll,
    SongList
  }
}
</script>

<style scoped lang="scss">
@import 'scss/variable.scss';
$song-by-tag-bg: #18495c;
.song-by-tag-wrapper {
  height: $music-content-height;
  background: $music-content-bg;
  .song-by-tag {
    padding: 20px 30px;
    h2 {
      font-size: $font-size-large;
      margin-bottom: 20px;
    }
    .song-header {
      display: flex;
      flex-flow: row-reverse;
      justify-content: space-between;
      align-items: baseline;
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
    .pages-container {
      margin-top: 20px;
    }
  }
}
</style>
