<template>
  <!-- 右边容器 -->
  <div class='m-body' @click="hidePlayList">
    <control @refresh="refresh"></control>
    <slot></slot>
  </div>
</template>

<script>
import { playListVisibleMixin } from '@/common/js/mixin'
import Control from '@/components/control/control'
export default {
  mixins: [playListVisibleMixin],
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
