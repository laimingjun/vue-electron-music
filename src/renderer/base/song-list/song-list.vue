<template>
  <el-row
    :gutter="12"
    class="song-list-wrapper"
    v-loading="!songList.length"
    :element-loading-background="loadingBgColor"
  >
    <el-col
      :lg="4"
      :sm="6"
      class="song-list-item"
      v-for="item in songList"
      :key="item.id"
    >
      <div
        class="item-bg"
        @mouseenter="toggleItemHover($event, true)"
        @mouseleave="toggleItemHover($event, false)"
        @click="selectItem(item.id)"
      >
        <img v-lazy="item.picUrl || item.coverImgUrl">
        <div class="cover-hover-bg">
          <div class="item-play-icon">
            <i class="iconfont icon-play"></i>
          </div>
        </div>
        <div class="item-play-count">
          <div class="item-play-count-icon">
            <i class="iconfont icon-erji"></i>
            {{item.playCount | convertUnit}}
          </div>
        </div>
      </div>
      <p class="item-name">{{item.name}}</p>
    </el-col>
  </el-row>
</template>

<script>
import { convertUnit } from '@/common/js/util'
export default {
  props: {
    songList: {
      type: Array,
      default() {
        return []
      }
    },
    loadingBgColor: {
      type: String,
      default: '#18495c'
    }
  },
  methods: {
    toggleItemHover(e, isHover) {
      if (isHover) {
        e.target.children[1].style.visibility = 'visible'
      } else {
        e.target.children[1].style.visibility = 'hidden'
      }
    },
    selectItem(id) {
      this.$emit('selectSong', id)
    }
  },
  filters: {
    convertUnit
  }
}
</script>

<style scoped lang="scss">
@import "scss/variable.scss";
.song-list-wrapper {
  display: flex;
  flex-wrap: wrap;
  min-height: 120px;
  .song-list-item {
    margin-top: 20px;
    cursor: pointer;
    .item-bg {
      position: relative;
      width: 100%;
      padding-bottom: 100%;
      img {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        width: 100%;
      }
      .cover-hover-bg {
        visibility: hidden;
        .item-play-icon {
          right: 4px;
          bottom: 4px;
        }
      }
      .item-play-count {
        position: absolute;
        left: 4px;
        bottom: 4px;
      }
    }
    .item-name {
      margin-top: 4px;
      line-height: $p-line-height;
      &:hover {
        color: $color-text-highlight;
      }
    }
  }
}
</style>
