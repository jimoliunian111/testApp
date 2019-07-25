import Vue from 'vue'
const auth = process.env.VUE_APP_AUTH
// const basurl = process.env.VUE_APP_API_URL
export function httpType (url, params, type = 'post') {
  if (type.toLowerCase() === 'post') {
    return Vue.axios.post(url, params)
  } else {
    return Vue.axios.get(url, { params })
  }
}

export function httpFunc (url, params, type = 'post') {
  return httpType(url, params, type).then(res => {
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
