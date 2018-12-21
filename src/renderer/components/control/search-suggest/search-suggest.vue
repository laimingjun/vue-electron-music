<template>
  <div class="search-suggest-wrapper" @click="clickWrapper">
    <div class="suggest-item" v-for="(title, index) in order" :key="index">
      <div class="title">
        <i class="iconfont" :class="suggestTypeConvert[title].icon"></i>
        {{suggestTypeConvert[title].title}}
      </div>
      <ul>
        <li
          @click.stop="handleSuggest(item.name)"
          v-for="item in suggestList[title]"
          :key="item.id"
        >
          {{item.name}}
          <span
            v-if="title === 'songs' || title === 'albums'"
          >- {{item | formatArtist}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { suggestTypeConvert } from '@/api/apiType'
export default {
  data() {
    return {
      order: [],
      suggestTypeConvert
    }
  },
  props: {
    suggestList: Object
  },
  methods: {
    handleSuggest(keyword) {
      this.$emit('clickSuggest', keyword)
    },
    clickWrapper() {
      this.$emit('clickWrapper')
    }
  },
  watch: {
    suggestList: {
      immediate: true,
      handler() {
        this.order = this.suggestList.order
      }
    }
  },
  filters: {
    formatArtist(obj) {
      if (obj.artist) {
        return obj.artist.name
      }
      if (obj.artists.length >= 1) {
        return obj.artists[0].name
      }
      return ''
    }
  }
}
</script>

<style scoped lang="scss">
@import "scss/variable.scss";
$li-height: 26px;
$search-wrapper-width: 260px;
.search-suggest-wrapper {
  width: $search-wrapper-width;
  border-radius: 2px;
  .suggest-item {
    .title {
      height: $li-height;
      line-height: $li-height;
      padding-left: 4px;
      background: #f7f7f7;
      cursor: pointer;
    }
    li {
      padding-left: 24px;
      height: $li-height;
      line-height: $li-height;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      &:hover {
        background: rgba($color: #eee, $alpha: 0.8);
      }
    }
  }
}
</style>
