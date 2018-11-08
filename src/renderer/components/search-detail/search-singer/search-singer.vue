<template>
  <div class="search-singer-wrapper">
    <div 
      class="singer-item" 
      v-for="item in artists" 
      :key="item.id"
      @click="toSingerDetail(item.id)">
      <div class="cover-img">
        <img v-lazy="item.img1v1Url">
      </div>
      <div class='name'>
        {{item.name}}
      </div>
      <div class="hint">专辑:{{item.albumSize}}  MV:{{item.mvSize}}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    artists: {
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
  }
}
</script>

<style scoped lang="scss">
@import 'scss/variable.scss';
.search-singer-wrapper {
  display: flex;
  flex-flow: wrap;
  padding-top: 16px;
  .singer-item {
    width: 20%;
    margin-right: 6.6%;
    margin-bottom: 30px;
    text-align: center;
    &:nth-child(4n) {
      margin-right: 0;
    }
    .cover-img {
      position: relative;
      width: 100%;
      padding-bottom: 100%;
      img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    .name {
      margin: 6px 0;
      cursor: pointer;
      &:hover {
        color: $color-text-highlight;
      }
    }
    .hint {
      color: $color-text-dark;
    }
  }
}
</style>
