<template>
  <div class="songs-wrapper">
    <ul class="songs-list">
      <li class="songs-item">
        <div class="name">歌曲</div>
        <div class="singer" v-if="showSinger">歌手</div>
        <div class="album" v-if="showAlbum">专辑</div>
        <div class="duration">时长</div>  
      <li>
      <li class="songs-item" v-for="item in musicList" :key="item.id">
        <div class="name">
          <i class="iconfont icon-iconfontxihuan"></i>
          {{item.name}}
        </div>
        <div class="singer" v-if="showSinger" :title="item.ar | formatSingers">
          <span 
            class="singer-item"
            v-for="singer in item.ar" 
            :key="singer.id"
            @click="clickSinger(singer.id)">
            {{singer.name}}
          </span>
        </div>
        <div class="album" v-if="showAlbum">
          <span :title="item.al.name" @click="clickAlbum(item.al.id)">{{item.al.name}}</span>
        </div>   
        <div class="duration">{{item.dt | formatTime}}</div>   
      </li>
    </ul>  
  </div>
</template>

<script>
import { pad, formatSingers } from '@/common/js/util'
export default {
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
      this.$emit('clickSinger', id)
    },
    clickAlbum(id) {
      this.$emit('clickAlbum', id)
    }
  },
  filters: {
    formatSingers,
    formatTime(val) {
      val = (val / 1000) | 0
      const minute = (val / 60) | 0
      const second = pad(val % 60)
      return `${minute}:${second}`
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
      .name {
        flex: 1;
        padding-left: 10px;
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
        cursor: pointer;
        .singer-item {
          &:hover {
            color: $color-text-highlight;
          }
          &:before {
            content: '/';
            margin: 0 2px;
          }
          &:first-child:before {
            content: '';
          }
        }
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
