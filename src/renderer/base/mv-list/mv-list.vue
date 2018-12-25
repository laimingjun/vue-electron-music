<template>
  <div class="singer-mv-list">
    <div class="singer-mv-item" v-for="(item, index) in mvList" :key="item.id">
      <div
        class="cover-img"
        @mouseenter="changeCurrentHover(index)"
        @mouseleave="changeCurrentHover(null)"
        @click="selectItem(item)"
      >
        <img v-lazy="item.imgurl16v9 || item.cover">
        <div class="cover-bg-hover" v-show="currentHoverIndex === index">
          <div class="cover-play-icon">
            <i class="iconfont icon-play"></i>
          </div>
        </div>
        <div class="play-count">
          <div class="play-count-icon">
            <i class="iconfont icon-shipin"></i>
            {{item.playCount | convertUnit}}人播放
          </div>
        </div>
      </div>
      <div class="name" :title="item.name">{{item.name}}</div>
      <div class="singer">
        <span
          class="singer-item"
          v-for="(singer, index) in item.artists"
          :key="index"
          @click="clickSinger(singer.id)"
        >{{singer.name}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { convertUnit } from '@/common/js/util'
export default {
  data() {
    return {
      currentIndex: 1,
      currentHoverIndex: null
    }
  },
  props: {
    mvList: {
      type: Array,
      default() {
        return []
      }
    }
  },
  methods: {
    clickSinger(id) {
      if (id === 0) {
        this.$alert('暂无歌手详情', '提示')
        return
      }
      this.$emit('clickSinger', id)
    },
    selectItem(mv) {
      this.$emit('select', mv)
    },
    changeCurrentHover(index) {
      this.currentHoverIndex = index
    }
  },
  filters: {
    convertUnit
  }
}
</script>

<style scoped lang="scss">
@import "scss/variable.scss";
.singer-mv-list {
  display: flex;
  flex-wrap: wrap;
  line-height: $p-line-height;
  .singer-mv-item {
    width: 23%;
    margin-right: 2.5%;
    margin-bottom: 10px;
    &:nth-child(4n) {
      margin-right: 0;
    }
    .cover-img {
      position: relative;
      width: 100%;
      height: 0;
      padding-bottom: 9/16 * 100%;
      cursor: pointer;
      img {
        position: absolute;
        width: 100%;
        height: 100%;
      }
      .cover-bg-hover {
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(#000, 0);
        transition: background-color 0.3s;
        &:hover {
          background-color: rgba(#000, 0.2);
        }
        .cover-play-icon {
          transform: translateY(10px);
          &:hover {
            color: $color-text-highlight;
            transition: color 0.3s;
          }
          .iconfont {
            font-size: $iconfont-size-medium-x;
          }
        }
      }
      .play-count {
        position: absolute;
        left: 4px;
        bottom: 4px;
      }
    }
    .name {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .singer {
      .singer-item {
        color: $color-text-dark;
        &:hover {
          color: $color-text-highlight;
        }
      }
    }
  }
}
</style>
