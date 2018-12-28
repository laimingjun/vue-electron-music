<template>
  <div class="comment-wrapper">
    <comment-input @sendComment="sendComment" ref="commentInput"></comment-input>
    <comment-list
      v-if="hotComments.length && currentPage == 1"
      title="精彩评论"
      :total="totalHot"
      :commentList="hotComments"
      @toggleLiked="toggleHotLiked"
    ></comment-list>
    <div v-if="isMoreHot" @click="loadHotMore" class="comment-hot-more">
      点击加载更多
      <i class="iconfont icon-xia"></i>
    </div>
    <comment-list title="全部评论" :total="total" :commentList="comments" @toggleLiked="toggleLiked"></comment-list>
    <div class="pages-container" v-if="total > pageSize">
      <el-pagination
        :page-size="pageSize"
        :total="total"
        layout="prev, pager, next, jumper"
        @current-change="currentChange"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { commentMvUrl } from '@/api/config'
import { commentTypeList } from '@/api/apiType'
import { commentMixin } from '@/common/js/mixin'
import CommentInput from '@/base/comment-input/comment-input'
import CommentList from '@/base/comment-list/comment-list'

export default {
  mixins: [commentMixin],
  data() {
    return {
      hotType: commentTypeList.MV_TYPE
    }
  },
  props: {
    id: Number
  },
  created() {
    this._getCommentList(commentMvUrl)
  },
  methods: {
    currentChange(num) {
      this.currentPage = num
      this.comments = []
      this._getCommentList(commentMvUrl)
    }
  },
  watch: {
    id: {
      immediate: false,
      handler() {
        this._getCommentList(commentMvUrl)
      }
    }
  },
  components: {
    CommentList,
    CommentInput
  }
}
</script>

<style scoped lang="scss">
@import "scss/variable.scss";
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
