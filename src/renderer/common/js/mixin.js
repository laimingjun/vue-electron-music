import {
  ERR_OK,
  topSongListUrl
} from '@/api/config'
import {
  httpGet
} from '@/api/httpUtil'

export const songMixin = {
  data() {
    return {
      songList: [],
      total: 0,
      pageSize: 50,
      currentPage: 1,
      currentOrder: 'hot',
      tag: '全部'
    }
  },
  methods: {
    selectSong(id) {
      this.$router.push({
        name: 'SongDetail',
        params: {
          id
        }
      })
    },
    _getTopSongList() {
      this.songList = []
      let offset = (this.currentPage - 1) * this.pageSize
      httpGet(topSongListUrl, {
        limit: this.pageSize,
        offset,
        order: this.currentOrder,
        cat: this.tag
      }).then(res => {
        if (res.code === ERR_OK) {
          let songlist = res.playlists
          songlist.forEach(item => {
            item.picUrl = item.coverImgUrl
          })
          this.total = res.total
          this.songList = res.playlists
        }
      })
    },
    currentChange(num) {
      this.currentPage = num
      this._getTopSongList()
    }
  }
}