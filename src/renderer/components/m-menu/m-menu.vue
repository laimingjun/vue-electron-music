<template>
  <!-- 左边菜单栏 -->
  <div class="menu-wrapper" @click="hidePlayList">
    <div class="user-info" @click="showLoginDialog">
      <div class="head-photo">
        <img :src="userInfo.avatarUrl || headPhotoSrc" />
      </div>
      <div class="name">{{userInfo.nickname || '登录网易云音乐'}}</div>
    </div>
    <div class="menu-list">
      <div class="menu-item">
        <div class="menu-title">在线音乐</div>
        <ul>
          <router-link to="/musicTab" tag="li">
            <i class="iconfont icon-yinle"></i>
            <span>音乐馆</span>
          </router-link>
        </ul>
      </div>
      <div class="menu-item" v-if="item.songList.length"
        v-for="(item, index) in categorySongList" :key="index">
        <div class="menu-title">{{item.title}}</div>
        <ul>
          <router-link 
            :to="`/songDetail/${songList.id}`" tag="li" 
            v-for="songList in item.songList" :key="songList.id">
            <i class="iconfont"
              :class="[songList.name === likeName ? 'icon-iconfontxihuan' : 'icon-yinyue']"></i>
              {{songList.name}}
          </router-link>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import {
  playListVisibleMixin,
  loginDialogVisibleMixin
} from '@/common/js/mixin'
import { httpGet } from '@/api/httpUtil'
import { ERR_OK, userSongListUrl } from '@/api/config'

export default {
  mixins: [playListVisibleMixin, loginDialogVisibleMixin],
  data() {
    return {
      headPhotoSrc: 'src/renderer/common/images/default.png',
      userSongList: [],
      likeName: '我喜欢'
    }
  },
  computed: {
    categorySongList() {
      let _arr = [
        {
          title: '创建的歌单',
          songList: []
        },
        {
          title: '收藏的歌单',
          songList: []
        }
      ]
      this.userSongList.forEach(item => {
        if (!item.subscribed) {
          _arr[0].songList.push(item)
        } else {
          _arr[1].songList.push(item)
        }
      })
      return _arr
    }
  },
  watch: {
    userInfo(newVal) {
      if (newVal.userId) {
        httpGet(userSongListUrl, {
          uid: newVal.userId
        }).then(res => {
          if (res.code === ERR_OK) {
            res.playlist[0].name = this.likeName
            this.userSongList = res.playlist
          }
        })
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import 'scss/variable.scss';
$menu-title-color: #bee1e5;
$item-hover-color: rgba(69, 174, 187, 0.2);
$head-photo-width: 40px;
.menu-wrapper {
  width: $menu-width;
  height: calc(100% - #{$player-height});
  padding: 20px;
  background: linear-gradient(#0e4357, #18808e);
  .user-info {
    display: flex;
    align-items: center;
    .head-photo {
      width: $head-photo-width;
      margin-right: 6px;
      img {
        width: 100%;
        border-radius: 50%;
      }
    }
  }
  .menu-list {
    .menu-item {
      .menu-title {
        padding: 14px 0;
        color: $menu-title-color;
      }
      ul {
        li {
          padding: 6px 10px;
          border-radius: 2px;
          margin-bottom: 4px;
          font-size: $font-size-medium;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          .iconfont {
            margin-right: 6px;
          }
          span {
            cursor: pointer;
          }
          &:hover,
          &.router-link-active {
            background: $item-hover-color;
          }
        }
      }
    }
  }
}
</style>
