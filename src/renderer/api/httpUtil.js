import axios from 'axios'

export function httpGet(url, params = {}) {
  return axios.get(`${axios.defaults.baseHost}${url}`, {
    params
  }).then((res) => {
    return Promise.resolve(res.data)
  }).catch(err => {
    return Promise.reject(err)
  })
}