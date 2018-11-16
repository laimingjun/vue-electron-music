<template>
  <div class="play-list-wrapper">
    <div class="header">
      <h3>播放列表</h3>
      <div class="control">
        <div class="count">{{playList.length}}首歌曲</div>
        <div class="clear" @click="clearPlayList">
          <i class="iconfont icon-asmkticon0154"></i>
          <span>清空</span>
        </div>
      </div>
    </div>
    <div class="content">
      <scroll>
        <div class="music-item" :class="{active : index === currentPlayIndex }" 
          v-for="(item, index) in playList" :key="item.id">
          <div class="name">{{item.name}}</div>
          <div class="detail">
            <div class="singer">
              <span class="singer-item" v-for="(singer, index) in item.artists" :key="index">
                {{singer.name}} 
              </span>
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
import { formatTime } from '@/common/js/util'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['playList', 'currentPlayIndex'])
  },
  methods: {
    clearPlayList() {
      this.$emit('clearPlayList')
    }
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
@import 'scss/variable.scss';
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
  z-index: 999;
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
