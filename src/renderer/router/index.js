import Vue from 'vue'
import Router from 'vue-router'
const MusicTab = () => import('@/components/music-tab/music-tab')
const Featured = () => import('@/components/music-tab/featured/featured')
const Rank = () => import('@/components/music-tab/rank/rank')
const Singer = () => import('@/components/music-tab/singer/singer')
const SongPage = () => import('@/components/music-tab/song-page/song-page')
const NewMusic = () => import('@/components/music-tab/new-music/new-music')
const SongDetail = () => import('@/components/song-detail/song-detail')
const SongTag = () => import('@/components/song-tag/song-tag')
const SongByTag = () => import('@/components/song-by-tag/song-by-tag')
const SingerDetail = () => import('@/components/singer-detail/singer-detail')
const SingerMusic = () => import('@/components/singer-detail/singer-music/singer-music')
const SingerAlbum = () => import('@/components/singer-detail/singer-album/singer-album')
const SingerMv = () => import('@/components/singer-detail/singer-mv/singer-mv')
const SingerDesc = () => import('@/components/singer-detail/singer-desc/singer-desc')
const SingerSimilarity = () => import('@/components/singer-detail/singer-similarity/singer-similarity')
const AlbumDetail = () => import('@/components/album-detail/album-detail')
const SearchDetail = () => import('@/components/search-detail/search-detail')
const UserDetail = () => import('@/components/user-detail/user-detail')
const UserFollow = () => import('@/components/user-follow/user-follow')
const MvDetail = () => import('@/components/mv-detail/mv-detail')

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    redirect: '/musicTab/featured'
  }, {
    path: '/musicTab',
    component: MusicTab,
    name: 'MusicTab',
    redirect: '/musicTab/featured',
    children: [{
      path: '/',
      redirect: 'featured'
    }, {
      path: 'featured',
      component: Featured
    },
    {
      path: 'rank',
      component: Rank
    },
    {
      path: 'singer',
      component: Singer
    },
    {
      path: 'songPage',
      component: SongPage
    },
    {
      path: 'newMusic',
      component: NewMusic
    }
    ]
  }, {
    path: '/songDetail/:id',
    name: 'SongDetail',
    component: SongDetail
  }, {
    path: '/songTag',
    name: 'SongTag',
    component: SongTag
  }, {
    path: '/songByTag/:tag',
    name: 'SongByTag',
    component: SongByTag
  }, {
    path: '/singerDetail/:id',
    name: 'SingerDetail',
    component: SingerDetail,
    redirect: {
      name: 'SingerMusic'
    },
    children: [{
      path: 'music',
      name: 'SingerMusic',
      component: SingerMusic
    }, {
      path: 'album',
      name: 'SingerAlbum',
      component: SingerAlbum
    }, {
      path: 'mv',
      name: 'SingerMv',
      component: SingerMv
    }, {
      path: 'desc',
      name: 'SingerDesc',
      component: SingerDesc
    }, {
      path: 'similarity',
      name: 'SingerSimilarity',
      component: SingerSimilarity
    }]
  }, {
    path: '/albumDetail/:id',
    name: 'AlbumDetail',
    component: AlbumDetail
  }, {
    path: '/searchDetail/:keyword',
    name: 'SearchDetail',
    component: SearchDetail
  }, {
    path: '/userDetail/:uid',
    name: 'UserDetail',
    component: UserDetail
  }, {
    path: '/userFollow/:uid',
    name: 'UserFollow',
    component: UserFollow
  }, {
    path: '/mvDetail/:mvid',
    name: 'MvDetail',
    component: MvDetail
  }]
})