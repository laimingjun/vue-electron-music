<template>
  <div class="comment-wrapper">
    <comment-input @sendComment="sendComment" :borderColor="borderColor"></comment-input>
    <comment-list 
      v-if="hotComments.length && currentPage == 1"
      title="精彩评论" 
      :total="totalHot" 
      :commentList="hotComments"
      color="#fff"
      :borderColor="borderColor">
    </comment-list>
    <div v-if="isMoreHot && currentPage === 1" @click="loadHotMore" 
      class='comment-hot-more'>
      点击加载更多<i class="iconfont icon-xia"></i>
    </div>
    <comment-list title="全部评论" color="#fff" :borderColor="borderColor"
      :total="total" :commentList="comments"></comment-list>
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
import { commentMusicUrl } from '@/api/config'
import { commentTypeList } from '@/api/apiType'
import { commentMixin } from '@/common/js/mixin'
import CommentInput from '@/base/comment-input/comment-input'
import CommentList from '@/base/comment-list/comment-list'

export default {
  mixins: [commentMixin],
  data() {
    return {
      hotType: commentTypeList.MUSIC_TYPE,
      borderColor: 'rgba(255, 255, 255, 0.2)'
    }
  },
  props: {
    id: Number
  },
  created() {
    if (this.id) {
      this._getCommentList(commentMusicUrl)
    }
  },
  methods: {
    currentChange(num) {
      this.currentPage = num
      this.comments = []
      this._getCommentList(commentMusicUrl)
    }
  },
  watch: {
    id(newVal) {
      if (this.id) {
        this.hotComments = []
        this.comments = []
        this._getCommentList(commentMusicUrl)
      }
    },
    total(newVal) {
      if (newVal > this.pageSize) {
        this.$nextTick(() => {
          document.querySelector('.pages-container').classList.add('border-fff')
        })
      }
      this.$emit('update:commentCount', newVal)
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
  padding-right: 16px;
  .comment-hot-more {
    text-align: center;
    color: $color-text-hint;
    font-size: $font-size-medium;
    cursor: pointer;
    &:hover {
      color: $color-text-highlight;
    }
  }
}
</style>
