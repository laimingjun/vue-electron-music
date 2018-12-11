import {
  ERR_OK,
  topSongListUrl,
  commentHotUrl,
  commentLikeUrl,
  commentUrl
} from '@/api/config'
import {
  httpGet
} from '@/api/httpUtil'
import {
  likeType,
  commentType
} from '@/api/apiType'
import {
  mapGetters,
  mapMutations
} from 'vuex'
import * as types from '@/store/mutation-types'
import {
  ipcRenderer
} from 'electron'

export const songMixin = {
  data() {
    return {
      songList: [],
      total: 0,
      pageSize: 50,
      currentPage: 1,
      currentOrder: 'hot',
      tag: '全部'
    }
  },
  methods: {
    selectSong(id) {
      this.$router.push({
        name: 'SongDetail',
        params: {
          id
        }
      })
    },
    _getTopSongList() {
      this.songList = []
      let offset = (this.currentPage - 1) * this.pageSize
      httpGet(topSongListUrl, {
        limit: this.pageSize,
        offset,
        order: this.currentOrder,
        cat: this.tag
      }).then(res => {
        if (res.code === ERR_OK) {
          let songlist = res.playlists
          songlist.forEach(item => {
            item.picUrl = item.coverImgUrl
          })
          this.total = res.total
          this.songList = res.playlists
        }
      })
    },
    currentChange(num) {
      this.currentPage = num
      this._getTopSongList()
    }
  }
}

export const commentMixin = {
  data() {
    return {
      comments: [],
      hotComments: [],
      pageSize: 20,
      pageSizeHot: 10,
      total: 0,
      totalHot: 0,
      currentPage: 1,
      currentPageHot: 1,
      isMoreHot: false
    }
  },
  methods: {
    sendComment(comment) {
      if (comment.length < 300) {
        httpGet(commentUrl, {
          type: this.hotType,
          id: this.id,
          t: commentType.send,
          content: comment
        }).then(res => {
          if (res.code === ERR_OK) {
            this.$message({
              message: '评论成功!',
              type: 'success'
            })
            let list = [...this.comments]
            if (this.currentPage === 1) {
              list.unshift(res.comment)
            }
            if (this.total > this.currentPage) {
              list.pop()
            }
            this.comments = list
            this.total = this.total + 1
            this.$emit('addComment')
            this.$refs.commentInput.clear()
          }
        })
      }
    },
    loadHotMore() {
      this.currentPageHot = this.currentPageHot + 1
      this._getCommentHotList()
    },
    toggleHotLiked(index) {
      this.toggleLiked(index, 'hotComments')
    },
    toggleLiked(index, commentListName = 'comments') {
      let _comment = this[commentListName][index]
      httpGet(commentLikeUrl, {
        t: _comment.liked ? likeType.noLike : likeType.like,
        id: this.id,
        cid: _comment.commentId,
        type: this.hotType
      }).then(res => {
        if (res.code === ERR_OK) {
          _comment.liked = !_comment.liked
          this.$message({
            message: _comment.liked ? '点赞成功' : '取消点赞成功',
            type: 'success'
          })
          let add = _comment.liked ? 1 : -1
          _comment.likedCount += add
        }
      })
    },
    _getCommentList(commentUrl) {
      let offset = (this.currentPage - 1) * this.pageSize
      httpGet(commentUrl, {
        limit: this.pageSize,
        offset,
        id: this.id,
        timestamp: new Date().getTime()
      }).then(res => {
        if (res.code === ERR_OK) {
          this.comments = res.comments
          if (res.hotComments) {
            if (res.moreHot) {
              this._getCommentHotList()
            } else {
              this.hotComments = res.hotComments
              this.totalHot = res.hotComments.length
            }
          }
          this.total = res.total
        }
      })
    },
    _getCommentHotList() {
      let offset = (this.currentPageHot - 1) * this.pageSizeHot
      httpGet(commentHotUrl, {
        limit: this.pageSizeHot,
        offset,
        id: this.id,
        type: this.hotType,
        timestamp: new Date().getTime()
      }).then(res => {
        if (res.code === ERR_OK) {
          this.isMoreHot = res.hasMore
          this.totalHot = res.total
          this.hotComments = this.hotComments.concat(res.hotComments)
        }
      })
    }
  }
}

export const playListVisibleMixin = {
  computed: {
    ...mapGetters(['playListVisible'])
  },
  methods: {
    hidePlayList() {
      this.playListVisible && this.setPlayListVisible(false)
    },
    ...mapMutations({
      setPlayListVisible: types.SET_PLAY_LIST_VISIBLE
    })
  }
}

export const loginDialogVisibleMixin = {
  computed: {
    ...mapGetters(['userInfo'])
  },
  methods: {
    showLoginDialog() {
      if (!this.userInfo.userId) {
        this.setLoginDialogVisible(true)
      } else {
        this.$router.push({
          name: 'UserDetail',
          params: {
            uid: this.userInfo.userId
          }
        })
      }
    },
    hideLoginDialog() {
      this.setLoginDialogVisible(false)
    },
    ...mapMutations({
      setLoginDialogVisible: types.SET_LOGIN_DIALOG_VISIBLE
    })
  }
}

export const controlWindowMixin = {
  computed: {
    maxWindowIcon() {
      return this.maxWindow ? 'icon-huanyuan' : 'icon-zuidahua'
    },
    maxWindowTip() {
      return this.maxWindowIcon ? '还原' : '最大化'
    },
    ...mapGetters(['maxWindow'])
  },
  methods: {
    toggleMaxWindow() {
      this.maxWindow ? ipcRenderer.send('orignal-window') : ipcRenderer.send('max-window')
      this.setMaxWindow(!this.maxWindow)
    },
    closeWindow() {
      ipcRenderer.send('window-all-closed')
    },
    ...mapMutations({
      setMaxWindow: types.SET_MAX_WINDOW_STATE
    })
  }
}