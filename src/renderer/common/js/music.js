import {
  ERR_OK,
  musicUrl,
  lyricUrl,
  checkMusicUrl
} from '@/api/config'
import {
  httpGet
} from '@/api/httpUtil'

export class Music {
  constructor({
    id,
    artists,
    album,
    name,
    duration
  }) {
    this.id = id
    this.artists = artists
    this.album = album
    this.name = name
    this.duration = duration
  }

  getLyric() {
    if (this.lyric) {
      return Promise.resolve(this.lyric)
    }
    return new Promise((resolve, reject) => {
      httpGet(lyricUrl, {
        id: this.id
      }).then((res) => {
        if (res.code === ERR_OK) {
          resolve(res)
        }
      })
    })
  }

  getMusicUrl() {
    if (this.url) {
      return Promise.resolve(this.url)
    }
    return httpGet(musicUrl, {
      id: this.id
    }).then(res => {
      if (res.code === ERR_OK) {
        return Promise.resolve(res.data[0])
      }
    })
  }

  checkMusic() {
    return httpGet(checkMusicUrl, {
      id: this.id
    }).then(res => {
      return Promise.resolve(res)
    }).catch(err => {
      return Promise.reject(err)
    })
  }
}

export function createMusic(music) {
  return new Music({
    id: music.id,
    artists: music.ar,
    album: music.al,
    name: music.name,
    duration: music.dt
  })
}