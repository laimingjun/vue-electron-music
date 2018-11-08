<template>
  <div class="search-album-wrapper">
    <div class="album-item" v-for="(item, index) in albums" :key="item.id">
      <div class="album-cover" 
        @mouseenter="changeCurrentHover(index)"
        @mouseleave="changeCurrentHover(null)">
        <img v-lazy="item.blurPicUrl">
        <div class="cover-hover-bg" v-show="currentHoverIndex === index">
          <div class="item-play-icon">
             <i class="iconfont icon-play"></i>
          </div>
        </div>
      </div>
      <div class="name" @click="toAlbumDetail(item.id)">
        {{item.name}}
      </div>
      <div class="singer">
        <span class="singer-item" v-for="singer in item.artists" :key="singer.id" @click="toSingerDetail(singer.id)">
          {{singer.name}}
        </span>
      </div>
      <div class="time">
        {{item.publishTime | formatDateTime}}
      </div>
      <div class="number">
        {{item.size}}首
      </div>
    </div>
  </div>
</template>

<script>
import { formatDateTime } from '@/common/js/util'
export default {
  data() {
    return {
      currentHoverIndex: null
    }
  },
  props: {
    albums: {
      type: Array,
      default() {
        return []
      }
    }
  },
  methods: {
    changeCurrentHover(index) {
      this.currentHoverIndex = index
    },
    toAlbumDetail(id) {
      this.$router.push({
        name: 'AlbumDetail',
        params: { id }
      })
    },
    toSingerDetail(id) {
      this.$router.push({
        name: 'SingerDetail',
        params: { id }
      })
    }
  },
  filters: {
    formatDateTime
  }
}
</script>

<style scoped lang="scss">
@import 'scss/variable.scss';
$ablum-height: 80px;
.search-album-wrapper {
  .album-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: $ablum-height;
    padding: 10px 0;
    border-top: 1px solid $btn-border-color;
    font-size: $font-size-medium;
    &:hover {
      background: $hover-bg-hint;
    }
    .album-cover {
      position: relative;
      width: $ablum-height;
      height: $ablum-height;
      img {
        width: 100%;
        height: 100%;
      }
      .cover-hover-bg {
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
    .name {
      width: 36%;
      margin-left: 10px;
      cursor: pointer;
      &:hover {
        color: $color-text-highlight;
      }
    }
    .singer {
      width: 24%;
    }
    .time {
      flex: 1;
      color: $color-text-dark;
    }
    .number {
      flex: 1;
      text-align: right;
      color: $color-text-dark;
    }
  }
}
</style>
