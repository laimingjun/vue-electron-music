import {
  ERR_OK,
  topSongListUrl,
  commentHotUrl
} from '@/api/config'
import {
  httpGet
} from '@/api/httpUtil'

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
      console.log('发表评论：', comment)
    },
    loadHotMore() {
      this.currentPageHot = this.currentPageHot + 1
      this._getCommentHotList()
    },
    _getCommentList(commentUrl) {
      let offset = (this.currentPage - 1) * this.pageSize
      httpGet(commentUrl, {
        limit: this.pageSize,
        offset,
        id: this.id
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
        type: this.hotType
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