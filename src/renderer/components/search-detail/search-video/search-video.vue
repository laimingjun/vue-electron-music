<template>
  <div class="search-video-wrapper">
    <div class="video-item" v-for="(item, index) in videos" :key="item.vid">
      <div class="cover-img" 
        @mouseenter="changeCurrentHover(index)"
        @mouseleave="changeCurrentHover(null)">
        <img v-lazy="item.coverUrl">
        <div class="cover-hover-bg" v-show="currentHoverIndex === index">
          <div class="item-play-icon">
            <i class="iconfont icon-play"></i>
          </div>
        </div>
        <div class="play-count">
          <div class="play-count-icon">
            <i class="iconfont icon-shipin"></i>
            {{item.playTime | convertUnit}}
          </div>
        </div>
        <div class="play-time">
          {{item.durationms | formatTime}}
        </div>
      </div>
      <div class="title" :title="item.title">
        {{item.title}}
      </div>
      <div class="creator">
        <span v-for="creator in item.creator" :key="creator.userId">{{creator.userName}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { convertUnit, formatTime } from '@/common/js/util'
export default {
  data() {
    return {
      currentHoverIndex: null
    }
  },
  props: {
    videos: {
      type: Array,
      default() {
        return []
      }
    }
  },
  methods: {
    changeCurrentHover(index) {
      this.currentHoverIndex = index
    }
  },
  filters: {
    convertUnit,
    formatTime
  }
}
</script>

<style scoped lang="scss">
@import 'scss/variable.scss';
.search-video-wrapper {
  display: flex;
  flex-flow: wrap;
  padding-top: 10px;
  .video-item {
    width: 22%;
    margin-right: 4%;
    margin-bottom: 20px;
    &:nth-child(4n) {
      margin-right: 0;
    }
    .cover-img {
      position: relative;
      width: 100%;
      height: 0;
      padding-bottom: 9/16 * 100%;
      img {
        position: absolute;
        width: 100%;
        height: 100%;
      }
      .cover-hover-bg {
        .item-play-icon {
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      }
      .play-count {
        position: absolute;
        top: 0;
        right: 0;
        width: 50%;
        padding: 2px 2px 2px 0px;
        text-align: right;
        background: linear-gradient(
          to left,
          rgba(0, 0, 0, 0.2),
          rgba(0, 0, 0, 0)
        );
      }
      .play-time {
        position: absolute;
        left: 4px;
        bottom: 4px;
      }
    }
    .title {
      margin: 4px 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .creator {
      color: $color-text-dark;
    }
  }
}
</style>
