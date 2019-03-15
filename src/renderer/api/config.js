export const ERR_OK = 200

export const DEFAULT_ERR_MSG = '未知报错'

// 轮播图
export const bannerUrl = '/banner'

// 热门歌单类别
export const hotTagUrl = '/playlist/hot'

// 推荐歌单
export const recommendSongListUrl = '/personalized'

// 精选歌单
export const topSongListUrl = '/top/playlist'

// 歌单详情 :id
export const songListDetailUrl = '/playlist/detail'

// 歌单评论 :id
export const commentSongListUrl = '/comment/playlist'

// 歌单类别
export const songTagUrl = '/playlist/catlist'

// 热门评论 :id, type: 0 歌曲 1 MV 2 歌单 3 专辑 4 电台 5 视频
export const commentHotUrl = '/comment/hot'

// 评论点赞 *:id 资源id, cid: 评论id, type: 同上
export const commentLikeUrl = '/comment/like'

// 排行榜单摘要
export const topListDigestUrl = '/toplist/detail'

// 热门歌手列表
export const singerListHotUrl = '/top/artists'

// 歌手分类列表 *: cat。initial 字母索引
export const singerListUrl = '/artist/list'

// 歌手描述 *:id
export const singerDescUrl = '/artist/desc'

// 歌手单曲 *:id
export const singerMusicListUrl = '/artists'

// 歌手专辑 *:id
export const singerAlbumUrl = '/artist/album'

// 歌手MV *:id
export const singerMvUrl = '/artist/mv'

// 相似歌手 *:id
export const similarSingerUrl = '/simi/artist'

// 新歌速递 type 全部 0 华语7 欧美96 日本 8 韩国16
export const newMusicListUrl = '/top/song'

// 专辑详情 *:id
export const albumDetailUrl = '/album'

// 专辑评论 *:id
export const commentAlbumUrl = '/comment/album'

// 热搜
export const searchHotUrl = '/search/hot'

// 搜索建议 *:keywords
export const searchSuggestUrl = '/search/suggest'

// 搜索 *:keywords
export const searchUrl = '/search'

// 音乐是否可用 *id
export const checkMusicUrl = '/check/music'

// 音乐详情 *ids
export const musicDetailUrl = '/song/detail'

// 音乐url *:id
export const musicUrl = '/song/url'

// 歌词 *:id
export const lyricUrl = '/lyric'

// 音乐评论 *:id
export const commentMusicUrl = '/comment/music'

// 手机登录 *phone, password
export const loginPhoneUrl = '/login/cellphone'

// 邮箱登录 *email, password
export const loginEmailUrl = '/login'

// 登录状态
export const loginStatusUrl = '/login/status'

// 退出登录
export const logoutUrl = '/logout'

// 用户歌单 *uid
export const userSongListUrl = '/user/playlist'

// 收藏/取消收藏歌单 *id, t:操作， 1:收藏、2:取消收藏
export const songListSubscribeUrl = '/playlist/subscribe'

// 收藏/取消收藏歌手 *id t:操作, 1: 收藏、2: 取消收藏
export const singerSubscribeUrl = '/artist/sub'

// 用户喜欢歌曲列表 *uid
export const userLikeListUrl = '/likelist'

// 喜欢音乐 *id, like: true 喜欢, false 取消喜欢
export const likeMuiscUrl = '/like'

// 用户详情 *uid
export const userDetailUrl = '/user/detail'

// 用户关注列表 *uid
export const userFollowsUrl = '/user/follows'

// 用户粉丝列表 *uid
export const userFollowedUrl = '/user/followeds'

// 发送/删除评论 *t: 0 删除 、1 发送, *type：资源类型, *id: 对应资源id
export const commentUrl = '/comment'

// 关注/取消关注用户 *id, t: 0 取消关注、 1 关注
export const followUrl = '/follow'

// MV详情 *mvid
export const mvDetailUrl = '/mv/detail'

// MV Url *id
export const mvUrl = '/mv/url'

// MV 评论
export const commentMvUrl = '/comment/mv'

// 相似MV *mvid
export const similarMvUrl = '/simi/mv'

// 收藏MV *id
export const mvSubscribeUrl = '/mv/sub'