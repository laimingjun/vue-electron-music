<template>
  <!-- 右边容器 -->
  <div class='m-body'>
    <control @refresh="refresh"></control>
    <slot></slot>
  </div>
</template>

<script>
import Control from '@/components/control/control'
export default {
  components: {
    Control
  },
  methods: {
    refresh() {
      this.$emit('refresh')
    }
  }
}
</script>

<style scoped lang='scss'>
@import 'scss/variable.scss';
.m-body {
  width: calc(100% - #{$menu-width});
  height: calc(100% - #{$player-height});
  overflow: hidden;
  background: #093a4e;
}
</style>
