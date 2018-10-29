<template>
  <div class="singer-desc-wrapper">
    <div class="desc">{{desc}}</div>
    <div class="introduction-item" v-for="(item, index) in introduction" :key="index">
      <h3 class="title">{{item.ti}}</h3>
      <pre class="content">{{item.txt}}</pre>
    </div>
  </div>
</template>

<script>
import { ERR_OK, singerDescUrl } from '@/api/config'
import { httpGet } from '@/api/httpUtil'
export default {
  data() {
    return {
      desc: '',
      introduction: ''
    }
  },
  created() {
    this._getSingerDesc(this.$route.params.id)
  },
  methods: {
    _getSingerDesc(id) {
      httpGet(singerDescUrl, {
        id
      }).then(res => {
        if (res.code === ERR_OK) {
          this.desc = res.briefDesc
          this.introduction = res.introduction
        }
      })
    }
  }
}
</script>

<style scoped lang='scss'>
@import 'scss/variable.scss';
.singer-desc-wrapper {
  padding: 20px 0;
  line-height: $p-line-height;
  color: $color-text-dark;
  .title {
    padding: 10px 0;
    font-size: $font-size-medium-x;
    color: $color-text;
  }
  .content {
    white-space: pre-wrap;
  }
}
</style>
