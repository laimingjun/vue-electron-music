<template>
  <div class="singer-mv-wrapper">
    <div class="singer-mv-list">
      <div class="singer-mv-item" v-for="(item, index) in mvList" :key="item.id">
        <div class="cover-img"
          @mouseenter="changeCurrentHover(index)"
          @mouseleave="changeCurrentHover(null)">
          <img v-lazy="item.imgurl16v9">
          <div class="cover-bg-hover" v-show="currentHoverIndex === index">
            <div class="cover-play-icon">
              <i class="iconfont icon-play"></i>
            </div>
          </div>
          <div class="play-count">
            <div class="play-count-icon">
              <i class="iconfont icon-shipin"></i>
              {{item.playCount | convertUnit}}人播放
            </div>
          </div>
        </div>
        <div class="time">{{item.publishTime}}</div>
        <div class="name" :title="item.name">{{item.name}}</div>
      </div>
    </div>
    <div class="pages-container" v-show="total > pageSize">
      <el-pagination
        :page-size="pageSize"
        :total="total"
        layout="prev, pager, next"
        @current-change="pageChange">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { ERR_OK, singerMvUrl } from '@/api/config'
import { httpGet } from '@/api/httpUtil'
import { convertUnit } from '@/common/js/util'
export default {
  data() {
    return {
      id: null,
      mvList: [],
      pageSize: 40,
      total: 0,
      currentIndex: 1,
      currentHoverIndex: null
    }
  },
  created() {
    this.total = this.$route.query.mvSize
    this.id = this.$route.params.id
    this._getSingerMv()
  },
  methods: {
    pageChange(num) {
      this.currentIndex = num
      this.mvList = []
      this._getSingerMv()
    },
    changeCurrentHover(index) {
      this.currentHoverIndex = index
    },
    _getSingerMv() {
      let offset = (this.currentIndex - 1) * this.pageSize
      httpGet(singerMvUrl, {
        id: this.id,
        limit: this.pageSize,
        offset
      }).then(res => {
        if (res.code === ERR_OK) {
          this.mvList = res.mvs
        }
      })
    }
  },
  filters: {
    convertUnit
  }
}
</script>

<style scoped lang="scss">
@import 'scss/variable.scss';
.singer-mv-wrapper {
  padding: 20px 0;
  .singer-mv-list {
    display: flex;
    flex-wrap: wrap;
    line-height: $p-line-height;
    .singer-mv-item {
      width: 23%;
      margin-right: 2.5%;
      margin-bottom: 10px;
      &:nth-child(4n) {
        margin-right: 0;
      }
      .cover-img {
        position: relative;
        width: 100%;
        height: 0;
        padding-bottom: 9/16 * 100%;
        cursor: pointer;
        img {
          position: absolute;
          width: 100%;
          height: 100%;
        }
        .cover-bg-hover {
          display: flex;
          align-items: center;
          justify-content: center;
          position: absolute;
          top: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(#000, 0);
          transition: background-color 0.3s;
          &:hover {
            background-color: rgba(#000, 0.2);
          }
          .cover-play-icon {
            transform: translateY(10px);
            &:hover {
              color: $color-text-highlight;
              transition: color 0.3s;
            }
            .iconfont {
              font-size: $iconfont-size-medium-x;
            }
          }
        }
        .play-count {
          position: absolute;
          left: 4px;
          bottom: 4px;
        }
      }
      .name {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
}
</style>
