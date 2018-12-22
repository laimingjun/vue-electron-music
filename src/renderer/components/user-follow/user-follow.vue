<template>
  <div class="user-follow-wrapper">
    <scroll>
      <div class="title">
        <div class="title-txt">{{title}}</div>
        <div class="count" v-show="total > 0">共{{total}}人</div>
      </div>
      <el-row
        class="follow-list"
        v-if="total > 0"
        v-loading="loading"
        element-loading-background="#093a4e"
      >
        <el-col :md="6" :lg="4" v-for="(item, index) in followList" :key="item.userId">
          <div class="follow-item">
            <div class="avatar" @click="toUserDetail(item.userId)">
              <img v-lazy="item.avatarUrl">
            </div>
            <div class="nickname" @click="toUserDetail(item.userId)">{{item.nickname}}</div>
            <div class="btn-group">
              <div class="btn-mini">
                <span v-if="item.followed" @click="follow(item.userId, 'unfollow', index)">
                  <i class="el-icon-check"></i>已关注
                </span>
                <span v-else @click="follow(item.userId, 'follow', index)">
                  <i class="el-icon-plus"></i>关注
                </span>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
      <div v-else class="empty-tip">{{emptyTip}}</div>
      <div class="pages-container" v-if="total > pageSize">
        <el-pagination
          :page-size="pageSize"
          :total="total"
          layout="prev, pager, next, jumper"
          @current-change="currentChange"
        ></el-pagination>
      </div>
    </scroll>
  </div>
</template>

<script>
import { ERR_OK, userFollowsUrl, userFollowedUrl } from '@/api/config'
import { httpGet } from '@/api/httpUtil'
import { userFollowMixin } from '@/common/js/mixin'
import Scroll from '@/base/scroll/scroll'
export default {
  mixins: [userFollowMixin],
  data() {
    return {
      followUrl: null,
      followList: [],
      type: null,
      pageSize: 48,
      total: 0,
      pageIndex: 1,
      loading: false
    }
  },
  computed: {
    title() {
      let typeText = this.type === 'follow' ? '关注' : '粉丝'
      let nickname = this.$route.query.nickname
      return `${nickname}的${typeText}`
    },
    uid() {
      return this.$route.params.uid
    },
    emptyTip() {
      return this.type === 'follow' ? '没有关注任何用户' : '暂无人关注'
    }
  },
  created() {
    let type = this.$route.query.type
    this.total = this.$route.query.total
    this.type = type
    this.followUrl = type === 'follow' ? userFollowsUrl : userFollowedUrl
    if (this.$route.params.uid) {
      this.getFollowList()
    } else {
      this.router.push({
        name: 'MusicTab'
      })
    }
  },
  methods: {
    currentChange(index) {
      this.pageIndex = index
      this.followList = []
      this.getFollowList()
    },
    toUserDetail(uid) {
      this.$router.push({
        name: 'UserDetail',
        params: { uid }
      })
    },
    getFollowList() {
      if (this.total === 0) {
        return
      }
      this.loading = true
      let offset = (this.pageIndex - 1) * this.pageSize
      httpGet(this.followUrl, {
        uid: this.uid,
        limit: this.pageSize,
        offset,
        timestamp: new Date().getTime()
      }).then(res => {
        this.loading = false
        if (res.code === ERR_OK) {
          this.followList = res[this.type]
        }
      })
    }
  },
  components: {
    Scroll
  }
}
</script>

<style scoped lang="scss">
@import "scss/variable.scss";
$follow-item-bg: rgba(28, 86, 104, 0.5);
.user-follow-wrapper {
  height: $music-content-height;
  .title {
    padding: 30px;
    background: $detail-bg;
    .title-txt {
      margin-bottom: 10px;
      font-size: $font-size-large-x;
      font-weight: bold;
    }
    .count {
      font-size: $font-size-small;
      color: $color-text-dark;
    }
  }
  .follow-list {
    width: 100%;
    padding: 20px 0 20px 20px;
    .follow-item {
      padding: 10px 20px;
      margin-right: 20px;
      margin-bottom: 20px;
      background: $follow-item-bg;
      .avatar {
        position: relative;
        width: 100%;
        padding-bottom: 100%;
        cursor: pointer;
        img {
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }
      .nickname {
        margin: 16px 0;
        text-align: center;
        font-size: 14px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        cursor: pointer;
        &:hover {
          color: $color-text-highlight;
        }
      }
      .btn-group {
        display: flex;
        justify-content: center;
        i {
          margin-right: 2px;
        }
      }
    }
  }
  .empty-tip {
    padding-top: 10px;
    text-align: center;
    font-size: $font-size-large;
  }
  .pages-container {
    margin-bottom: 30px;
  }
}
</style>
