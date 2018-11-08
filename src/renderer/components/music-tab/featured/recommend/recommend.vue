<template>
  <div class="recommmend-wrapper">
    <h2>
      <span>为你推荐歌单</span>
      <span class="more">更多</span>
    </h2>
    <ul class="tag">
      <li v-for="item in hotTags" :key="item.id" @click="toSongByTag(item.name)" >{{item.name}}</li>
      <li @click="toAllTag">全部分类</li>
    </ul>
    <song-list @selectSong="selectSong" :songList="songList"></song-list>
  </div>
</template>

<script>
import SongList from '@/base/song-list/song-list'
export default {
  props: {
    hotTags: {
      type: Array,
      default() {
        return []
      }
    },
    songList: {
      type: Array,
      default() {
        return []
      }
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
    selectSong(id) {
      this.$router.push({
        name: 'SongDetail',
        params: {
          id
        }
      })
    },
    toSongByTag(tag) {
      this.$router.push({
        name: 'SongByTag',
        params: {
          tag
        }
      })
    },
    toAllTag() {
      this.$router.push({
        name: 'SongTag'
      })
    }
  },
  components: {
    SongList
  }
}
</script>

<style scoped lang="scss">
@import 'scss/variable.scss';
$recommend-bg: #184658;
$tag-width: 13.6%;
.recommmend-wrapper {
  padding: 30px 20px;
  background-color: $recommend-bg;
  h2 {
    display: flex;
    justify-content: space-between;
    letter-spacing: 2px;
    font-size: $font-size-medium-x;
    .more {
      cursor: pointer;
    }
  }
  .tag {
    display: flex;
    justify-content: space-between;
    margin-top: 16px;
    li {
      width: $tag-width;
      height: $tag-height;
      line-height: $tag-height;
      text-align: center;
      background: $tag-bg;
      cursor: pointer;
      &:hover {
        background: $hover-bg;
      }
    }
  }
}
</style>
