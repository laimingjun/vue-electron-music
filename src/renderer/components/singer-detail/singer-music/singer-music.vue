<template>
  <div class="singer-music-wrapper">
    <div class="btn-group">
      <div class="btn-mini active" @click="playAll">
        <i class="iconfont icon-bofangqi-bofang"></i>全部播放
      </div>
    </div>
    <music-list :musicList="musicList" :showSinger="showSinger" @select="selectItem"></music-list>
  </div>
</template>

<script>
import { ERR_OK, singerMusicListUrl } from '@/api/config'
import { httpGet } from '@/api/httpUtil'
import { createMusic } from '@/common/js/music'
import { mapActions } from 'vuex'
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
    selectItem(item, index) {
      let list = this.musicList.map(item => {
        return createMusic(item)
      })
      this.savePlayAndSequenceListHistory({ list, index })
    },
    playAll() {
      let list = this.musicList.map(item => {
        return createMusic(item)
      })
      this.savePlayAndSequenceListHistory({ list })
    },
    _getMusicList() {
      httpGet(singerMusicListUrl, {
        id: this.id
      }).then(res => {
        if (res.code === ERR_OK) {
          this.musicList = res.hotSongs
        }
      })
    },
    ...mapActions(['savePlayAndSequenceListHistory'])
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
