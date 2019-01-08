<template>
  <div class="album-detail-wrapper">
    <scroll>
      <div class="album-detail">
        <div class="cover-img">
          <img v-lazy="album.picUrl">
        </div>
        <div class="detail">
          <div class="album-name">{{album.name}}</div>
          <div class="singer">
            <span class="singer-item" v-for="item in album.artists" :key="item.id">{{item.name}}</span>
          </div>
          <div class="create-date">{{album.publishTime | formatDateTime}} 发行</div>
          <div class="btn-group">
            <div class="btn-mini active" @click="playAll">
              <i class="iconfont icon-bofangqi-bofang"></i>播放全部
            </div>
            <div class="btn-mini">
              <i class="iconfont icon-iconfontxihuan"></i>收藏
            </div>
            <div class="btn-mini">
              <i class="iconfont icon-fenxiang"></i>
              分享({{album.info && album.info.shareCount}})
            </div>
          </div>
        </div>
      </div>
      <div class="album-content">
        <ul class="tabs">
          <li
            :class="{active: currentTab === 'MusicList'}"
            @click="changeTab('MusicList')"
          >歌曲({{album.size}})</li>
          <li :class="{active: currentTab === 'AlbumDesc'}" @click="changeTab('AlbumDesc')">专辑信息</li>
          <li
            :class="{active: currentTab === 'AlbumComment'}"
            @click="changeTab('AlbumComment')"
          >评论({{album.info && album.info.commentCount}})</li>
        </ul>
        <component
          :is="currentTab"
          :musicList="musicList"
          :showAlbum="false"
          :album="album"
          :id="album.id"
          @clickSinger="toSingerDetail"
          @addComment="addComment"
        ></component>
      </div>
    </scroll>
  </div>
</template>

<script>
import { ERR_OK, albumDetailUrl } from '@/api/config'
import { httpGet } from '@/api/httpUtil'
import { formatDateTime } from '@/common/js/util'
import { mapActions } from 'vuex'
import { createMusic } from '@/common/js/music'
import Scroll from '@/base/scroll/scroll'
import MusicList from '@/base/music-list/music-list'
import AlbumDesc from './album-desc/album-desc'
import AlbumComment from './album-comment/album-comment'
export default {
  data() {
    return {
      musicList: [],
      album: {},
      currentTab: 'MusicList'
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
    changeTab(tab) {
      this.currentTab = tab
    },
    playAll() {
      let list = this.musicList.map(item => {
        return createMusic(item)
      })
      this.savePlayAndSequenceListHistory({ list })
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
    },
    addComment() {
      this.album.info.commentCount = this.album.info.commentCount + 1
    },
    ...mapActions(['savePlayAndSequenceListHistory'])
  },
  components: {
    Scroll,
    MusicList,
    AlbumComment,
    AlbumDesc
  },
  filters: {
    formatDateTime
  }
}
</script>

<style scoped lang="scss">
@import "scss/variable.scss";
$cover-img-width: 150px;
$content-bg: #0d465a;
.album-detail-wrapper {
  height: $music-content-height;
  background: $content-bg;
  .album-detail {
    display: flex;
    padding: 20px;
    background: $detail-bg;
    .cover-img {
      width: $cover-img-width;
      img {
        width: 100%;
      }
    }
    .detail {
      position: relative;
      flex: 1;
      padding-left: 12px;
      .album-name {
        font-size: $font-size-large;
        font-weight: bold;
      }
      .singer {
        margin: 20px 0;
      }
      .create-date {
        color: $color-text-dark;
      }
      .btn-group {
        position: absolute;
        bottom: 0;
        display: flex;
        margin-top: 10px;
        .btn-mini {
          margin-right: 8px;
        }
      }
    }
  }
  .album-content {
    padding: 20px;
    .tabs {
      display: flex;
      font-size: $font-size-medium;
      li {
        margin: 0 10px;
        height: $control-height;
        line-height: $control-height;
        cursor: pointer;
        &:hover {
          color: $color-text-highlight;
        }
        &:first-child {
          margin-left: 0;
        }
        &.active {
          color: $color-text-highlight;
          border-bottom: 2px solid $color-text-highlight;
        }
      }
    }
  }
}
</style>
