<template>
  <!-- 底部播放器 -->
  <div class="player-wrapper">
    <transition name="bottom-collapse" >
      <div class="full-player" v-show="fullScreen" @click="hidePlayList">
        <div class="bg" :style="{backgroundImage: 'url('+ currentMusic.album.picUrl +')'}">
        </div>
        <div class="content">
          <div class="header">
            <div class="hide" v-show="!isOpenComment" @click="toggleFullScreen(false)">
              <i class="iconfont icon-xia"></i>
            </div>
            <div class="back" v-show="isOpenComment" @click="toggleOpenComment">
              <i class="el-icon-arrow-left"></i>返回
            </div>
            <div class="control">
              <div class="icon" @click="toggleFullScreenWindow" :title="fullScreenWindowTip">
                <i class="iconfont" :class="fullScreenWindowIcon"></i>
              </div>
              <div class="icon" @click="toggleMaxWindow" :title="maxWindowTip">
                <i class="iconfont" :class="maxWindowIcon"></i>
              </div>
              <div class="icon" @click="closeWindow" title="关闭">
                <i class="iconfont icon-guanbi"></i>
              </div>
            </div>
          </div>
          <div class="main">
            <div class="cover-lyric" v-show="!isOpenComment">
              <div class="cover-img">
                <img :src="currentMusic.album.picUrl" >
              </div>
              <div class="detail">
                <div class="name">{{currentMusic.name}}</div>
                <div class="singer">
                  歌手：
                  <span class="singer-item" 
                    v-for="(singer, index) in currentMusic.artists" :key="index">
                    {{singer.name}}
                  </span>
                  &nbsp;&nbsp;&nbsp;专辑：
                  <span class="album">{{currentMusic.album.name}}</span>
                </div>
                <div class="lyric">
                  <scroll ref="lyricScroll">
                    <ul>
                      <li :class="{active: currentLyricIndex === index}" 
                        v-for="(item, index) in lyric.lines" :key="index">
                        {{item.txt}}
                      </li>
                    </ul>
                  </scroll>
                </div> 
              </div>
            </div>
            <div class="comment" v-show="isOpenComment">
                <div class="name">{{currentMusic.name}}</div>
                <div class="singer">
                  <span class="singer-item" v-for="(singer, index) in currentMusic.artists" :key="index">
                  {{singer.name}}
                  </span>
                </div>
                <div class="comment-detail">
                  <scroll>
                    <music-comment 
                      :id="currentMusic.id" 
                      @update:commentCount="updateCommentCount"></music-comment>
                  </scroll>
                </div>
            </div>
          </div>
          <div class="player">
            <div class="duration">
              <div>{{currentTime | formatTime}}</div>
              <div>{{currentMusic.duration | formatTime}}</div>
            </div>
            <div class="progress">
              <el-progress :percentage="percentage" :stroke-width="2" :show-text="false" color="#48e3f6">
              </el-progress>
              <div class="control">
                <div class="left">
                  <div>
                    <i class="iconfont" :class="favorIcon"></i>
                  </div>
                  <div @click="toggleOpenComment">
                    <i class="iconfont icon-xiaoxi"></i>
                    &nbsp;{{commentCount | formatCommentCount}}
                  </div>
                </div>
                <div class="center">
                  <div class="play-mode">
                    <el-popover
                      placement="top"
                      :visible-arrow="false"
                      v-model="playModeVisible.full">
                      <play-mode-list @togglePlayMode="togglePlayMode"></play-mode-list>
                      <i slot="reference" class="iconfont" :class="playModeIcon"></i>
                    </el-popover>
                  </div>
                  <div class="play-control" @click="prev">
                    <i class="iconfont icon-shangyishou"></i>
                  </div>
                  <div class="play-state" @click="togglePlaying">
                    <i class="iconfont" :class="playIcon"></i>
                  </div>
                  <div class="play-control" @click="next">
                    <i class="iconfont icon-xiayishou"></i>
                  </div>
                  <div class="play-sound">
                    <i class="iconfont icon-yinliang"></i>
                  </div>
                </div>
                <div class="right">
                  <div class="playlist" @click.stop="togglePlayList">
                    <i class="iconfont icon-pajian_gequliebiao_"></i>
                    <span>{{playList.length}}</span>
                  </div>
                </div>
              </div> 
            </div>
          </div>
        </div>
      </div>
    </transition>
    <div class="mini-player" @click="hidePlayList">
      <div class="progress">
        <el-progress :percentage="percentage" :stroke-width="2" :show-text="false" color="#48e3f6">
        </el-progress>
      </div>
      <div class="mini-content">
        <div class="left">
          <div class="avator" @click="toggleFullScreen(true)">
            <img :src="currentMusic.album && currentMusic.album.picUrl">
            <div class="hover-bg">
              <i class="iconfont icon-zhankai"></i>
            </div>
          </div>
          <div class="desc">
            <div class="name">
              <span class="music">{{currentMusic.name}}</span>
              <span v-show="currentMusic.id">&nbsp;-&nbsp;</span>
              <div class="singer">
                <span class="singer-item" v-for="(singer, index) in currentMusic.artists" :key="index">
                  {{singer.name}}
                </span>
              </div>  
            </div>
            <div class="control">
              <i class="iconfont icon-iconfontxihuan"></i>
            </div>
          </div>
        </div>
        <div class="center">
          <div class="play-mode">
            <el-popover
              placement="top"
              v-model="playModeVisible.mini"
              :visible-arrow="false">
              <play-mode-list @togglePlayMode="togglePlayMode"></play-mode-list>
              <i slot="reference" class="iconfont" :class="playModeIcon"></i>
            </el-popover>
          </div>
          <div class="play-control" @click="prev">
            <i class="iconfont icon-shangyishou"></i>
          </div>
          <div class="play-state" @click="togglePlaying">
            <i class="iconfont" :class="playIcon"></i>
          </div>
          <div class="play-control" @click="next">
            <i class="iconfont icon-xiayishou"></i>
          </div>
          <div class="play-sound">
            <i class="iconfont icon-yinliang"></i>
          </div>
        </div>
        <div class="right">
          <div class="playlist" @click.stop="togglePlayList">
            <i class="iconfont icon-pajian_gequliebiao_"></i>
            <span>{{playList.length}}</span>
          </div>
          <div class="duration">{{currentTime | formatTime}} / {{currentMusic.duration | formatTime}}</div>
        </div>
      </div>   
    </div>
    <audio ref="musicAudio" @play="ready" @ended="next" @timeupdate="updateTime" :src="musicUrl" @error="musicError"></audio>
    <transition name="right-collapse">
      <play-list v-if="playListVisible" @clearPlayList="clearPlayList"></play-list>
    </transition>
  </div>
