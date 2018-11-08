<template>
  <div class="search-music-wrapper">
    <div class="btn-group">
      <div class="btn-mini active">
        <i class="iconfont icon-play"></i>
        播放全部
      </div>
    </div>
    <music-list
      v-if="songs.length"
      :musicList="songs" 
      @clickSinger="toSingerDetail"
      @clickAlbum="toAlbumDetail"></music-list>
  </div>
</template>

<script>
import MusicList from '@/base/music-list/music-list'
export default {
  props: {
    songs: {
      type: Array,
      default() {
        return []
      }
    },
    hasMore: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    toSingerDetail(id) {
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
  components: {
    MusicList
  }
}
</script>

<style scoped lang="scss">
.search-music-wrapper {
  .btn-group {
    display: flex;
    margin: 14px 0;
  }
}
</style>
