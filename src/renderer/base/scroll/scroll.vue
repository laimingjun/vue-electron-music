<template>
  <el-scrollbar :wrap-class="[className, '_scroll_']" :style="defaultStyle">
    <slot></slot>
  </el-scrollbar>
</template>

<script>
var TRIGGER_SCROLL_BOTTOM_HEIGHT = 50
let num = 0
export default {
  data() {
    return {
      className: '',
      defaultStyle: {
        height: '100%',
        width: '100%'
      }
    }
  },
  props: {
    onScroll: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    setScrollTop(height) {
      const scrollDom = document.querySelector(`.${this.className}`)
      scrollDom.scrollTop = height
    }
  },
  created() {
    // 防止冲突
    num += 1
    this.className = `_${num}scroll_`
  },
  mounted() {
    let _this = this
    const scrollDom = document.querySelector(`.${this.className}`)
    if (this.onScroll) {
      scrollDom.addEventListener('scroll', function (e) {
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
