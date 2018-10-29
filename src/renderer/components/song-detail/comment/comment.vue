<template>
  <div class="comment-wrapper">
    <comment-input @sendComment="sendComment"></comment-input>
    <comment-list 
      v-if="hotComments.length && currentPage == 1"
      title="精彩评论" 
      :total="totalHot" 
      :commentList="hotComments" >
    </comment-list>
    <div v-if="isMoreHot" @click="loadHotMore" class='comment-hot-more'>点击加载更多<i class="iconfont icon-xia"></i></div>
    <comment-list title="全部评论" :total="total" :commentList="comments"></comment-list>
    <div class="pages-container" v-if="total > pageSize">
      <el-pagination
        :page-size="pageSize"
        :total="total"
        layout="prev, pager, next, jumper"
        @current-change="currentChange"></el-pagination>
    </div>
  </div>
</template>

<script>
import { ERR_OK, commentSongListUrl, commentHotUrl } from '@/api/config'
import { httpGet } from '@/api/httpUtil'
import CommentInput from '@/base/comment-input/comment-input'
import CommentList from '@/base/comment-list/comment-list'

const SONG_LIST_TYPE = 2
export default {
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
  props: {
    songId: Number
  },
  created() {
    this._getCommentList()
  },
  methods: {
    currentChange(num) {
      this.currentPage = num
      this.comments = []
      this._getCommentList()
    },
    sendComment(comment) {
      console.log('发表评论：', comment)
    },
    loadHotMore() {
      this.currentPageHot = this.currentPageHot + 1
      this._getCommentHotList()
    },
    _getCommentList() {
      let offset = (this.currentPage - 1) * this.pageSize
      httpGet(commentSongListUrl, {
        limit: this.pageSize,
        offset,
        id: this.songId
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
        id: this.passData,
        type: SONG_LIST_TYPE
      }).then(res => {
        if (res.code === ERR_OK) {
          this.isMoreHot = res.hasMore
          this.totalHot = res.total
          this.hotComments = this.hotComments.concat(res.hotComments)
        }
      })
    }
  },
  components: {
    CommentList,
    CommentInput
  }
}
</script>

<style scoped lang="scss">
@import 'scss/variable.scss';
.comment-wrapper {
  padding-top: 20px;
  .comment-hot-more {
    text-align: center;
    color: $color-text-dark;
    font-size: $font-size-medium;
    cursor: pointer;
    &:hover {
      color: $color-text-highlight;
    }
  }
}
</style>
