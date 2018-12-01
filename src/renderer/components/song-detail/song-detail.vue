<template>
  <div class="song-detail-wrapper" v-loading="loading" element-loading-background="#0b4055">
    <scroll ref="scroll">
      <div class="song-detail-container">
        <div class="song-cover">
          <div class="cover-img">
            <img :src="songDetail.coverImgUrl" alt="歌单图片">
          </div>
          <div class="song-detail">
            <h2>{{songDetail.name}}</h2>
            <div class="avatar">
              <img :src="songDetail.creator && songDetail.creator.avatarUrl" alt="作者头像">
              <span>{{songDetail.creator && songDetail.creator.nickname}}</span>
            </div>
            <ul class="tags">
              <li>标签：</li>
              <li v-if="songDetail.tags && songDetail.tags.length === 0">暂无</li>
              <li v-for="(item, index) in songDetail.tags" :key="index">#{{item}}</li>
            </ul>
            <div class="btn-group">
              <div class="btn-mini active" @click="playAll">
                <i class="iconfont icon-bofangqi-bofang"></i>播放全部
              </div>
              <div
                class="btn-mini"
                @click="toggleSubscribe"
                v-if="songDetail.creator && songDetail.creator.userId !== userInfo.userId"
              >
                <i class="iconfont" :class="subscribeIcon"></i>
                收藏({{songDetail.subscribedCount | convertUnit}})
              </div>
              <div class="btn-mini">
                <i class="iconfont icon-fenxiang"></i>
                分享({{songDetail.shareCount | convertUnit}})
              </div>
            </div>
            <div ref="songDescriptionWrapper" class="description">
              <pre ref="songDescription">简介：{{songDetail.description || '暂无'}}</pre>
            </div>
            <div class="description-more" v-show="isShowMoreIcon">
              <i @click="toggleDescriptionMore" class="iconfont" :class="moreIcon"></i>
            </div>
          </div>
        </div>
        <div class="songs">
          <ul class="tabs">
            <li
              :class="{active: currentTab === 'MusicList'}"
              @click="showTabs('MusicList')"
            >歌曲{{songDetail.trackCount}}</li>
            <li
              :class="{active: currentTab === 'SongComment'}"
              @click="showTabs('SongComment')"
            >评论{{songDetail.commentCount}}</li>
          </ul>
          <keep-alive>
            <component
              :is="currentTab"
              :musicList="musicList"
              :id="songId"
              @clickSinger="toSingerDetail"
              @clickAlbum="toAlbumDetail"
              @select="selectItem"
            ></component>
          </keep-alive>
        </div>
      </div>
    </scroll>
  </div>
</template>

<script>
import { ERR_OK, songListDetailUrl, songListSubscribeUrl } from '@/api/config'
import { httpGet } from '@/api/httpUtil'
import { subscribeType } from '@/api/apiType'
import { convertUnit, deepCopy } from '@/common/js/util'
import { createMusic } from '@/common/js/music'
import { mapGetters, mapActions } from 'vuex'
import Scroll from '@/base/scroll/scroll'
import MusicList from '@/base/music-list/music-list'
import SongComment from './song-comment/song-comment'

