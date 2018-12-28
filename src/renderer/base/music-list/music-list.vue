<template>
  <div class="songs-wrapper">
    <ul class="songs-list">
      <li class="songs-item">
        <div class="name-control">歌曲</div>
        <div class="singer" v-if="showSinger">歌手</div>
        <div class="album" v-if="showAlbum">专辑</div>
        <div class="duration">时长</div>
      </li>
      <li
        class="songs-item"
        v-for="(item, index) in musicList"
        :key="index"
        @mouseenter="toggleItemHover(index)"
        @mouseleave="toggleItemHover(null)"
        @dblclick="clickItem(item, index)"
      >
        <div class="name-control">
          <div class="name-mv">
            <div class="name">
              <i class="iconfont" @click="toggleLike(item)" :class="likeIcon(item.id)"></i>
              {{item.name}}
            </div>
            <div class="mv" @click="clickMv(item.mv)" v-show="item.mv > 0">MV</div>
          </div>
          <div class="control" v-show="currentHoverIndex === index">
            <i @click="clickItem(item, index)" class="iconfont icon-bofang"></i>
          </div>
        </div>
        <div class="singer" v-if="showSinger" :title="item.ar | formatSingers">
          <span
            class="singer-item"
            v-for="(singer, index) in item.ar || item.artists"
            :key="index"
            :title="singer.id"
            @click="clickSinger(singer.id)"
          >{{singer.name}}</span>
        </div>
        <div class="album" v-if="showAlbum">
          <span :title="item | formatAlbum" @click="clickAlbum(item)">{{item | formatAlbum}}</span>
        </div>
        <div class="duration">{{item.dt || item.duration | formatTime}}</div>
      </li>
    </ul>
  </div>
</template>

<script>
import { formatSingers, formatTime } from '@/common/js/util'
import { mapGetters, mapActions } from 'vuex'
import { ERR_OK, likeMuiscUrl } from '@/api/config'
import { httpGet } from '@/api/httpUtil'
export default {
  data() {
    return {
      currentHoverIndex: null
    }
  },
  props: {
    musicList: {
      type: Array,
      default() {
        return []
      }
    },
    showSinger: {
      type: Boolean,
      default: true
    },
    showAlbum: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    ...mapGetters(['userLikeList'])
  },
  methods: {
    likeIcon(id) {
      return this.userLikeList.includes(id) ? 'icon-xihuan' : 'icon-iconfontxihuan'
    },
    clickSinger(id) {
      if (id === 0) {
        this.$alert('暂无歌手详情', '提示')
        return
      }
      this.$router.push({
        name: 'SingerDetail',
        params: { id }
      })
    },
    clickAlbum(item) {
      let id = item.al ? item.al.id : item.album ? item.album.id : ''
      this.$router.push({
        name: 'AlbumDetail',
        params: { id }
      })
    },
    clickItem(item, index) {
      this.$emit('select', item, index)
    },
    clickMv(id) {
      this.$router.push({
        name: 'MvDetail',
        params: { mvid: id }
      })
    },
    toggleItemHover(index) {
      this.currentHoverIndex = index
    },
    toggleLike(item) {
      let id = item.id
      let like = !this.userLikeList.includes(id)
      httpGet(likeMuiscUrl, {
        id,
        like,
        timestamp: new Date().getTime()
      }).then(res => {
        if (res.code === ERR_OK) {
          this.$message({
            message: like ? '喜欢成功' : '取消喜欢成功',
            type: 'success'
          })
          this.userLikeList.includes(id) ? this.deleteUserLikeList(id) : this.insertUserLikeList(id)
          this.$emit('toggleLike', item)
        }
      })
    },
    ...mapActions(['insertUserLikeList', 'deleteUserLikeList'])
  },
  filters: {
    formatSingers,
    formatTime,
    formatAlbum(item) {
      return item.al ? item.al.name : item.album ? item.album.name : ''
    }
  }
}
</script>

<style scoped lang="scss">
@import "scss/variable.scss";
$songs-height: 40px;
$songs-hover-bg: #155263;
$like-hover-color: #e45050;
$control-width: 24px;
$mv-width: 28px;
$mv-height: 16px;
$mv-bg: #ced9dc;
.songs-wrapper {
  .songs-list {
    .songs-item {
      display: flex;
      align-items: baseline;
      border-bottom: 1px solid $light-border-color;
      font-size: $font-size-small;
      &:first-child {
        cursor: default;
        border-top: 1px solid $light-border-color;
      }
      &:first-child:hover {
        background-color: rgba(0, 0, 0, 0);
      }
      &:hover {
        background-color: $songs-hover-bg;
      }
      div {
        height: $songs-height;
        line-height: $songs-height;
        padding-left: 1px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .name-control {
        flex: 1;
        padding: 0 10px;
        display: flex;
        justify-content: space-between;
        .name-mv {
          display: flex;
          align-items: center;
          .name {
            .iconfont {
              margin-right: 6px;
              cursor: pointer;
              &.icon-xihuan:hover {
                color: $like-hover-color;
              }
              &.icon-iconfontxihuan:hover {
                color: $color-text-highlight;
              }
            }
          }
          .mv {
            width: $mv-width;
            height: $mv-height;
            line-height: $mv-height;
            margin-left: 6px;
            border-radius: 2px;
            text-align: center;
            color: $color-text-dark;
            background: $mv-bg;
            transform: scale(0.9);
            cursor: pointer;
            &:hover {
              background: $white-bg;
            }
          }
        }

        .control {
          width: $control-width;
          margin-left: 10px;
          cursor: pointer;
        }
      }
      .singer {
        width: 20%;
      }
      .album {
        width: 20%;
        cursor: pointer;
        &:hover {
          color: $color-text-highlight;
        }
      }
      .duration {
        width: 6%;
      }
    }
  }
}
</style>
