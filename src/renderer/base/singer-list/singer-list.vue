<template>
  <div class="singer-list-wrapper">
    <div class="singer-item" v-for="item in singerList" :key="item.id" @click="selectItem(item)">
        <img v-lazy="item.img1v1Url">
        <p>{{item.name}}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    singerList: {
      type: Array,
      default() {
        return []
      }
    }
  },
  methods: {
    selectItem(item) {
      this.$emit('select', item)
    }
  }
}
</script>

<style scoped lang="scss">
@import 'scss/variable.scss';
$singer-item-width: 18.6%;
$singer-item-bg: rgba(28, 86, 104, 0.5);
.singer-list-wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  .singer-item {
    box-sizing: border-box;
    width: $singer-item-width;
    padding: 16px;
    margin-bottom: 16px;
    background: $singer-item-bg;
    text-align: center;
    cursor: pointer;
    img {
      width: 100%;
      border-radius: 50%;
    }
    p {
      margin-top: 8px;
      font-size: $font-size-medium;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      &:hover {
        color: $color-text-highlight;
      }
    }
  }
}
</style>
