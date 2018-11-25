<template>
  <div class="simi-wrapper">
    <singer-list :singerList="singerList" @select="toSingerDetail"></singer-list>
  </div>
</template>

<script>
import { ERR_OK, similarSingerUrl } from '@/api/config'
import { httpGet } from '@/api/httpUtil'
import SingerList from '@/base/singer-list/singer-list'
export default {
  data() {
    return {
      singerList: []
    }
  },
  created() {
    this._getSingerSimilarity(this.$route.params.id)
  },
  methods: {
    toSingerDetail(singer) {
      this.$router.push({
        name: 'SingerDetail',
        params: {
          id: singer.id
        }
      })
    },
    _getSingerSimilarity(id) {
      httpGet(similarSingerUrl, {
        id
      }).then(res => {
        if (res.code === ERR_OK) {
          this.singerList = res.artists
        }
      })
    }
  },
  components: {
    SingerList
  }
}
</script>

<style scoped lang="scss">
@import 'scss/variable.scss';
.simi-wrapper {
  padding-top: 30px;
}
</style>
