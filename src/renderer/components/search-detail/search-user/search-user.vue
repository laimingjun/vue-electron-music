<template>
  <div class="search-user-wrapper">
    <div
      class="user-item"
      v-for="item in userprofiles"
      :key="item.userId"
      @click="toUserDetail(item.userId)"
    >
      <div class="avatar">
        <img v-lazy="item.avatarUrl">
      </div>
      <div class="content">
        <div>
          {{item.nickname}}
          <i
            class="iconfont"
            :class="item.gender === 1 ? 'icon-nan': item.gender === 2 ? 'icon-nv' : ''"
          ></i>
        </div>
        <div class="desc">{{item.signature}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    userprofiles: {
      type: Array,
      default() {
        return []
      }
    }
  },
  methods: {
    toUserDetail(uid) {
      this.$router.push({
        name: 'UserDetail',
        params: { uid }
      })
    }
  }
}
</script>

<style scoped lang="scss">
@import "scss/variable.scss";
$item-height: 70px;
$avatar-width: $item-height;
.search-user-wrapper {
  .user-item {
    display: flex;
    align-items: center;
    height: $item-height;
    padding: 16px 0;
    border-bottom: 1px solid $light-border-color;
    &:hover {
      background: $hover-bg-hint;
    }
    .avatar {
      width: $avatar-width;
      img {
        width: 100%;
      }
    }
    .content {
      display: flex;
      flex: 1;
      justify-content: space-between;
      padding-left: 10px;
      .icon-nan {
        color: $icon-nan-color;
      }
      .icon-nv {
        color: $icon-nv-color;
      }
      .desc {
        color: $color-text-dark;
      }
    }
  }
}
</style>
