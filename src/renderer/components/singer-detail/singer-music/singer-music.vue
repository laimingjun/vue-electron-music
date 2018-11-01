<template>
  <div class="singer-music-wrapper">
    <div class="btn-group">
      <div class="btn-mini active"><i class="iconfont icon-bofangqi-bofang"></i>全部播放</div>
    </div>
    <music-list :musicList="musicList" :showSinger="showSinger" @clickAlbum="toAlbumDetail"></music-list>
  </div>
</template>

<script>
import { ERR_OK, singerMusicListUrl } from '@/api/config'
import { httpGet } from '@/api/httpUtil'
import MusicList from '@/base/music-list/music-list'

export default {
  data() {
    return {
      musicList: [],
      showSinger: false
    }
  },
  created() {
    this.id = this.$route.params.id
    this._getMusicList()
  },
  methods: {
    toAlbumDetail(id) {
      this.$router.push({
        name: 'AlbumDetail',
        params: { id }
      })
    },
    _getMusicList() {
      httpGet(singerMusicListUrl, {
        id: this.id
      }).then(res => {
        if (res.code === ERR_OK) {
          this.musicList = res.hotSongs
        }
      })
    }
  },
  components: {
    MusicList
  }
}
</script>

<style scoped lang="scss">
.singer-music-wrapper {
  padding-bottom: 20px;
  .btn-group {
    display: flex;
    margin: 20px 0;
  }
}
</style>
