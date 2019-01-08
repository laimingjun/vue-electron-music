<template>
  <div class="search-music-wrapper">
    <div class="btn-group">
      <div class="btn-mini active" @click="playAll">
        <i class="iconfont icon-play"></i>
        播放全部
      </div>
    </div>
    <music-list
      v-if="songs.length"
      :musicList="songs"
      @select="addPlayList"
    ></music-list>
  </div>
</template>

<script>
import MusicList from '@/base/music-list/music-list'
import { ERR_OK, musicDetailUrl } from '@/api/config'
import { httpGet } from '@/api/httpUtil'
import { mapActions } from 'vuex'
import {
  createMusic
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
    addPlayList(item) {
      httpGet(musicDetailUrl, { ids: item.id }).then(res => {
        if (res.code === ERR_OK) {
          let music = createMusic(res.songs[0])
          this.insertMusic({ music })
        }
      })
    },
    playAll() {
      let ids = this.songs.map(item => {
        return item.id
      })
      httpGet(musicDetailUrl, { ids: ids.join(',') }).then(res => {
        if (res.code === ERR_OK) {
          let list = res.songs.map(item => {
            return createMusic(item)
          })
          this.savePlayAndSequenceListHistory({ list })
        }
      })
    },
    ...mapActions(['insertMusic', 'savePlayAndSequenceListHistory'])
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
