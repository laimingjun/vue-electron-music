<template>
  <div class="search-lyric-wrapper">
    <div class="music-item" v-for="(item, index) in songs" :key="item.id">
        <div class="detail">
          <div class="name">{{item.name}}</div>
          <div class="singer">
            <span 
              class="singer-item" 
              v-for="(singer, index) in item.artists" :key="index"
              @click="toSingerDetail(singer.id)">
              {{singer.name}}
            </span>
          </div>
          <div class="album" @click="toAlbumDetail(item.album.id)">
            {{item.album.name}}
          </div>
          <div class="duration">
            {{item.duration | formatTime}}
          </div>
        </div>
        <div class="lyric">
          <pre>{{item.lyrics.txt}}</pre>
          <div class="btn-group">
            <div class="btn-mini" @click="toggleMoreLyric">展开歌词</div>
            <div class="btn-mini" @click="copyLyric(index)">复制歌词</div>
          </div>
        </div>
    </div>
    <textarea class="copy-input" ref="copyInput"></textarea>
  </div>
</template>

<script>
import { formatTime } from '@/common/js/util'
const lyricHeight = '100%'
export default {
  props: {
    songs: {
      type: Array,
      default() {
        return []
      }
    }
  },
  methods: {
    copyLyric(index) {
      let lyric = this.songs[index].lyrics.txt
      this.$refs.copyInput.innerHTML = lyric
      this.$refs.copyInput.select()
      document.execCommand('copy')
    },
    toggleMoreLyric(e) {
      let targetLyric = e.target.parentElement.parentElement.children[0]
      targetLyric.style.height === lyricHeight
        ? (targetLyric.style.height = '')
        : (targetLyric.style.height = lyricHeight)
    },
    toSingerDetail(id) {
      if (id === 0) {
        return
      }
      this.$router.push({
        name: 'SingerDetail',
        params: { id }
      })
    },
    toAlbumDetail(id) {
      this.$router.push({
        name: 'AlbumDetail',
        params: { id }
      })
    }
  },
  filters: {
    formatTime
  }
}
</script>

<style scoped lang="scss">
@import 'scss/variable.scss';
$btn-group-width: 170px;
$btn-height: 28px;
.search-lyric-wrapper {
  padding-top: 20px;
  .music-item {
    padding: 10px 0;
    border-top: 1px solid $light-border-color;
    font-size: $font-size-medium;
    &:hover {
      background: $hover-bg-hint;
    }
    .detail {
      display: flex;
      margin-bottom: 14px;
      .name {
        width: 50%;
      }
      .singer {
        width: 18%;
        margin-right: 10px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .album {
        width: 25%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        cursor: pointer;
        &:hover {
          color: $color-text-highlight;
        }
      }
      .duration {
        color: $color-text-dark;
      }
    }
    .lyric {
      display: flex;
      pre {
        flex: 1;
        height: 66px;
        line-height: $p-line-height;
        color: $color-text-dark;
        overflow: hidden;
        white-space: pre-wrap;
        word-wrap: break-word;
      }
      .btn-group {
        display: flex;
        justify-content: space-between;
        width: $btn-group-width;
        height: $btn-height;
      }
    }
  }
  .copy-input {
    position: absolute;
    z-index: -1;
  }
}
</style>
