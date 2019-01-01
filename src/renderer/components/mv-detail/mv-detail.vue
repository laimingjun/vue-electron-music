<template>
  <div class="mv-detail-wrapper" v-loading="loading" element-loading-background="#0b4055">
    <scroll ref="scroll">
      <div class="mv-video">
        <video controls :src="mvUrl"></video>
      </div>
      <div class="mv-detail">
        <h3 class="title">{{mvDetail.name}}</h3>
        <div class="desc">
          演唱：
          <span class="singer">
            <span
              class="singer-item"
              v-for="(singer, index) in mvDetail.artists"
              :key="index"
              @click="toSingerDetail(singer.id)"
            >{{singer.name}}</span>
          </span>
          <span>{{mvDetail.playCount | convertUnit}}次观看</span>
          <span>发布时间：{{mvDetail.publishTime}}</span>
          <span v-if="mvDetail.desc">简介 {{mvDetail.desc}}</span>
        </div>
      </div>
      <div class="btn-group">
        <div class="btn-mini" @click="toggleLike()">
          <i class="iconfont icon-dianzan"></i>
          {{likeTxt}}({{mvDetail.likeCount}})
        </div>
        <div class="btn-mini" @click="toggleSubscribe">
          <i class="iconfont" :class="subscribeIcon"></i>
          收藏({{mvDetail.subCount | convertUnit}})
        </div>
        <div class="btn-mini">
          <i class="iconfont icon-fenxiang"></i>
          分享({{mvDetail.shareCount | convertUnit}})
        </div>
      </div>
      <div class="mv-similar">
        <mv-list :mvList="mvList" @select="toMvDetail"></mv-list>
      </div>
      <div class="mv-comment">
        <div class="title">评论 {{mvDetail.commentCount}}</div>
        <mv-comment :id="mvid"></mv-comment>
      </div>
    </scroll>
  </div>
</template>

<script>
import { ERR_OK, DEFAULT_ERR_MSG, mvDetailUrl, mvUrl, similarMvUrl, mvSubscribeUrl } from '@/api/config'
import { httpGet } from '@/api/httpUtil'
import { subscribeType } from '@/api/apiType'
import { convertUnit } from '@/common/js/util'
import Scroll from '@/base/scroll/scroll'
import MvList from '@/base/mv-list/mv-list'
import MvComment from './mv-comment/mv-comment'
export default {
  data() {
    return {
      mvDetail: {},
      mvUrl: null,
      mvList: [],
      subed: false,
      liked: false,
      loading: false
    }
  },
  created() {
    this._getMvDetail(this.mvid)
  },
  computed: {
    mvid() {
      return parseInt(this.$route.params.mvid)
    },
    subscribeIcon() {
      return this.subed ? 'icon-xihuan' : 'icon-iconfontxihuan'
    },
    likeTxt() {
      return this.liked ? '已赞' : '赞'
    }
  },
  methods: {
    toggleLike() {
      // 获取不到 点赞标识
      this.liked = !this.liked
      this.$message({
        message: this.liked ? '点赞成功' : '取消点赞成功',
        type: 'success'
      })
    },
    toggleSubscribe() {
      httpGet(mvSubscribeUrl, {
        id: this.mvid,
        t: this.subed ? subscribeType.cancel : subscribeType.collect
      }).then(res => {
        if (res.code === ERR_OK) {
          this.subed = !this.subed
          this.$message({
            message: this.subed ? '收藏成功' : '取消收藏成功',
            type: 'success'
          })
        }
      }).catch(err => {
        this.$message({
          message: err.response.data.message || DEFAULT_ERR_MSG,
          type: 'error'
        })
      })
    },
    toSingerDetail(id) {
      if (id === 0) return false
      this.$router.push({
        name: 'SingerDetail',
        params: { id }
      })
    },
    toMvDetail(mv) {
      this.$router.push({
        name: 'MvDetail',
        params: { mvid: mv.id }
      })
    },
    _getSimilarMvList(mvid) {
      httpGet(similarMvUrl, {
        mvid
      }).then(res => {
        if (res.code === ERR_OK) {
          this.mvList = res.mvs
        }
      })
    },
    _getMvDetail(mvid) {
      this.loading = true
      httpGet(mvDetailUrl, {
        mvid
      }).then(res => {
        this.loading = false
        if (res.code === ERR_OK) {
          this.$refs.scroll.setScrollTop(0)
          this.mvDetail = res.data
          this.subed = res.subed
          this._getMvUrl(mvid)
          this._getSimilarMvList(mvid)
        }
      })
    },
    _getMvUrl(id) {
      httpGet(mvUrl, {
        id
      }).then(res => {
        if (res.code === ERR_OK) {
          this.mvUrl = res.data.url
        }
      })
    }
  },
  watch: {
    mvid(newVal) {
      this._getMvDetail(newVal)
    }
  },
  components: {
    Scroll,
    MvList,
    MvComment
  },
  filters: {
    convertUnit
  }
}
</script>

<style scoped lang="scss">
@import "scss/variable.scss";
.mv-detail-wrapper {
  height: $music-content-height;
  .mv-video {
    video {
      width: 100%;
    }
  }
  .mv-detail {
    padding: 20px 30px 0 30px;
    .title {
      margin-bottom: 10px;
      font-size: $font-size-medium-x;
      font-weight: bold;
    }
    .desc {
      flex: 1;
      padding-right: 4px;
      line-height: $p-line-height;
      color: $color-text-dark;
      .singer-item {
        color: $color-text;
      }
    }
    .full-desc {
      padding: 20px;
      pre {
        line-height: $p-line-height;
        white-space: pre-wrap;
        word-wrap: break-word;
      }
    }
  }
  .btn-group {
    display: flex;
    padding: 10px 30px;
    .btn-mini {
      margin-right: 12px;
    }
  }
  .mv-similar {
    padding: 10px 30px;
  }
  .mv-comment {
    padding: 10px 30px;
    .title {
      font-size: $font-size-medium-x;
    }
  }
}
</style>
