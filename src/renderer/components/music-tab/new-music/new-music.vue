<template>
  <div class="new-music-wrapper">
    <scroll>
      <div class="new-music-content">
        <ul class="type-list">
          <li
            v-for="item in newMusicTypeList"
            :key="item.code"
            :class="{active: currentTypeCode === item.code}"
            @click="changeType(item.code)"
          >{{item.name}}</li>
        </ul>
        <div class="btn-group">
          <div class="btn-mini active" @click="playAll">
            <i class="iconfont icon-play"></i>播放全部
          </div>
        </div>
        <div class="music-list" v-loading="loading" element-loading-background="#18495c">
          <music-list :musicList="musicList" @select="selectItem"></music-list>
        </div>
      </div>
    </scroll>
  </div>
</template>

<script>
import { ERR_OK, newMusicListUrl } from '@/api/config'
import { httpGet } from '@/api/httpUtil'
import { newMusicTypeList } from '@/api/apiType'
import { Music } from '@/common/js/music'
import { mapActions } from 'vuex'
import MusicList from '@/base/music-list/music-list'
import Scroll from '@/base/scroll/scroll'
export default {
  data() {
    return {
      newMusicTypeList,
      musicList: [],
      currentTypeCode: 0,
      loading: true
    }
  },
  created() {
    this._getNewMusicList()
  },
  methods: {
    changeType(code) {
      this.currentTypeCode = code
      this.musicList = []
      this.loading = true
      this._getNewMusicList()
    },
    playAll() {
      let list = this.musicList.map(item => {
        return new Music(item)
      })
      this.savePlayAndSequenceListHistory({ list })
    },
    selectItem(item, index) {
      let list = this.musicList.map(item => {
        return new Music(item)
      })
      this.savePlayAndSequenceListHistory({ list, index })
    },
    _getNewMusicList() {
      httpGet(newMusicListUrl, {
        type: this.currentTypeCode
      }).then(res => {
        this.loading = false
        if (res.code === ERR_OK) {
          let musicList = res.data
          musicList.forEach(item => {
            item.al = item.album
            item.ar = item.artists
            item.dt = item.duration
          })
          this.musicList = musicList
        }
      })
    },
    ...mapActions(['savePlayAndSequenceListHistory'])
  },
  components: {
    Scroll,
    MusicList
  }
}
</script>

<style scoped lang="scss">
@import "scss/variable.scss";
.new-music-wrapper {
  height: $music-content-height;
  background: $music-content-bg;
  .new-music-content {
    padding: 20px;
    .type-list {
      display: flex;
      li {
        line-height: $control-height;
        margin-right: 16px;
        font-size: $font-size-medium;
        cursor: pointer;
        &.active {
          border-bottom: 2px solid $color-text-highlight;
        }
      }
    }
    .btn-group {
      display: flex;
      padding: 10px 0;
    }
  }
}
</style>
