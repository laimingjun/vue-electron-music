<template>
  <ul class="play-mode-list">
    <li @click="togglePlayMode('random')">
      <i class="iconfont icon-suijibofang"></i>随机播放
    </li>
    <li @click="togglePlayMode('sequence')">
      <i class="iconfont icon-shunxubofang"></i>顺序播放
    </li>
    <li @click="togglePlayMode('singleLoop')">
      <i class="iconfont icon-danquxunhuan"></i>单曲循环
    </li>
    <li @click="togglePlayMode('loop')">
      <i class="iconfont icon-liebiaoxunhuan"></i>列表循环
    </li>
  </ul>
</template>

<script>
export default {
  methods: {
    togglePlayMode(mode) {
      this.$emit('togglePlayMode', mode)
    }
  }
}
</script>

<style lang="scss">
</style>
