<template>
  <div class="album-detail-wrapper">
    <scroll>
      <div class="album-detail">
        <div class="cover-img">
          <img v-lazy="album.picUrl" />
        </div>
        <div class="detail">
          
        </div>
      </div>
      <div class="album-content">
        <music-list 
          :musicList="musicList" 
          :showAlbum="false"
          @clickSinger="toSingerDetail"></music-list>
      </div>
    </scroll>
  </div>
</template>

<script>
import { ERR_OK, albumDetailUrl } from '@/api/config'
import { httpGet } from '@/api/httpUtil'
import Scroll from '@/base/scroll/scroll'
import MusicList from '@/base/music-list/music-list'
export default {
  data() {
    return {
      musicList: [],
      album: {}
    }
  },
  created() {
    this._getAlbumDetail(this.$route.params.id)
  },
  methods: {
    toSingerDetail(id) {
      this.$router.push({
        name: 'SingerDetail',
        params: { id }
      })
    },
    _getAlbumDetail(id) {
      httpGet(albumDetailUrl, {
        id
      }).then(res => {
        if (res.code === ERR_OK) {
          this.musicList = res.songs
          this.album = res.album
        }
      })
    }
  },
  components: {
    Scroll,
    MusicList
  }
}
</script>

<style scoped lang="scss">
@import 'scss/variable.scss';
$cover-img-width: 150px;
$content-bg: #0d465a;
.album-detail-wrapper {
  height: $music-content-height;
  background: $content-bg;
  .album-detail {
    padding: 20px;
    background: $detail-bg;
    .cover-img {
      width: $cover-img-width;
      img {
        width: 100%;
      }
    }
  }
  .album-content {
    padding: 20px;
  }
}
</style>
