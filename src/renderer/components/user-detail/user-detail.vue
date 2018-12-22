<template>
  <div class="user-detail-wrapper" v-loading="loading" element-loading-background="#0b4055">
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
                @click="logoutProver = true"
              >
                <i class="iconfont icon-guanbi"></i>退出
              </div>
            </el-popover>
          </div>
          <div class="label-group">
            <div
              class="label"
              @click="toUserFollow('followeds', userInfo.followeds)"
            >粉丝：{{userInfo.followeds}}</div>
            <div
              class="label"
              @click="toUserFollow('follow', userInfo.follows)"
            >关注: {{userInfo.follows}}</div>
          </div>
          <div class="desc">个人介绍：{{userInfo.signature}}</div>
          <div class="btn-group" v-show="currentUserInfo.userId !== userInfo.userId">
            <div class="btn-mini">
              <span v-if="userInfo.followed" @click="follow(userInfo.userId, 'unfollow')">
                <i class="el-icon-check"></i>已关注
              </span>
              <span v-else @click="follow(userInfo.userId, 'follow')">
                <i class="el-icon-plus"></i>关注
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="song-detail">
        <div class="title">收藏的歌单</div>
        <song-list :songList="songList" @selectSong="toSongDetail" loadingBgColor="#093a4e"></song-list>
      </div>
    </scroll>
  </div>
</template>

<script>
import { ERR_OK, userSongListUrl, userDetailUrl, logoutUrl } from '@/api/config'
import { httpGet } from '@/api/httpUtil'
import * as types from '@/store/mutation-types'
import { mapMutations } from 'vuex'
import { userFollowMixin } from '@/common/js/mixin'
import Scroll from '@/base/scroll/scroll'
import SongList from '@/base/song-list/song-list'
export default {
  mixins: [userFollowMixin],
  data() {
    return {
      userInfo: {},
      level: null,
      logoutProver: false,
      loading: false,
      songList: []
    }
  },
  computed: {
    sexIcon() {
      let gender = this.userInfo.gender
      return gender === 1 ? 'icon-nan' : gender === 2 ? 'icon-nv' : ''
    },
    userId() {
      return this.$route.params.uid
    }
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
        uid,
        timestamp: new Date().getTime()
      }).then(res => {
        this.loading = false
        if (res.code === ERR_OK) {
          this.userInfo = res.profile
          this.level = res.level
        }
      })
    },
    getUserSongList(uid) {
      httpGet(userSongListUrl, {
        uid
      }).then(res => {
        if (res.code === ERR_OK) {
          this.songList = res.playlist
        }
      })
    },
    toUserFollow(type, total) {
      this.$router.push({
        name: 'UserFollow',
        params: {
          uid: this.userId
        },
        query: {
          type,
          total,
          nickname: this.userInfo.nickname
        }
      })
    },
    toSongDetail(id) {
      this.$router.push({
        name: 'SongDetail',
        params: { id }
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
        this.loadding = true
        this.getUserDetail(newId)
        this.getUserSongList(newId)
      }
    }
  },
  components: {
    Scroll,
    SongList
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
          margin-right: 20px;
          cursor: pointer;
        }
      }
      .desc {
        margin: 14px 0;
        font-size: $font-size-medium;
      }
      .btn-group {
        display: flex;
        i {
          margin-right: 2px;
        }
      }
    }
  }
  .song-detail {
    padding: 30px;
    .title {
      font-size: $font-size-medium-x;
    }
  }
}
</style>
