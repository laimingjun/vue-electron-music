<template>
  <div class='featured-wrapper'>
      <scroll>
        <swiper :banners="banners"></swiper>
        <recommend 
          :hotTags="hotTags"
          :songList="songList">
        </recommend>
      </scroll>
  </div>
</template>

<script>
import { httpGet } from '@/api/httpUtil'
import { ERR_OK, bannerUrl, hotTagUrl, recommendSongListUrl } from '@/api/config'
import Swiper from './swiper/swiper'
import Recommend from './recommend/recommend'
import Scroll from '@/base/scroll/scroll'
export default {
  data() {
    return {
      banners: [],
      hotTags: [],
      songList: []
    }
  },
  components: {
    Swiper,
    Recommend,
    Scroll
  },
  created() {
    this._getBanners()
    this._getHotTags()
    this._getRecommendSongList()
  },
  methods: {
    _getBanners() {
      httpGet(bannerUrl).then(res => {
        if (res.code === ERR_OK) {
          this.banners = res.banners
        }
      })
    },
    _getHotTags() {
      httpGet(hotTagUrl).then(res => {
        if (res.code === ERR_OK) {
          res.tags.length = 6
          this.hotTags = res.tags
        }
      })
    },
    _getRecommendSongList() {
      httpGet(recommendSongListUrl).then(res => {
        if (res.code === ERR_OK) {
          res.result.length = 24
          this.songList = res.result
        }
      })
    }
  }
}
</script>

<style lang='scss'>
@import 'scss/variable.scss';
.featured-wrapper {
  height: $music-content-height;
}
</style>
