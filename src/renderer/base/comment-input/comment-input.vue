<template>
  <div class="comment-input-wrapper">
    <div class="comment-div" contenteditable="true"
        ref="commentDiv"
        @focus="hidePlaceholder"
        @blur="isShowPlaceholder"
        @keyup="inputComment"></div>
      <div class="comment-placeholder" v-show="isPlaceholderShow">期待你的神评论</div>
      <div class="residue-hint" :class="{red: isInputExceed}">
        <span v-if="!isInputExceed">剩余</span>
        <span v-else>超出</span>{{inputCount}}字
      </div>
      <div class="comment-btn">
        <div class="btn-mini active" @click="sendComment">发表评论</div>
      </div>
  </div>
</template>

<script>
const INPUT_MAX_COUNT = 300
export default {
  data() {
    return {
      inputCommentVal: '',
      isPlaceholderShow: true,
      isInputExceed: false
    }
  },
  computed: {
    inputCount() {
      if (this.inputCommentVal.length < INPUT_MAX_COUNT) {
        this.isInputExceed = false
        return INPUT_MAX_COUNT - this.inputCommentVal.length
      } else {
        this.isInputExceed = true
        return this.inputCommentVal.length - INPUT_MAX_COUNT
      }
    }
  },
  methods: {
    inputComment() {
      this.inputCommentVal = this.$refs.commentDiv.innerHTML
    },
    hidePlaceholder() {
      this.isPlaceholderShow = false
    },
    isShowPlaceholder() {
      this.isPlaceholderShow = this.inputCommentVal === ''
    },
    sendComment() {
      this.$emit('sendComment', this.inputCommentVal)
    }
  }
}
</script>

<style scoped lang="scss">
@import 'scss/variable.scss';
.comment-input-wrapper {
  position: relative;
  .comment-div {
    min-height: 60px;
    line-height: $p-line-height;
    padding: 10px 10px 30px 10px;
    border: 1px solid $light-border-color;
    font-size: $font-size-medium;
    outline: 0;
    word-wrap: break-word;
    overflow-x: hidden;
    overflow-y: auto;
  }
  .comment-placeholder {
    position: absolute;
    top: 12px;
    left: 10px;
  }
  .residue-hint {
    position: absolute;
    right: 8px;
    bottom: 46px;
    font-size: $font-size-medium;
    color: $color-text-hint;
    .red {
      color: red;
    }
  }
  .comment-btn {
    display: flex;
    flex-direction: row-reverse;
    margin-top: 8px;
    padding-right: 8px;
  }
}
</style>
