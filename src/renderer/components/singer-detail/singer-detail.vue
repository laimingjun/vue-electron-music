<template>
  <div class="singer-detail-wrapper" 
    v-loading="loading"
    element-loading-background="#0b4055">
    <scroll>
      <div class="singer-detail">
        <div class="avatar">
          <img :src="singer.img1v1Url" alt="歌手头像">
        </div>
        <div class="singer-desc">
          <div class="singer-title">
            <h3>{{singer.name}}</h3>
            <div class="btn-mini" @click="toggleFollow">
              <i class="iconfont" :class="followIcon"></i>{{followTip}}
            </div>
          </div>
          <div class="desc">
            {{singerDesc}}
          </div>      
        </div>
      </div>
      <div class="singer-tabs-container">
        <ul class="nav-tabs">
          <router-link :to="{name: 'SingerMusic'}" tag="li">热门歌曲</router-link>
          <router-link :to="{name: 'SingerAlbum'}" tag="li">
            专辑<small>{{singer.albumSize}}</small>
          </router-link>
          <router-link :to="{name: 'SingerMv', query: {mvSize: singer.mvSize}}" tag="li">
            MV<small>{{singer.mvSize}}</small>
          </router-link>
          <router-link :to="{name: 'SingerDesc'}" tag="li">详情</router-link>
          <router-link :to="{name: 'SingerSimilarity'}" tag="li">相似歌手</router-link>
        </ul>
        <div class="router-view">
          <router-view></router-view>
        </div>
      </div>
    </scroll>
  </div>
</template>

<script>
import { ERR_OK, singerMusicListUrl, singerSubscribeUrl } from '@/api/config'
import { httpGet } from '@/api/httpUtil'
import { subscribeType } from '@/api/apiType'
import Scroll from '@/base/scroll/scroll'
export default {
  data() {
    return {
      singer: {},
      singerDesc: {},
      loading: true
    }
  },
  computed: {
    id() {
      return this.$route.params.id
    },
    followIcon() {
      return this.singer.followed ? 'icon-xihuan' : 'icon-iconfontxihuan'
    },
    followTip() {
      return this.singer.followed ? '已收藏' : '收藏'
    }
  },
  methods: {
    toTab(path) {
      this.$router.push({
        path,
        query: {
          id: this.id
        }
      })
    },
    toggleFollow() {
      let t = this.singer.followed
        ? subscribeType.cancel
        : subscribeType.collect
      httpGet(singerSubscribeUrl, {
        id: this.id,
        t
      }).then(res => {
        if (res.code === ERR_OK) {
          this.singer.followed = !this.singer.followed
          this.$message({
            message: this.singer.followed ? '收藏成功' : '取消收藏成功',
            type: 'success'
          })
        }
      })
    },
    _getSingerDetail() {
      httpGet(singerMusicListUrl, {
        id: this.id
      }).then(res => {
        this.loading = false
        if (res.code === ERR_OK) {
          let str = res.artist.briefDesc
          let index = str.indexOf('。')
          this.singerDesc = str.slice(0, index + 1)
          res.artist.briefDesc.slice(0, index)
          this.singer = res.artist
        }
      })
    }
  },
  watch: {
    id: {
      immediate: true,
      handler() {
        this.loading = true
        this._getSingerDetail()
      }
    }
  },
  components: {
    Scroll
  }
}
</script>

<style scoped lang="scss">
@import 'scss/variable.scss';
$avatar-width: 150px;
$singer-bg: #0d465a;
.singer-detail-wrapper {
  height: $music-content-height;
  background: $singer-bg;
  .singer-detail {
    display: flex;
    padding: 20px 30px;
    background: $detail-bg;
    .avatar {
      margin-right: 20px;
      img {
        width: $avatar-width;
        height: $avatar-width;
        border-radius: 50%;
      }
    }
    .singer-desc {
      flex: 1;
      .singer-title {
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;
        h3 {
          font-size: $font-size-large-x;
          font-weight: bold;
        }
      }
      .desc {
        line-height: $p-line-height;
        color: $color-text-dark;
      }
    }
  }
  .singer-tabs-container {
    .nav-tabs {
      display: flex;
      height: $control-height;
      padding: 0 30px;
      li {
        line-height: $control-height;
        margin-right: 30px;
        cursor: pointer;
        &.router-link-active {
          color: $color-text-highlight;
          border-bottom: 2px solid $color-text-highlight;
        }
      }
    }
  }
  .router-view {
    border-top: 1px solid $light-border-color;
    padding: 0 30px;
    margin-top: -2px;
  }
}
</style>
