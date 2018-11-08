<template>
  <div class="singer-mv-wrapper">
    <mv-list :mvList="mvList"></mv-list>
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
import MvList from '@/base/mv-list/mv-list'
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
  },
  components: {
    MvList
  }
}
</script>

<style scoped lang="scss">
@import 'scss/variable.scss';
.singer-mv-wrapper {
  padding: 20px 0;
}
</style>
