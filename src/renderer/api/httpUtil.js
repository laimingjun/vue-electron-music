import axios from 'axios'
import {
  HOST
} from './config'

export function httpGet(url, params = {}) {
  return axios.get(`${HOST}${url}`, {
    params
  }).then((res) => {
    return Promise.resolve(res.data)
  }).catch(err => {
    return Promise.reject(err)
  })
}