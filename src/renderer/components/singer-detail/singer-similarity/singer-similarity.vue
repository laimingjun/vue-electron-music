<template>
  <div>需要登录</div>
</template>

<script>
import { ERR_OK, similarSingerUrl } from '@/api/config'
import { httpGet } from '@/api/httpUtil'
export default {
  data() {
    return {
      similarityList: []
    }
  },
  created() {
    // this._getSingerSimilarity(this.$route.params.id)
  },
  methods: {
    _getSingerSimilarity(id) {
      httpGet(similarSingerUrl, {
        id
      }).then(res => {
        if (res.code === ERR_OK) {
          console.log(res)
        }
      })
    }
  }
}
</script>

<style>
</style>
