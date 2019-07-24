import Vue from 'vue'
const auth = process.env.VUE_APP_AUTH
export function httpFunc (url, params, type = 'post') {
  let method = {
    'get': Vue.axios.get(url, { params }),
    'post': Vue.axios.post(url, params)
  }
  return method[type.toLowerCase()].then(res => {
    console.log('请求返回信息', res)
    if (typeof res.data === 'object' && res.data.code === 0) {
      return Promise.resolve(res.data)
    } else {
      return Promise.reject(res)
    }
  }).catch(err => {
    return Promise.reject(err)
  })
}

export function getConfigure (params) {
  return httpFunc(`/api/v1/product/configure${auth}`, params, 'get')
}
export function getAppDetail (params) {
  return httpFunc(`/api/v1/product/distribution/detail${auth}`, params, 'get')
}
