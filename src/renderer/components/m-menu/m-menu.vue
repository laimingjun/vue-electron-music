<template>
  <!-- 左边菜单栏 -->
  <div class="menu-wrapper">
    <div class="menu-list">
      <div class="menu-item">
        <div class="menu-title">
          在线音乐
        </div>
        <ul>
          <router-link to="/musicTab" tag="li">
            <i class="iconfont icon-yinle"></i>
            <span>音乐馆</span>
          </router-link>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {}
}
</script>

<style scoped lang="scss">
@import 'scss/variable.scss';
$menu-title-color: #bee1e5;
$item-hover-color: rgba(69, 174, 187, 0.2);
.menu-wrapper {
  width: $menu-width;
  height: calc(100% - #{$player-height});
  padding: 20px;
  background: linear-gradient(#0e4357, #18808e);
  .menu-list {
    .menu-item {
      .menu-title {
        padding: 14px 0;
        color: $menu-title-color;
      }
      ul {
        li {
          padding: 6px 10px;
          border-radius: 2px;
          font-size: $font-size-medium;
          .iconfont {
            margin-right: 6px;
          }
          span {
            cursor: pointer;
          }
          &:hover,
          &.router-link-active {
            background: $item-hover-color;
          }
        }
      }
    }
  }
}
</style>
