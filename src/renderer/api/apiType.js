export const initial = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ#'

export const commentTypeList = {
  MUSIC_TYPE: 0,
  MV_TYPE: 1,
  SONG_LIST_TYPE: 2,
  ALBUM_TYPE: 3,
  STATION_TYPE: 4,
  VIDEO_TYPE: 5
}

export const commentType = {
  delete: 0,
  send: 1
}

export const singerCatList = [{
    name: '入驻歌手',
    code: 5001
  },
  {
    name: '华语男歌手',
    code: 1001
  },
  {
    name: '华语女歌手',
    code: 1002
  },
  {
    name: '华语组合/乐队',
    code: 1003
  },
  {
    name: '欧美男歌手',
    code: 2001
  },
  {
    name: '欧美女歌手',
    code: 2002
  },
  {
    name: '欧美组合/乐队',
    code: 2003
  },
  {
    name: '日本男歌手',
    code: 6001
  },
  {
    name: '日本女歌手',
    code: 6002
  },
  {
    name: '日本组合/乐队',
    code: 6003
  },
  {
    name: '韩国男歌手',
    code: 7001
  },
  {
    name: '韩国女歌手',
    code: 7002
  },
  {
    name: '韩国组合/乐队',
    code: 7003
  },
  {
    name: '其他男歌手',
    code: 4001
  },
  {
    name: '其他女歌手',
    code: 4002
  },
  {
    name: '其他组合/乐队',
    code: 4003
  }
]

export const newMusicTypeList = [{
  name: '全部',
  code: 0
}, {
  name: '华语',
  code: 7
}, {
  name: '欧美',
  code: 96
}, {
  name: '日本',
  code: 8
}, {
  name: '韩国',
  code: 16
}]

export const suggestTypeConvert = {
  songs: {
    title: '单曲',
    icon: 'icon-gequming'
  },
  artists: {
    title: '歌手',
    icon: 'icon-geren'
  },
  albums: {
    title: '专辑',
    icon: 'icon-zhuanji'
  },
  mvs: {
    title: '视频',
    icon: 'icon-shipin'
  },
  playlists: {
    title: '歌单',
    icon: 'icon-pajian_gequliebiao_'
  }
}

export const searchTypeList = [{
  name: '单曲',
  type: 1,
  component: 'SearchMusic'
}, {
  name: '专辑',
  type: 10,
  component: 'SearchAlbum'
}, {
  name: '歌手',
  type: 100,
  component: 'SearchSinger'
}, {
  name: '歌单',
  type: 1000,
  component: 'SearchSongList'
}, {
  name: '用户',
  type: 1002,
  component: 'SearchUser'
}, {
  name: 'mv',
  type: 1004,
  component: 'SearchMv'
}, {
  name: '歌词',
  type: 1006,
  component: 'SearcLyric'
}, {
  name: '视频',
  type: 1014,
  component: 'SearchVideo'
}]

export const subscribeType = {
  collect: 1,
  cancel: 2
}

export const likeType = {
  like: 1,
  noLike: 0
}

export const followType = {
  unfollow: 0,
  follow: 1
}