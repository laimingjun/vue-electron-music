<template>
  <div class="music-tab">
    <div class="nav">
      <router-link to="/musicTab/featured" tag="div">精选</router-link>
      <router-link to="/musicTab/singer" tag="div">歌手</router-link>
      <router-link to="/musicTab/rank" tag="div">排行</router-link>
      <router-link to="/musicTab/songPage" tag="div">分类歌单</router-link>
      <router-link to="/musicTab/newMusic" tag="div">新歌速递</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  }
}
</script>

<style scoped lang='scss'>
@import 'scss/variable.scss';

.music-tab {
  height: calc(100% - #{$control-height});
  .nav {
    display: flex;
    justify-content: center;
    height: $control-height;
    div {
      line-height: $control-height;
      margin: 0 20px;
      font-size: $font-size-medium;
      cursor: pointer;
      &:hover {
        color: $color-text-highlight;
      }
    }
    .router-link-active {
      color: $color-text-highlight;
      border-bottom: 2px solid $color-text-highlight;
    }
  }
}
</style>
