<template>
    <el-scrollbar wrap-class="_scroll_" style="height:100%;">
      <slot></slot>
    </el-scrollbar>
</template>

<script>
const TRIGGER_SCROLL_BOTTOM_HEIGHT = 50
export default {
  props: {
    onScroll: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    if (this.onScroll) {
      let _this = this
      const scrollDom = document.querySelector('._scroll_')
      scrollDom.addEventListener('scroll', function(e) {
        if (
          scrollDom.scrollTop >
          scrollDom.scrollHeight -
            scrollDom.clientHeight -
            TRIGGER_SCROLL_BOTTOM_HEIGHT
        ) {
          _this.$emit('scrollBottom')
        }
      })
    }
  }
}
</script>

<style lang="scss">
._scroll_ {
  overflow-x: hidden !important;
}
</style>
