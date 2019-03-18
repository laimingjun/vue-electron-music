<template>
  <div class="rank-wrapper"
    v-loading="loading"
    element-loading-background="#0b4055">
    <scroll>
      <el-row :gutter="24" class="rank-list">
        <el-col
          :lg="8"
          :sm="12"
          v-for="(rank, idx) in rankList"
          :key="rank.id">
          <div class="rank-item" @click="toSongDetail(rank.id)">
            <div class="cover-img"
              @mouseenter="changeCurrentHover(idx)"
              @mouseleave="changeCurrentHover(null)">
              <img v-lazy="rank.coverImgUrl" />
              <div class="cover-hover-bg" v-show="currentHoverIndex === idx">
                <div class="item-play-icon">
                  <i class="iconfont icon-play"></i>
                </div>
              </div>
              <div class="play-count">
                <i class="iconfont icon-erji"></i>{{rank.playCount | convertUnit}}
              </div>
            </div>
            <ul class="music-list">
              <li class="title">{{rank.name}}</li>
              <li class="music-item"
                v-for="(item, index) in rank.tracks" 
                :key="index">
                <span class="drak">{{index + 1}}&nbsp;&nbsp;</span>
                {{item.first}}
                <span class="drak">-{{item.second}}</span>
              </li>
            </ul>
          </div>
        </el-col>
      </el-row>
    </scroll>
  </div>
</template>

<script>
import { ERR_OK, topListDigestUrl } from '@/api/config'
import { httpGet } from '@/api/httpUtil'
import { convertUnit } from '@/common/js/util'
import Scroll from '@/base/scroll/scroll'
export default {
  data() {
    return {
      rankList: [],
      currentHoverIndex: null,
      loading: true
    }
  },
  created() {
    this._getTopListDigest()
  },
  methods: {
    changeCurrentHover(index) {
      this.currentHoverIndex = index
    },
    toSongDetail(id) {
      this.$router.push({
        name: 'SongDetail',
        params: { id }
      })
    },
    _getTopListDigest() {
      httpGet(topListDigestUrl).then(res => {
        this.loading = false
        if (res.code === ERR_OK) {
          this.rankList = res.list
        }
      })
    }
  },
  components: {
    Scroll
  },
  filters: {
    convertUnit
  }
}
</script>

<style scoped lang='scss'>
@import 'scss/variable.scss';
$rank-bg: #16465a;
$music-list-bg: #1f586e;
$music-hover-bg: #336b81;
$muisc-item-line-height: 24px;
$cover-img-height: 140px;
$cover-img-width: $cover-img-height;
.rank-wrapper {
  height: $music-content-height;
  background: $rank-bg;
  .rank-list {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    padding: 20px;
    .rank-item {
      display: flex;
      flex-wrap: wrap;
      // width: 48%;
      margin-bottom: 20px;
      cursor: pointer;
      // &:nth-child(odd) {
      //   margin-right: 4%;
      // }
      .cover-img {
        position: relative;
        width: $cover-img-width;
        height: $cover-img-height;
        img {
          width: 100%;
        }
        .cover-hover-bg {
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          .item-play-icon {
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          }
        }
        .play-count {
          position: absolute;
          left: 4px;
          bottom: 4px;
          .iconfont {
            margin-right: 4px;
          }
        }
      }
      .music-list {
        box-sizing: border-box;
        width: calc(100% - #{$cover-img-width});
        height: $cover-img-height;
        padding: 10px;
        background: $music-list-bg;
        &:hover {
          background: $music-hover-bg;
        }
        .title {
          padding: 10px 0;
          font-size: $font-size-medium;
        }
        .music-item {
          padding-left: 4px;
          line-height: $muisc-item-line-height;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          .drak {
            color: $color-text-dark;
          }
        }
      }
    }
  }
}
</style>
