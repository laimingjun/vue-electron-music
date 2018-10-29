<template>
  <div id="app">
    <m-menu></m-menu>
    <m-body @refresh="refresh">
      <router-view v-if="isRefresh"></router-view>
    </m-body>
    <player></player>
  </div>
</template>

<script>
import MMenu from '@/components/m-menu/m-menu'
import Player from '@/components/player/player'
import MBody from '@/components/m-body/m-body'

export default {
  name: 'vue-electron-music',
  data() {
    return {
      isRefresh: true
    }
  },
  methods: {
    refresh() {
      this.isRefresh = false
      this.$nextTick(() => {
        this.isRefresh = true
      })
    }
  },
  components: {
    MMenu,
    Player,
    MBody
  }
}
</script>

<style lang='scss'>
@import 'scss/variable.scss';
@import 'scss/common.scss';
#app {
  display: flex;
  width: 100%;
  height: 100%;
  font-size: $font-size-small;
}
</style>
