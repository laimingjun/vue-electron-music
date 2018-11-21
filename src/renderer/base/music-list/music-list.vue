<template>
  <div class="songs-wrapper">
    <ul class="songs-list">
      <li class="songs-item">
        <div class="name-control">歌曲</div>
        <div class="singer" v-if="showSinger">歌手</div>
        <div class="album" v-if="showAlbum">专辑</div>
        <div class="duration">时长</div>  
      <li>
      <li class="songs-item" v-for="(item, index) in musicList" :key="index"
        @mouseenter="toggleItemHover(index)"
        @mouseleave="toggleItemHover(null)">
        <div class="name-control">
          <div class="name">
            <i class="iconfont icon-iconfontxihuan"></i>
            {{item.name}}
          </div>
          <div class="control" v-show="currentHoverIndex === index">
            <i class="iconfont icon-bofangqi-bofang"></i>
          </div>
        </div>
        <div class="singer" v-if="showSinger" :title="item.ar | formatSingers">
          <span 
            class="singer-item"
            v-for="(singer, index) in item.ar || item.artists" 
            :key="index"
            :title="singer.id"
            @click="clickSinger(singer.id)">
            {{singer.name}}
          </span>
        </div>
        <div class="album" v-if="showAlbum">
          <span :title="item | formatAlbum" @click="clickAlbum(item)">{{item | formatAlbum}}</span>
        </div>   
        <div class="duration">{{item.dt || item.duration | formatTime}}</div>   
      </li>
    </ul>  
  </div>
</template>

<script>
import { formatSingers, formatTime } from '@/common/js/util'
export default {
  data() {
    return {
      currentHoverIndex: null
    }
  },
  props: {
    musicList: {
      type: Array,
      default() {
        return []
      }
    },
    showSinger: {
      type: Boolean,
      default: true
    },
    showAlbum: {
      type: Boolean,
      default: true
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
    clickAlbum(item) {
      let id = item.al ? item.al.id : item.album ? item.album.id : ''
      this.$emit('clickAlbum', id)
    },
    toggleItemHover(index) {
      this.currentHoverIndex = index
    }
  },
  filters: {
    formatSingers,
    formatTime,
    formatAlbum(item) {
      return item.al ? item.al.name : item.album ? item.album.name : ''
    }
  }
}
</script>

<style scoped lang="scss">
@import 'scss/variable.scss';
$songs-height: 40px;
$songs-hover-bg: #155263;
.songs-wrapper {
  .songs-list {
    .songs-item {
      display: flex;
      align-items: baseline;
      border-bottom: 1px solid $light-border-color;
      font-size: $font-size-small;
      &:first-child {
        cursor: default;
        border-top: 1px solid $light-border-color;
      }
      &:first-child:hover {
        background-color: rgba(0, 0, 0, 0);
      }
      &:hover {
        background-color: $songs-hover-bg;
      }
      div {
        height: $songs-height;
        line-height: $songs-height;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .name-control {
        flex: 1;
        padding: 0 10px;
        display: flex;
        justify-content: space-between;
        .iconfont {
          margin-right: 6px;
          cursor: pointer;
          &:hover {
            color: $color-text-highlight;
          }
        }
      }
      .singer {
        width: 20%;
      }
      .album {
        width: 20%;
        cursor: pointer;
        &:hover {
          color: $color-text-highlight;
        }
      }
      .duration {
        width: 6%;
      }
    }
  }
}
</style>
