<template>
  <div class="play-list-wrapper">
    <div class="header">
      <h3>播放列表</h3>
      <div class="control">
        <div class="count">{{sequenceList.length}}首歌曲</div>
        <div class="clear" @click="clearPlayList">
          <i class="iconfont icon-asmkticon0154"></i>
          <span>清空</span>
        </div>
      </div>
    </div>
    <div class="content">
      <scroll ref="playListScroll">
        <div
          class="music-item"
          :class="{active : item.id === currentMusic.id }"
          v-for="(item, index) in sequenceList"
          :key="item.id"
          @dblclick="playIndex(index)"
          ref="playListItem"
        >
          <div class="name">{{item.name}}</div>
          <div class="detail">
            <div class="singer">
              <span
                class="singer-item"
                v-for="(singer, index) in item.artists"
                :key="index"
                @click="toSingerDetail(singer.id)"
              >{{singer.name}}</span>
            </div>
            <div class="duration">{{item.duration | formatTime}}</div>
          </div>
        </div>
      </scroll>
    </div>
  </div>
</template>

<script>
import Scroll from '@/base/scroll/scroll'
import { DEFAULT_ERR_MSG } from '@/api/config'
import { formatTime } from '@/common/js/util'
import { playMode } from '@/common/js/config'
import { playListVisibleMixin } from '@/common/js/mixin'
import { mapGetters, mapActions } from 'vuex'

export default {
  mixins: [playListVisibleMixin],
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['sequenceList', 'playList', 'currentMusic', 'playMode'])
  },
  mounted() {
    if (this.currentMusic.id) {
      let index = 0
      index = this.sequenceList.findIndex(item => {
        return item.id === this.currentMusic.id
      })
      this.$refs.playListScroll.setScrollTop(this.$refs.playListItem[index].offsetTop)
    }
  },
  methods: {
    clearPlayList() {
      this.$emit('clearPlayList')
    },
    toSingerDetail(id) {
      this.$router.push({
        name: 'SingerDetail',
        params: { id }
      })
      this.hidePlayList()
    },
    playIndex(index) {
      if (this.playMode === playMode.random) {
        index = this.playList.findIndex(item => {
          return item.id === this.sequenceList[index].id
        })
      }
      this.playList[index].checkMusic().then(res => {
        if (res.success) {
          this.saveCurrentPlayIndexHistory(index)
        }
      }).catch((err) => {
        let message = DEFAULT_ERR_MSG
        if (err.response && err.response.data.message) {
          message = err.response.data.message
        }
        this.$message({
          message
        })
      })
    },
    ...mapActions(['saveCurrentPlayIndexHistory'])
  },
  components: {
    Scroll
  },
  filters: {
    formatTime
  }
}
</script>

<style scoped lang="scss">
@import "scss/variable.scss";
$header-bg: #f9f9f9;
$header-height: 80px;
$music-item-border-color: #f3f3f3;
$play-list-active-color: #44c988;
.play-list-wrapper {
  position: fixed;
  right: 0;
  top: 0;
  bottom: calc(#{$player-height} + 4px);
  width: $play-list-width;
  background: $white-bg;
  color: $color-black;
  z-index: 9999;
  .header {
    box-sizing: border-box;
    height: $header-height;
    padding: 20px 10px 0 20px;
    background: $header-bg;
    h3 {
      font-size: $font-size-large-x;
    }
    .control {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      margin-top: 10px;
      .clear {
        display: flex;
        align-items: center;
        cursor: pointer;
      }
    }
  }
  .content {
    height: calc(100% - #{$header-height});
    .music-item {
      padding: 10px 10px 10px 20px;
      border-bottom: 1px solid $music-item-border-color;
      &.active {
        color: $play-list-active-color;
      }
      .name {
        margin-bottom: 6px;
        font-size: $font-size-medium;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .detail {
        display: flex;
        justify-content: space-between;
        .singer {
          .singer-item {
            &:hover {
              color: $play-list-active-color;
            }
            &:hover::before {
              color: $color-black;
            }
          }
        }
        .duration {
          color: $color-text-hint;
        }
      }
    }
  }
}
</style>
