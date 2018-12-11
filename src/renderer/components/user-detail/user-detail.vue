<template>
  <div class="user-detail-wrapper">
    <scroll>
      <div class="user-detail">
        <div class="avatar">
          <img :src="userInfo.avatarUrl">
        </div>
        <div class="detail">
          <div class="title-content">
            <div class="nickname">
              {{userInfo.nickname}}
              <i class="iconfont" :class="sexIcon"></i>
              <i class="level">Lv.{{level}}</i>
            </div>
            <el-popover placement="top" width="160" v-model="logoutProver">
              <p>您确定要退出吗？</p>
              <div style="text-align: right; margin: 0">
                <el-button size="mini" type="text" @click="logoutProver = false">取消</el-button>
                <el-button type="primary" size="mini" @click="logout">确定</el-button>
              </div>
              <div
                class="logout"
                slot="reference"
                v-if="currentUserInfo.userId === userInfo.userId"
              >
                <i class="iconfont icon-guanbi"></i>退出
              </div>
            </el-popover>
          </div>
          <div class="label-group">
            <div class="label">粉丝：{{userInfo.followeds}}</div>
            <div class="label">关注: {{userInfo.follows}}</div>
          </div>
          <div class="desc">个人介绍：{{userInfo.signature}}</div>
        </div>
      </div>
    </scroll>
  </div>
</template>

<script>
import { ERR_OK, userDetailUrl, logoutUrl } from '@/api/config'
import { httpGet } from '@/api/httpUtil'
import Scroll from '@/base/scroll/scroll'
import * as types from '@/store/mutation-types'
import { mapGetters, mapMutations } from 'vuex'
export default {
  data() {
    return {
      userInfo: {},
      level: null,
      logoutProver: false
    }
  },
  computed: {
    sexIcon() {
      let gender = this.userInfo.gender
      return gender === 1 ? 'icon-nan' : gender === 2 ? 'icon-nv' : ''
    },
    userId() {
      return this.$route.params.uid
    },
    ...mapGetters({
      currentUserInfo: 'userInfo'
    })
  },
  methods: {
    logout() {
      httpGet(logoutUrl).then(res => {
        if (res.code === ERR_OK) {
          this.$message({
            message: '退出成功!',
            type: 'success'
          })
          this.setUserInfo({})
          this.setUserSongList([])
          this.setUserLikeList([])
          this.$router.push({
            name: 'MusicTab'
          })
        }
        this.logoutProver = false
      })
    },
    getUserDetail(uid) {
      httpGet(userDetailUrl, {
        uid
      }).then(res => {
        if (res.code === ERR_OK) {
          this.userInfo = res.profile
          this.level = res.level
        }
      })
    },
    ...mapMutations({
      setUserInfo: types.SET_USER_INFO,
      setUserSongList: types.SET_USER_SONG_LIST,
      setUserLikeList: types.SET_USER_LIKE_LIST
    })
  },
  created() {
    this.getUserDetail(this.$route.params.uid)
  },
  watch: {
    userId: {
      immediate: true,
      handler(newId) {
        this.getUserDetail(newId)
      }
    }
  },
  components: {
    Scroll
  }
}
</script>

<style scoped lang="scss">
@import "scss/variable.scss";
$avatar-width: 140px;
.user-detail-wrapper {
  height: $music-content-height;
  .user-detail {
    display: flex;
    padding: 30px;
    background: $detail-bg;
    .avatar {
      width: $avatar-width;
      img {
        width: 100%;
        border-radius: 50%;
      }
    }
    .detail {
      flex: 1;
      padding-left: 20px;
      .title-content {
        display: flex;
        justify-content: space-between;
        .nickname {
          font-size: $font-size-large-x;
          .iconfont {
            margin: 0 6px;
            &.icon-nan {
              color: $icon-nan-color;
            }
            &.icon-nv {
              color: $icon-nv-color;
            }
          }
          .level {
            padding: 0 8px;
            border: 1px solid $color-text-highlight;
            border-radius: 8px;
            color: $color-text-highlight;
            font-family: "Times New Roman", Times, serif;
            font-size: $font-size-medium-x;
          }
        }
        .logout {
          cursor: pointer;
          &:hover {
            color: $color-text-highlight;
          }
          .iconfont {
            margin-right: 4px;
            font-size: $font-size-small;
          }
        }
      }
      .label-group {
        display: flex;
        margin: 10px 0;
        font-size: $font-size-medium;
        .label {
          margin-right: 10px;
        }
      }
      .desc {
        font-size: $font-size-medium;
      }
    }
  }
}
</style>
