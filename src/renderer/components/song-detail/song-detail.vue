<template>
  <div class="song-detail-wrapper"
    v-loading="loading"
    element-loading-background="#0b4055">
    <scroll>
      <div class="song-detail-container">
        <div class="song-cover">
          <div class="cover-img">
            <img :src="songDetail.coverImgUrl" alt="歌单图片">
          </div>
          <div class="song-detail">
            <h2>{{songDetail.name}}</h2>
            <div class="avatar">
              <img :src="songDetail.creator && songDetail.creator.avatarUrl" alt="作者头像" />
              <span>{{songDetail.creator && songDetail.creator.nickname}}</span>
            </div>
            <ul class="tags">
              <li>标签：</li>
              <li v-for="(item, index) in songDetail.tags" :key="index">#{{item}}</li>
            </ul>
            <div class="btn-group">
              <div class='btn-mini active'>
                <i class="iconfont icon-bofangqi-bofang"></i>播放全部
              </div>
              <div class="btn-mini">
                <i class="iconfont icon-iconfontxihuan"></i>收藏
              </div>
              <div class="btn-mini">
                <i class="iconfont icon-fenxiang"></i>分享
              </div>
            </div>
            <div ref="songDescriptionWrapper" class="description">
              <pre ref="songDescription">简介：{{songDetail.description}}</pre>
            </div>
            <div class="description-more" v-show="isShowMoreIcon">
              <i @click="toggleDescriptionMore" class="iconfont" :class="moreIcon"></i>
            </div>
          </div>
        </div>
        <div class="songs">
          <ul class="tabs">
            <li :class="{active: currentTab === 'MusicList'}" @click="showTabs('MusicList')">歌曲{{songDetail.trackCount}}</li>
            <li :class="{active: currentTab === 'Comment'}" @click="showTabs('Comment')">评论{{songDetail.commentCount}}</li>
          </ul>
          <keep-alive>
            <component 
              :is="currentTab"
              :musicList="musicList" 
              :songId="songId" 
              @clickSinger="toSingerDetail"
              @clickAlbum="toAlbumDetail"></component>
          </keep-alive>
        </div> 
      </div>
    </scroll>
  </div>
</template>

<script>
import { ERR_OK, songListDetailUrl } from '@/api/config'
import { httpGet } from '@/api/httpUtil'
import Scroll from '@/base/scroll/scroll'
import MusicList from '@/base/music-list/music-list'
import Comment from './comment/comment'

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
      return this.$route.params.id
    },
    moreIcon() {
      return this.descriptionMoreShow ? 'icon-shang' : 'icon-xia'
    }
  },
  created() {
    this._getSongListDetail(this.$route.params.id)
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
    _getSongListDetail(id) {
      httpGet(songListDetailUrl, {
        id
      }).then(res => {
        this.loading = false
        if (res.code === ERR_OK) {
          this.songDetail = res.playlist
          this.$nextTick(() => {
            let songDescriptHeight = this.$refs.songDescription.offsetHeight
            this.isShowMoreIcon = songDescriptHeight > omitDescriptonHeight
          })
          this.musicList = res.playlist.tracks
        }
      })
    }
  },
  components: {
    Scroll,
    MusicList,
    Comment
  }
}
</script>

<style scoped lang="scss">
@import 'scss/variable.scss';
$song-detail-bg: #1b4f63;
$song-bg: #0d465a;
$cover-img-width: 160px;
$omit-description-height: 36px;
.song-detail-wrapper {
  height: calc(100% - #{$control-height});
  background: $song-detail-bg;
  .song-detail-container {
    .song-cover {
      display: flex;
      padding: 30px;
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
