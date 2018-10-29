<template>
  <div class='swiper-wrapper'>
    <el-carousel type='card' height='200px' trigger='click'>
      <el-carousel-item v-for="(item, index) in banners" :key="index">
        <img :src="item.imageUrl">
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  props: {
    banners: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style lang="scss">
$bg-banner: #194e60;
.swiper-wrapper {
  padding: 20px 20px 0 20px;
  background: $bg-banner;
}
</style>
