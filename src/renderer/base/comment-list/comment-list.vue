<template>
  <div class="comment-list-wrapper">
    <div class="title" :style="cpBorderColor">{{title}}({{total}})</div>
    <div
      class="comment-item"
      :style="cpBorderColor"
      v-for="(comment, index) in commentList"
      :key="comment.id"
    >
      <div class="avatar">
        <img v-lazy="comment.user.avatarUrl" :key="comment.commentId">
      </div>
      <div class="container">
        <div
          class="nickname"
          @click="toUserDetail(comment.user.userId)"
          :style="fontColor"
        >{{comment.user.nickname}}</div>
        <div class="replied-content" v-if="comment.beReplied && comment.beReplied.length">
          回复
          <span
            class="replied-name"
            @click="toUserDetail(comment.beReplied[0].user.userId)"
          >@{{comment.beReplied[0].user.nickname}}</span>
          ：{{comment.beReplied[0].content}}
        </div>
        <div
          class="content"
          :class="{replied: comment.beReplied && comment.beReplied.length}"
        >{{comment.content}}</div>
        <div class="bottom">
          <div class="time" :style="fontColor">{{comment.time | formatterTime}}</div>
          <div class="control">
            <span class="like" :class="{active: comment.liked}">
              <i class="iconfont icon-dianzan" @click="toggleLiked(index)"></i>
              {{comment.likedCount}}
            </span>
            <span>
              <i class="iconfont icon-xiaoxi"></i>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { pad } from '@/common/js/util'
import * as types from '@/store/mutation-types'
import { mapGetters, mapMutations } from 'vuex'
export default {
  props: {
    total: Number,
    title: String,
    commentList: {
      type: Array,
      default() {
        return []
      }
    },
    color: String,
    borderColor: String
  },
  computed: {
    cpBorderColor() {
      return {
        borderColor: this.borderColor
      }
    },
    fontColor() {
      return {
        color: this.color
      }
    },
    ...mapGetters(['fullScreen'])
  },
  methods: {
    toggleLiked(index) {
      this.$emit('toggleLiked', index)
    },
    toUserDetail(uid) {
      if (this.fullScreen) {
        this.setFullScreen(false)
      }
      this.$router.push({
        name: 'UserDetail',
        params: { uid }
      })
    },
    ...mapMutations({
      setFullScreen: types.SET_FULL_SCREEN
    })
  },
  filters: {
    formatterTime(time) {
      let date = new Date(time)
      var year = date.getFullYear()
      let month = date.getMonth() + 1
      let day = date.getDate()
      let hour = date.getHours()
      let minutes = pad(date.getMinutes())
      let nowDate = new Date()
      var timeStr = `${month}月${day}日 ${hour}:${minutes}`
      if (year < nowDate.getFullYear()) {
        timeStr = `${year}年${timeStr}`
      }
      return timeStr
    }
  }
}
</script>

<style scoped lang="scss">
@import "scss/variable.scss";
$control-width: 76px;
$avatar-height: 50px;
.comment-list-wrapper {
  margin-bottom: 10px;
  .title {
    padding-top: 12px;
    padding-bottom: 12px;
    margin-bottom: 18px;
    border-bottom: 1px solid $light-border-color;
    font-size: $font-size-medium-x;
  }
  .comment-item {
    display: flex;
    border-bottom: 1px solid $light-border-color;
    padding: 20px 0;
    .avatar {
      width: $avatar-height;
      height: $avatar-height;
      img {
        width: $avatar-height;
        border-radius: 50%;
      }
    }
    .container {
      flex: 1;
      margin-left: 10px;
      .nickname {
        color: $color-text-dark;
        cursor: pointer;
        &:hover {
          color: $color-text-highlight;
        }
      }
      .replied-content {
        margin-top: 10px;
        line-height: $p-line-height;
        .replied-name {
          color: $color-text-highlight;
          cursor: pointer;
        }
      }
      .content {
        margin: 10px 0 10px 0;
        line-height: $p-line-height;
        &.replied {
          line-height: 30px;
          margin-left: 10px;
          padding-left: 10px;
          border-left: 1px solid $color-text;
        }
      }
      .bottom {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        .time {
          color: $color-text-dark;
        }
        .control {
          display: flex;
          justify-content: space-between;
          min-width: $control-width;
          .like {
            &.active {
              color: $color-text-highlight;
            }
            .iconfont {
              margin-right: 5px;
              cursor: pointer;
              &:hover {
                color: $color-text-highlight;
              }
            }
          }
        }
      }
    }
  }
}
</style>
