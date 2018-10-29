<template>
  <div class="song-tag-wrapper">
    <scroll>
      <div class="song-tag">
        <h2>全部分类</h2>
        <div class="tag-list" v-for="tag in tags" :key="tag.code">
          <div class="tag-title" :class="titleIcon">
            <i class="iconfont" :class="titleIcon[tag.code]"></i>
            <span>{{tag.title}}</span>
          </div>
          <ul>
            <li v-for="item in tag.list" :key="item.name" @click="toSongByTag(item.name)">
              <i v-if="item.hot" class="iconfont icon-hot"></i>
              {{item.name}}
            </li>
          </ul>
        </div>
      </div>
    </scroll>
  </div>
</template>

<script>
import { httpGet } from '@/api/httpUtil'
import { ERR_OK, songTagUrl } from '@/api/config'
import Scroll from '@/base/scroll/scroll'
export default {
  data() {
    return {
      tags: [],
      titleIcon: {
        0: 'icon-yuzhongguanli',
        1: 'icon-fengge',
        2: 'icon-changjing',
        3: 'icon-smile',
        4: 'icon-zhuti'
      }
    }
  },
  created() {
    this._getSongTag()
  },
  methods: {
    _getSongTag() {
      httpGet(songTagUrl).then(res => {
        if (res.code === ERR_OK) {
          this._normalizeSongTag(res)
        }
      })
    },
    _normalizeSongTag(res) {
      let tags = []
      let { categories, sub } = res
      sub.forEach(item => {
        if (!tags[item.category]) {
          tags[item.category] = {
            code: item.category,
            title: categories[item.category],
            list: []
          }
        }
        tags[item.category].list.push(item)
      })
      this.tags = tags
    },
    toSongByTag(name) {
      this.$router.push({
        name: 'SongByTag',
        params: {
          tag: name
        }
      })
    }
  },
  components: {
    Scroll
  }
}
</script>

<style scoped lang="scss">
@import 'scss/variable.scss';
$song-tag-bg: #1b4f63;
$tag-item-bg: #255568;
$tag-item-hover: #265e70;
$tag-title-width: 150px;
$tag-hot-bg: #31c27c;
.song-tag-wrapper {
  height: $music-content-height;
  background: $song-tag-bg;
  .song-tag {
    padding: 20px 30px;
    h2 {
      font-size: $font-size-large;
      letter-spacing: 4px;
      margin-bottom: 20px;
    }
    .tag-list {
      display: flex;
      margin-bottom: 10px;
      font-size: $font-size-medium;
      font-weight: bold;
      .tag-title {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: $tag-title-width;
        line-height: 40px;
        border: 1px solid $light-border-color;
        background: $tag-item-bg;
        .iconfont {
          font-size: $iconfont-size-mini;
        }
        span {
          font-size: $font-size-medium-x;
        }
      }
      ul {
        display: flex;
        flex-wrap: wrap;
        flex: 1;
        li {
          position: relative;
          width: 100px;
          height: 40px;
          line-height: 40px;
          border: 1px solid $light-border-color;
          text-align: center;
          background: $tag-item-bg;
          cursor: pointer;
          &:hover {
            background: $tag-item-hover;
          }
          .iconfont {
            position: absolute;
            top: -10px;
            left: 0;
            color: $tag-hot-bg;
            font-size: $font-size-large-x;
          }
        }
      }
    }
  }
}
</style>
