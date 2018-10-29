<template>
  <div class="singer-album-wrapper">
    <div class="singer-album-list">
      <div class="album-item" 
        v-for="(item, index) in albumList" 
        :key="item.id" 
        @click="toAlbumDetail(item.id)">
        <div class="cover-img"
          @mouseenter="changeCurrentHover(index)"
          @mouseleave="changeCurrentHover(null)">
          <img v-lazy="item.picUrl" />
          <div class="cover-hover-bg" v-show="currentHoverIndex === index">
            <div class="item-play-icon">
              <i class="iconfont icon-play"></i>
            </div>
          </div>
          <div class="date">
            {{item.publishTime | formatDateTime}}
          </div>
        </div>
        <p class="name">{{item.name}}</p>
        <p class="artists">{{item.artists | formatSingers}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { ERR_OK, singerAlbumUrl } from '@/api/config'
import { httpGet } from '@/api/httpUtil'
import { formatSingers, formatDateTime } from '@/common/js/util'
export default {
  data() {
    return {
      id: 0,
      albumList: [],
      currentHoverIndex: null
    }
  },
  created() {
    this.id = this.$route.params.id
    this._getSingerAlbum()
  },
  methods: {
    changeCurrentHover(index) {
      this.currentHoverIndex = index
    },
    toAlbumDetail(id) {
      this.$router.push({
        name: 'AlbumDetail',
        params: { id }
      })
    },
    _getSingerAlbum() {
      httpGet(singerAlbumUrl, {
        id: this.id
      }).then(res => {
        if (res.code === ERR_OK) {
          this.albumList = res.hotAlbums
        }
      })
    }
  },
  filters: {
    formatSingers,
    formatDateTime
  }
}
</script>

<style scoped lang="scss">
@import 'scss/variable.scss';
.singer-album-wrapper {
  padding: 20px 0;
  .singer-album-list {
    display: flex;
    flex-wrap: wrap;
    .album-item {
      width: 22%;
      margin-bottom: 20px;
      margin-right: 4%;
      &:nth-child(4n) {
        margin-right: 0;
      }
      .cover-img {
        position: relative;
        width: 100%;
        height: 0;
        padding-bottom: 100%;
        cursor: pointer;
        img {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
        .cover-hover-bg {
          top: 0;
          width: 100%;
          height: 100%;
          .item-play-icon {
            right: 4px;
            bottom: 4px;
          }
        }
        .date {
          position: absolute;
          left: 4px;
          bottom: 4px;
          line-height: $p-line-height;
        }
      }
      .name {
        margin-top: 6px;
        line-height: $p-line-height;
      }
      .artists {
        line-height: $p-line-height;
        color: $color-text-dark;
      }
    }
  }
}
</style>
