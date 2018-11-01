<template>
  <div class="album-desc-wrapper">
    <div class="album-item">
      <div class="title">专辑名：</div>
      <div class="content">{{album.name}}</div>
    </div>
    <div class="album-item">
      <div class="title">歌手</div>
      <div class="singer white">
        <span class="singer-item" 
          v-for="singer in album.artists" 
          :key="singer.id"
          @click="toSingerDetail(singer.id)">
          {{singer.name}}
        </span>
      </div>
    </div>
    <div class="album-item">
      <div class="title">发行时间：</div>
      <div class="content">{{album.publishTime | formatDateTime}}</div>
    </div>
    <div class="album-item">
      <div class="title">唱片公司：</div>
      <div class="content">{{album.company}}</div>
    </div>
    <div class="album-item">
      <div class="title">类型：</div>
      <div class="content">{{album.type}}</div>
    </div>
    <div class="album-item">
      <div class="title">简介：</div>
      <div class="content">{{album.description || '暂无简介'}}</div>
    </div>
  </div>
</template>

<script>
import { formatDateTime } from '@/common/js/util'
export default {
  props: {
    album: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    toSingerDetail(id) {
      this.$router.push({
        name: 'SingerDetail',
        params: { id }
      })
    }
  },
  filters: {
    formatDateTime
  }
}
</script>

<style scoped lang="scss">
@import 'scss/variable.scss';
$desc-title: 80px;
.album-desc-wrapper {
  .album-item {
    display: flex;
    line-height: $p-line-height;
    margin: 12px 0;
    font-size: $font-size-medium;
    .title {
      width: $desc-title;
    }
    .content {
      flex: 1;
      color: $color-text-dark;
    }
    .white {
      color: $color-text;
    }
  }
}
</style>
