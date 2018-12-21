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
      @clickAlbum="toAlbumDetail"
      @select="addPlayList"
    ></music-list>
  </div>
</template>

<script>
import MusicList from '@/base/music-list/music-list'
import { DEFAULT_ERR_MSG } from '@/api/config'
import { mapActions } from 'vuex'
import {
  Music
} from '@/common/js/music'
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
    },
    addPlayList(item) {
      let music = new Music(item)
      music.checkMusic().then(res => {
        if (res.success) {
          this.insertMusic({ music })
        }
      }).catch((err) => {
        let message = DEFAULT_ERR_MSG
        if (err.response && err.response.data.message) {
          message = err.response.data.message
        }
        this.$message({
          message
        })
      })
    },
    ...mapActions(['insertMusic'])
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