</template>

<script>
import { formatTime } from '@/common/js/util'
import { mapGetters, mapMutations, mapActions } from 'vuex'
import { playMode, playModeIcon } from '@/common/js/config'
import { controlWindowMixin } from '@/common/js/mixin'
import { ipcRenderer } from 'electron'
import * as types from '@/store/mutation-types'
import Scroll from '@/base/scroll/scroll'
import PlayList from './play-list/play-list'
import Lyric from 'lyric-parser'
import MusicComment from './music-comment/music-comment'
import PlayModeList from './play-mode-list/play-mode-list'

const LYRIC_ITEM_HEIGHT = 34
export default {
  mixins: [controlWindowMixin],
  data() {
    return {
      onScroll: true,
      musicUrl: null,
      lyric: {},
      currentTime: 0,
      currentLyricIndex: null,
      isOpenComment: false,
      commentCount: 0,
      playModeVisible: {
        full: false,
        mini: false
      },
      fullScreenWindow: false
    }
  },
  computed: {
    playIcon() {
      return this.playing ? 'icon-bofangqi-zanting' : 'icon-bofangqi-bofang'
    },
    favorIcon() {
      return 'icon-iconfontxihuan'
    },
    playModeIcon() {
      return playModeIcon.get(this.playMode)
    },
    fullScreenWindowIcon() {
      return this.fullScreenWindow ? 'icon-quxiaoquanping' : 'icon-quanping'
    },
    fullScreenWindowTip() {
      return this.fullScreenWindow ? '退出全屏' : '全屏'
    },
    percentage() {
      return this.currentTime === 0
        ? 0
        : (this.currentTime / this.currentMusic.duration) * 100
    },
    ...mapGetters([
      'playing',
      'fullScreen',
      'currentMusic',
      'playList',
      'playListVisible',
      'currentPlayIndex',
      'playMode'
    ])
  },
  methods: {
    toggleOpenComment() {
      this.isOpenComment = !this.isOpenComment
    },
    toggleFullScreen(flag) {
      if (this.fullScreenWindow) {
        ipcRenderer.send('quit-full-screen-window')
        this.fullScreenWindow = false
      }
      this.setFullScreen(flag)
    },
    togglePlaying() {
      // 刷新第一次进入时 播放音乐地址为空
      if (this.currentMusic.id && this.musicUrl === null) {
        this.getMusicUrl()
        return
      }
      this.setPlaying(!this.playing)
      if (this.lyric) {
        this.lyric.togglePlay()
      }
    },
    togglePlayList() {
      this.setPlayListVisible(!this.playListVisible)
    },
    togglePlayMode(mode) {
      this.setPlayMode(playMode[mode])
      this.playModeVisible.full = false
      this.playModeVisible.mini = false
    },
    toggleFullScreenWindow() {
      this.fullScreenWindow
        ? ipcRenderer.send('quit-full-screen-window')
        : ipcRenderer.send('full-screen-window')
      this.fullScreenWindow = !this.fullScreenWindow
    },
    hidePlayList() {
      this.playListVisible && this.setPlayListVisible(false)
    },
    ready() {
      console.log('ready')
    },
    prev() {
      let index =
        this.currentPlayIndex === 0
          ? this.playList.length - 1
          : this.currentPlayIndex - 1
      this.setCurrentPlayIndex(index)
    },
    next() {
      let index = this.currentPlayIndex + 1
      if (index >= this.playList.length) {
        index = 0
      }
      this.setCurrentPlayIndex(index)
    },
    getMusicUrl() {
      this.currentMusic.getMusicUrl().then(res => {
        this.musicUrl = this.currentMusic.url = res.url
        this.$nextTick(() => {
          this.setPlaying(true)
          this.$refs.musicAudio.play()
          this.lyric.play()
        })
      })
    },
    getLyric() {
      this.currentMusic.getLyric().then(res => {
        this.currentMusic.lyric = res.lyric
        this.currentLyricIndex = null
        this.lyric = new Lyric(res.lyric, this.handleLyric)
        if (this.playing) {
          this.lyric.play()
        }
      })
    },
    handleLyric({ lineNum, txt }) {
      this.currentLyricIndex = lineNum
      if (lineNum < 5) {
        return
      }
      this.$refs.lyricScroll.setScrollTop(LYRIC_ITEM_HEIGHT * (lineNum - 5))
    },
    musicError() {
      this.currentMusic.url = `http://music.163.com/song/media/outer/url?id=${
        this.currentMusic.id
      }.mp3`
    },
    updateTime(e) {
      this.currentTime = e.target.currentTime * 1000
    },
    clearPlayList() {
      this.removePlayListHistory()
      this.setPlaying(false)
      this.musicUrl = null
      this.currentTime = 0
    },
    updateCommentCount(val) {
      this.commentCount = val
    },
    ...mapMutations({
      setFullScreen: types.SET_FULL_SCREEN,
      setPlayListVisible: types.SET_PLAY_LIST_VISIBLE,
      setPlaying: types.SET_PLAYING,
      setCurrentPlayIndex: types.SET_CURRENT_PLAY_INDEX,
      setPlayMode: types.SET_PLAY_MODE,
      setMaxWindow: types.SET_MAX_WINDOW_STATE
    }),
    ...mapActions(['removePlayListHistory'])
  },
  mounted() {
    if (this.currentMusic.id) {
      this.getLyric()
    }
  },
  watch: {
    currentMusic() {
      if (this.lyric) {
        this.lyric.stop()
      }
      this.$nextTick(() => {
        this.$refs.lyricScroll.setScrollTop(0)
        this.getMusicUrl()
        this.getLyric()
      })
    },
    playing(newPlaying) {
      const audio = this.$refs.musicAudio
      this.$nextTick(() => {
        newPlaying ? audio.play() : audio.pause()
      })
    }
  },
  filters: {
    formatTime,
    formatCommentCount(count) {
      if (count > 999) {
        return '999+'
      }
      return count
    }
  },
  components: {
    PlayList,
    Scroll,
    MusicComment,
    PlayModeList
  }
}
</script>

