<template>
  <!-- 全屏播放器 -->
  <div class="player-wrapper">
    <transition name="bottom-collapse" appear>
      <div class="full-player" v-show="fullScreen" @click="hidePlayList">
        <div class="bg" :style="{backgroundImage: `url(${currentMusic.album.picUrl})`}"></div>
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
                <img ref="coverImg" :src="currentMusic.album.picUrl">
              </div>
              <div class="detail">
                <div class="name">{{currentMusic.name}}</div>
                <div class="singer">
                  歌手：
                  <span
                    class="singer-item"
                    v-for="(singer, index) in currentMusic.artists"
                    :key="index"
                  >{{singer.name}}</span>
                  &nbsp;&nbsp;&nbsp;专辑：
                  <span
                    class="album"
                  >{{currentMusic.album.name}}</span>
                </div>
                <div class="lyric" v-if="lyric.lines">
                  <scroll ref="lyricScroll">
                    <ul>
                      <li
                        :class="{active: currentLyricIndex === index}"
                        v-for="(item, index) in lyric.lines"
                        :key="index"
                        ref="lyricLine"
                      >{{item.txt}}</li>
                    </ul>
                  </scroll>
                </div>
                <div v-else-if="currentMusic.id" class="no-lyric">暂获取不到歌词</div>
                <div v-else class="no-lyric">让生活充满音乐~</div>
              </div>
            </div>
            <div class="comment" v-show="isOpenComment">
              <div class="name">{{currentMusic.name}}</div>
              <div class="singer">
                <span
                  class="singer-item"
                  v-for="(singer, index) in currentMusic.artists"
                  :key="index"
                >{{singer.name}}</span>
              </div>
              <div class="comment-detail">
                <scroll>
                  <music-comment :id="currentMusic.id" @update:commentCount="updateCommentCount"></music-comment>
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
              <el-slider
                v-if="fullScreen"
                v-model="percent"
                :show-tooltip="false"
                @change="changeCurrentTime"
              ></el-slider>
              <div class="control">
                <div class="left">
                  <div @click="toggleLike(currentMusic.id)">
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
                      :visible-arrow="popoverArrow"
                      v-model="playModeVisible.full"
                      popper-class="play-mode"
                    >
                      <play-mode-list @togglePlayMode="togglePlayMode"></play-mode-list>
                      <i slot="reference" class="iconfont" :class="playModeIcon"></i>
                    </el-popover>
                  </div>
                  <div class="play-control" @click="prev" :class="disableCls">
                    <i class="iconfont icon-shangyishou"></i>
                  </div>
                  <div class="play-state" @click="togglePlaying">
                    <i class="iconfont" :class="playIcon"></i>
                  </div>
                  <div class="play-control" @click="next" :class="disableCls">
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
    <!-- 底部播放器 -->
    <div class="mini-player" @click="hidePlayList">
      <div class="progress">
        <el-slider
          v-if="!fullScreen"
          v-model="percent"
          :show-tooltip="false"
          @change="changeCurrentTime"
        ></el-slider>
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
                <span
                  class="singer-item"
                  v-for="(singer, index) in currentMusic.artists"
                  :key="index"
                >{{singer.name}}</span>
              </div>
            </div>
            <div class="control" @click="toggleLike(currentMusic.id)">
              <i class="iconfont" :class="favorIcon"></i>
            </div>
          </div>
        </div>
        <div class="center">
          <div class="play-mode">
            <el-popover
              placement="top"
              v-model="playModeVisible.mini"
              :visible-arrow="popoverArrow"
              popper-class="play-mode"
            >
              <play-mode-list @togglePlayMode="togglePlayMode"></play-mode-list>
              <i slot="reference" class="iconfont" :class="playModeIcon"></i>
            </el-popover>
          </div>
          <div class="play-control" @click="prev" :class="disableCls">
            <i class="iconfont icon-shangyishou"></i>
          </div>
          <div class="play-state" @click="togglePlaying" :class="disableCls">
            <i class="iconfont" :class="playIcon"></i>
          </div>
          <div class="play-control" @click="next" :class="disableCls">
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
          <div
            class="duration"
          >{{currentTime | formatTime}} / {{currentMusic.duration | formatTime}}</div>
        </div>
      </div>
    </div>
    <transition name="right-collapse">
      <play-list v-if="playListVisible" @clearPlayList="clearPlayList" @close="hidePlayList"></play-list>
    </transition>
    <audio
      ref="musicAudio"
      @canplay="ready"
      @ended="ended"
      @timeupdate="updateTime"
      :src="musicUrl"
      @error="musicError"
    ></audio>
  </div>
</template>