const omitDescriptonHeight = 36
export default {
  data() {
    return {
      songDetail: {},
      musicList: [],
      currentTab: 'MusicList',
      descriptionMoreShow: false,
      isShowMoreIcon: true,
      loading: true
    }
  },
  computed: {
    songId() {
      return parseInt(this.$route.params.id)
    },
    moreIcon() {
      return this.descriptionMoreShow ? 'icon-shang' : 'icon-xia'
    },
    subscribeIcon() {
      return this.songDetail.subscribed ? 'icon-xihuan' : 'icon-iconfontxihuan'
    },
    ...mapGetters(['userInfo'])
  },
  watch: {
    songId: {
      immediate: true,
      handler() {
        this.loading = true
        this.currentTab = 'MusicList'
        this.descriptionMoreShow && this.toggleDescriptionMore()
        this._getSongListDetail()
      }
    }
  },
  methods: {
    toggleDescriptionMore() {
      this.descriptionMoreShow = !this.descriptionMoreShow
      if (this.descriptionMoreShow) {
        let descriptionHeight = this.$refs.songDescription.offsetHeight
        descriptionHeight =
          descriptionHeight < omitDescriptonHeight
            ? omitDescriptonHeight
            : descriptionHeight
        this.$refs.songDescriptionWrapper.style.height = `${descriptionHeight}px`
      } else {
        this.$refs.songDescriptionWrapper.style.height = `${omitDescriptonHeight}px`
      }
    },
    toggleSubscribe() {
      let t = this.songDetail.subscribed
        ? subscribeType.cancel
        : subscribeType.collect
      httpGet(songListSubscribeUrl, {
        id: this.songDetail.id,
        t
      }).then(res => {
        if (res.code === ERR_OK) {
          this.songDetail.subscribed = !this.songDetail.subscribed
          this.$message({
            message: this.songDetail.subscribed ? '收藏成功' : '取消收藏成功',
            type: 'success'
          })
          this.songDetail.subscribed
            ? this.insertUserSongList(deepCopy(this.songDetail))
            : this.deleteUserSongList(this.songDetail.id)
        }
      })
    },
    showTabs(compName) {
      this.currentTab = compName
    },
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
    playAll() {
      let list = this.musicList.map(item => {
        return createMusic(item)
      })
      this.savePlayListHistory(list)
    },
    selectItem(item, index) {
      let list = this.musicList.map(item => {
        return createMusic(item)
      })
      this.selectPlay({ list, index })
    },
    _getSongListDetail(id) {
      httpGet(songListDetailUrl, {
        id: this.songId,
        timestamp: new Date().getTime()
      }).then(res => {
        this.loading = false
        if (res.code === ERR_OK) {
          this.songDetail = res.playlist
          this.$nextTick(() => {
            this.$refs.scroll.setScrollTop(0)
            let songDescriptHeight = this.$refs.songDescription.offsetHeight
            this.isShowMoreIcon = songDescriptHeight > omitDescriptonHeight
          })
          this.musicList = res.playlist.tracks
        }
      })
    },
    ...mapActions([
      'savePlayListHistory',
      'insertUserSongList',
      'deleteUserSongList',
      'selectPlay'
    ])
  },
  components: {
    Scroll,
    MusicList,
    SongComment
  },
  filters: {
    convertUnit
  }
}
</script>

<style scoped lang="scss">
@import "scss/variable.scss";
$song-detail-bg: #1b4f63;
$song-bg: #0d465a;
$cover-img-width: 160px;
$omit-description-height: 36px;
.song-detail-wrapper {
  height: calc(100% - #{$control-height});
  background: $song-bg;
  .song-detail-container {
    .song-cover {
      display: flex;
      padding: 30px;
      background: $song-detail-bg;
      .cover-img {
        img {
          width: $cover-img-width;
          height: $cover-img-width;
        }
      }
      .song-detail {
        flex: 1;
        margin-left: 16px;
        h2 {
          font-size: $font-size-large-x;
          font-weight: bold;
          margin-bottom: 10px;
        }
        .avatar {
          margin-bottom: 10px;
          img {
            width: 26px;
            height: 26px;
            border-radius: 50%;
            margin-right: 6px;
            vertical-align: middle;
          }
          span {
            vertical-align: middle;
          }
        }
        .tags {
          display: flex;
          li {
            margin-right: 8px;
            &:first-child {
              margin-right: 0;
            }
          }
        }
        .btn-group {
          margin-top: 10px;
          display: flex;
          .btn-mini {
            margin-right: 8px;
          }
        }
        .description {
          margin-top: 10px;
          height: $omit-description-height;
          overflow: hidden;
          pre {
            line-height: $p-line-height;
            white-space: pre-wrap;
            word-wrap: break-word;
          }
        }
        .description-more {
          text-align: right;
          .iconfont {
            cursor: pointer;
            &:hover {
              color: $color-text-highlight;
            }
          }
        }
      }
    }
    .songs {
      padding: 10px 30px;
      background: $song-bg;
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
}
</style>