<style scoped lang="scss">
@import 'scss/variable.scss';
$proess-height: 2px;
$mini-player-bg: #0a3a4d;
$lyric-item-height: 34px;
$duration-height: 20px;
$playlist-font-size: 24px;
.player-wrapper {
  .full-player {
    z-index: 99;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
    .bg {
      position: absolute;
      width: 100%;
      height: 100%;
      filter: blur(20px);
      background-size: 120% 120%;
      background-position: center center;
      background-attachment: fixed;
      transform: scale(1.2);
      transition: background-image 1s;
    }
    .content {
      box-sizing: border-box;
      position: relative;
      display: flex;
      flex-flow: column;
      width: 100%;
      height: 100%;
      padding: 26px 26px 0 26px;
      background: rgba(0, 0, 0, 0.3);
      .header {
        display: flex;
        justify-content: space-between;
        .hide {
          .iconfont {
            font-size: $font-size-large;
            cursor: pointer;
            &:hover {
              color: $color-text-highlight;
            }
          }
        }
        .back {
          cursor: pointer;
          font-size: $font-size-medium;
          &:hover {
            color: $color-text-highlight;
          }
          .el-icon-arrow-left {
            font-size: $font-size-medium;
          }
        }
        .control {
          display: flex;
          .icon {
            margin-left: 20px;
            cursor: pointer;
            &:hover {
              color: $color-text-highlight;
            }
            .iconfont {
              font-size: $font-size-small;
            }
          }
        }
      }
      .main {
        flex: 1;
        display: flex;
        .cover-lyric {
          padding-top: 50px;
          display: flex;
          width: 100%;
          .cover-img {
            width: 50%;
            text-align: right;
            img {
              width: 280px;
              margin-top: 20%;
              margin-right: 30px;
            }
          }
          .detail {
            flex: 1;
            display: flex;
            flex-flow: column;
            height: 100%;
            padding-left: 50px;
            padding-right: 100px;
            .name {
              margin-bottom: 10px;
              font-size: $font-size-large;
            }
            .singer {
              font-size: $font-size-medium;
              color: $color-text-hint;
              .singer-item,
              .album {
                color: $color-text;
              }
            }
            .lyric {
              flex: 1;
              margin: 50px 0;
              overflow: auto;
              li {
                height: $lyric-item-height;
                line-height: $lyric-item-height;
                font-size: $font-size-medium-x;
                &.active {
                  color: $color-text-highlight;
                }
              }
            }
          }
        }
        .comment {
          display: flex;
          flex-flow: column;
          width: 100%;
          margin-bottom: 20px;
          .name {
            width: 100%;
            padding-top: 30px;
            text-align: center;
            font-size: $font-size-medium-x;
          }
          .singer {
            width: 100%;
            margin: 16px 0;
            text-align: center;
            font-size: $font-size-medium;
            color: $color-text-hint;
          }
          .comment-detail {
            flex: 1;
            display: flex;
          }
        }
      }
      .player {
        height: $player-height + $duration-height;
        .duration {
          display: flex;
          justify-content: space-between;
          height: $duration-height;
          padding: 0 4px;
          color: $color-text-hint;
        }
        .control {
          display: flex;
          margin-top: 10px;
          .left {
            display: flex;
            align-items: center;
            width: 30%;
            div {
              cursor: pointer;
              margin-right: 16px;
            }
          }
          .center {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 40%;
            div {
              .iconfont {
                cursor: pointer;
                &:hover {
                  color: $color-text-highlight;
                }
              }
            }
            .play-control {
              margin: 0 20px;
              .iconfont {
                font-size: $font-size-large;
              }
            }
            .play-state {
              .iconfont {
                font-size: $iconfont-size-mini;
              }
            }
            .play-mode {
              .iconfont {
                color: $color-text-hint;
                font-size: $font-size-large-x;
              }
            }
            .play-sound {
              .iconfont {
                color: $color-text-hint;
                font-size: 28px;
              }
            }
          }
          .right {
            display: flex;
            flex-flow: row-reverse;
            width: 30%;
            .playlist {
              display: flex;
              align-items: center;
              line-height: 0;
              color: $color-text-hint;
              cursor: pointer;
              &:hover {
                color: $color-text-highlight;
              }
              .iconfont {
                font-size: $playlist-font-size;
              }
            }
          }
        }
      }
    }
  }
  .mini-player {
    box-sizing: border-box;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    height: $player-height;
    padding: 10px 30px 10px 10px;
    background: $mini-player-bg;
    .progress {
      position: fixed;
      left: 0;
      right: 0;
      bottom: $player-height;
      height: $proess-height;
    }
    .mini-content {
      display: flex;
      height: 100%;
      .left {
        display: flex;
        height: 100%;
        width: 30%;
        .avator {
          position: relative;
          height: 100%;
          img {
            height: 100%;
          }
          .hover-bg {
            position: absolute;
            top: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 100%;
            opacity: 0;
            background: rgba(0, 0, 0, 0);
            transition: all 0.1s;
            cursor: pointer;
            &:hover {
              opacity: 1;
              background: rgba(0, 0, 0, 0.2);
            }
          }
        }
        .desc {
          padding-top: 4px;
          padding-left: 12px;
          white-space: nowrap;
          overflow: hidden;
          .name {
            display: flex;
            .music {
              cursor: pointer;
              &:hover {
                color: $color-text-highlight;
              }
            }
            .singer {
              color: $color-text-hint;
              .singer-item {
                &:hover {
                  color: $color-text-hint;
                }
              }
            }
          }
          .control {
            margin-top: 14px;
          }
        }
      }
      .center {
        display: flex;
        flex: 1;
        justify-content: center;
        align-items: center;
        div {
          margin-right: 16px;
          cursor: pointer;
          &:last-child {
            margin-right: 0;
          }
        }
        .play-mode {
          .iconfont {
            color: $color-text-hint;
            font-size: $font-size-large-x;
          }
        }
        .play-sound {
          .iconfont {
            color: $color-text-hint;
            font-size: 28px;
          }
        }
        .play-control {
          padding: 8px;
          border: 2px solid $color-text-highlight;
          border-radius: 50%;
          .iconfont {
            color: $color-text-highlight;
            font-size: $font-size-medium;
          }
        }
        .play-state {
          padding: 6px;
          border: 2px solid $color-text-highlight;
          border-radius: 50%;
          .iconfont {
            margin-right: -2px;
            color: $color-text-highlight;
            font-size: 26px;
          }
        }
      }
      .right {
        display: flex;
        flex-direction: row-reverse;
        align-items: center;
        width: 30%;
        .playlist {
          display: flex;
          align-items: center;
          line-height: 0;
          color: $color-text-highlight;
          cursor: pointer;
          .iconfont {
            font-size: $playlist-font-size;
          }
        }
        .duration {
          margin-right: 10px;
          color: $color-text-dark;
        }
      }
    }
  }

  .bottom-collapse-enter-active,
  .bottom-collapse-leave-active {
    transition: all 0.2s linear;
  }
  .bottom-collapse-enter,
  .bottom-collapse-leave-to {
    transform: translateY(100vh);
  }

  .right-collapse-enter-active,
  .right-collapse-leave-active {
    transition: all 0.3s ease;
  }
  .right-collapse-enter,
  .right-collapse-leave-to {
    transform: translateX(#{$play-list-width});
  }
}
</style>