<script>
import { formatTime, shuffle } from '@/common/js/util'
import { mapGetters, mapMutations, mapActions } from 'vuex'
import { playMode, playModeIcon } from '@/common/js/config'
import { httpGet } from '@/api/httpUtil'
import { ERR_OK, likeMuiscUrl } from '@/api/config'
import { controlWindowMixin } from '@/common/js/mixin'
import { ipcRenderer } from 'electron'
import * as types from '@/store/mutation-types'
import Scroll from '@/base/scroll/scroll'
import PlayList from './play-list/play-list'
import Lyric from 'lyric-parser'
import MusicComment from './music-comment/music-comment'
import PlayModeList from './play-mode-list/play-mode-list'

export default {
  mixins: [controlWindowMixin],
  data() {
    return {
      musicReady: true,
      onScroll: true,
      musicUrl: null,
      lyric: {},
      currentTime: 0,
      currentLyricIndex: 0,
      isOpenComment: false,
      commentCount: 0,
      percent: 0,
      popoverArrow: false,
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
      return this.userLikeList.includes(this.currentMusic.id) ? 'icon-xihuan' : 'icon-iconfontxihuan'
    },
    playModeIcon() {
      return playModeIcon.get(this.playMode)
    },
    disableCls() {
      return this.musicReady ? '' : 'disabled'
    },
    fullScreenWindowIcon() {
      return this.fullScreenWindow ? 'icon-quxiaoquanping' : 'icon-quanping'
    },
    fullScreenWindowTip() {
      return this.fullScreenWindow ? '退出全屏' : '全屏'
    },
    ...mapGetters([
      'playing',
      'fullScreen',
      'currentMusic',
      'playList',
      'sequenceList',
      'playListVisible',
      'currentPlayIndex',
      'playMode',
      'userLikeList'
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
      if (flag && this.lyric && this.currentLyricIndex > 5) {
        this.$nextTick(() => {
          this.$refs.lyricScroll.setScrollTop(this.$refs.lyricLine[this.currentLyricIndex - 5].offsetTop)
        })
      }
      this.setFullScreen(flag)
    },
    togglePlaying() {
      // 刷新第一次进入时 播放音乐地址为空
      if (this.currentMusic.id && this.musicUrl === null) {
        this.getMusicUrl()
        return
      }
      if (!this.musicReady) {
        return
      }
      this.setPlayingState(!this.playing)
      if (this.lyric) {
        this.lyric.togglePlay()
      }
    },
    togglePlayList() {
      this.setPlayListVisible(!this.playListVisible)
    },
    togglePlayMode(mode) {
      this.savePlayModeHistory(playMode[mode])
      this.playModeVisible.full = false
      this.playModeVisible.mini = false
      let list = null
      let index = 0
      if (playMode[mode] === playMode.random) {
        list = shuffle(this.playList)
      } else {
        list = this.sequenceList
      }
      index = list.findIndex(item => {
        return item.id === this.currentMusic.id
      })
      this.saveCurrentPlayIndexHistory(index)
      this.setPlayList(list)
    },
    toggleFullScreenWindow() {
      this.fullScreenWindow
        ? ipcRenderer.send('quit-full-screen-window')
        : ipcRenderer.send('full-screen-window')
      this.fullScreenWindow = !this.fullScreenWindow
    },
    toggleLike(id) {
      let like = !this.userLikeList.includes(id)
      httpGet(likeMuiscUrl, {
        id,
        like,
        timestamp: new Date().getTime()
      }).then(res => {
        if (res.code === ERR_OK) {
          this.$message({
            message: like ? '喜欢成功' : '取消喜欢成功',
            type: 'success'
          })
          this.userLikeList.includes(id) ? this.deleteUserLikeList(id) : this.insertUserLikeList(id)
        }
      })
    },
    hidePlayList() {
      this.playListVisible && this.setPlayListVisible(false)
    },
    ready() {
      this.musicReady = true
    },
    ended() {
      if (this.playMode === playMode.singleLoop) {
        this.singleLoop()
      } else {
        this.next()
      }
    },
    singleLoop() {
      this.$refs.musicAudio.currentTime = 0
      this.$refs.musicAudio.play()
      if (this.lyric) {
        this.lyric.seek(0)
      }
    },
    prev() {
      if (!this.musicReady) {
        return
      }
      if (this.playList.length === 1) {
        this.singleLoop()
      } else {
        let index =
          this.currentPlayIndex === 0
            ? this.playList.length - 1
            : this.currentPlayIndex - 1
        console.log('prev')
        this.saveCurrentPlayIndexHistory(index)
      }
      this.musicReady = false
    },
    next() {
      if (!this.musicReady) {
        return
      }
      if (this.playList.length === 1) {
        this.singleLoop()
      } else {
        let index = this.currentPlayIndex + 1
        if (index >= this.playList.length) {
          index = 0
        }
        console.log('next')
        this.saveCurrentPlayIndexHistory(index)
      }
      this.musicReady = false
    },
    changeCurrentTime(percent) {
      const currentTime = this.currentMusic.duration * percent / 100
      this.$refs.musicAudio.currentTime = currentTime / 1000
      if (!this.playing) {
        this.togglePlaying()
      }
      if (this.lyric) {
        this.lyric.seek(currentTime)
      }
    },
    getMusicUrl() {
      this.currentMusic.getMusicUrl().then(res => {
        if (res.code === ERR_OK) {
          this.musicUrl = this.currentMusic.url = res.url
        } else {
          this.musicUrl = null
          this.currentTime = 0
          this.musicReady = true
          console.log(res)
          this.next()
        }
      })
    },
    getLyric() {
      this.currentMusic.getLyric().then(res => {
        if (res.nolyric || (res.lrc && res.lrc.lyric === '')) {
          this.lyric = false
          this.currentMusic.lyric = false
        } else {
          this.currentMusic.lyric = res.lrc.lyric
          this.currentLyricIndex = 0
          this.lyric = new Lyric(res.lrc.lyric, this.handleLyric)
          if (this.playing) {
            this.lyric.play()
          }
        }
      })
    },
    handleLyric({ lineNum, txt }) {
      this.currentLyricIndex = lineNum
      if (lineNum < 5) {
        this.$refs.lyricScroll.setScrollTop(0)
      } else {
        if (this.$refs.lyricLine[lineNum - 5]) {
          this.$refs.lyricScroll.setScrollTop(this.$refs.lyricLine[lineNum - 5].offsetTop)
        }
      }
    },
    musicError() {
      this.musicReady = true
      this.currentMusic.url = `http://music.163.com/song/media/outer/url?id=${
        this.currentMusic.id
        }.mp3`
    },
    updateTime(e) {
      if (this.musicUrl === null) {
        return
      }
      this.currentTime = e.target.currentTime * 1000
    },
    clearPlayList() {
      this.removePlayListHistory()
      this.setPlayingState(false)
      this.musicUrl = null
      this.currentTime = 0
    },
    updateCommentCount(val) {
      this.commentCount = val
    },
    _getPosAndScale() {
      const imgEl = this.$refs.coverImg
      const targetWidth = 40
      const paddingLeft = 30
      const paddingBottom = 30
      const paddingTop = imgEl.offsetTop
      const width = 280
      const scale = targetWidth / width
      const x = -(imgEl.offsetLeft + width / 2 - paddingLeft)
      const y = window.innerHeight - paddingTop - width / 2 - paddingBottom
      return { x, y, scale }
    },
    ...mapMutations({
      setFullScreen: types.SET_FULL_SCREEN,
      setPlayListVisible: types.SET_PLAY_LIST_VISIBLE,
      setPlayingState: types.SET_PLAYING_STATE,
      setMaxWindow: types.SET_MAX_WINDOW_STATE,
      setPlayList: types.SET_PLAY_LIST
    }),
    ...mapActions(['removePlayListHistory', 'deleteUserLikeList', 'insertUserLikeList', 'savePlayModeHistory', 'saveCurrentPlayIndexHistory'])
  },
  mounted() {
    if (this.currentMusic.id) {
      this.getLyric()
    }
  },
  watch: {
    currentMusic(newMusic, oldMusic) {
      if (newMusic.id === oldMusic.id) {
        return
      }
      if (this.lyric && this.playing) {
        this.lyric.stop()
      }
      if (newMusic.id) {
        this.$nextTick(() => {
          if (this.lyric) {
            this.$refs.lyricScroll.setScrollTop(0)
          }
          this.getMusicUrl()
          this.getLyric()
        })
      }
    },
    musicUrl(newUrl) {
      if (newUrl !== null) {
        if (this.playing) {
          this.$nextTick(() => {
            this.$refs.musicAudio.play()
          })
        } else {
          this.setPlayingState(true)
          if (this.lyric) {
            this.lyric.play()
          }
        }
      }
    },
    currentTime(newTime) {
      this.percent = newTime === 0
        ? 0
        : (newTime / this.currentMusic.duration) * 100
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
@import "scss/variable.scss";
$proess-height: 2px;
$mini-player-bg: #0a3a4d;
$disable-color: #206d76 !important;
$lyric-item-height: 34px;
$duration-height: 20px;
$playlist-font-size: 24px;
$avator-width: 50px;
.player-wrapper {
  .full-player {
    z-index: 99;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
    z-index: 2001;
    .bg {
      position: absolute;
      width: 100%;
      height: 100%;
      filter: blur(20px);
      background-color: $mini-player-bg;
      background-size: 120% 120%;
      background-position: center center;
      background-attachment: fixed;
      transform: scale(1.2);
      transition: background-image 5s;
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
              margin-top: 10%;
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
                line-height: $lyric-item-height;
                font-size: $font-size-medium-x;
                &.active {
                  color: $color-text-highlight;
                }
              }
            }
            .no-lyric {
              flex: 1;
              display: flex;
              align-items: center;
              font-size: $font-size-medium-x;
              color: $color-text-highlight;
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
          width: $avator-width;
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
            cursor: pointer;
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
        .disabled {
          border-color: $disable-color;
          pointer-events: none;
          .iconfont {
            color: $disable-color;
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
    transition: all 0.3s linear;
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
