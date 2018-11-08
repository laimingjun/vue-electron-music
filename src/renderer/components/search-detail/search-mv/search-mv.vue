<template>
  <div class="search-mv-wrapper">
    <mv-list :mvList="mvs" @clickSinger="toSingerDetail"></mv-list>
  </div>
</template>

<script>
import MvList from '@/base/mv-list/mv-list'
export default {
  props: {
    mvs: {
      type: Array,
      default() {
        return []
      }
    }
  },
  methods: {
    toSingerDetail(id) {
      this.$router.push({
        name: 'SingerDetail',
        params: { id }
      })
    }
  },
  components: {
    MvList
  }
}
</script>

<style scoped lang="scss">
.search-mv-wrapper {
  padding-top: 20px;
}
</style>
