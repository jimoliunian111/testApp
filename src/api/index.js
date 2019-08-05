import Vue from 'vue'
import { Toast } from 'vant'
const auth = process.env.VUE_APP_AUTH
// const basurl = process.env.VUE_APP_API_URL
export function httpType (url, params, type = 'post') {
  if (type.toLowerCase() === 'post') {
    return Vue.axios.post(url, params)
  } else {
    return Vue.axios.get(url, { params })
  }
}

export function httpFunc (url, params, type = 'post', toast) {
  return httpType(url, params, type).then(res => {
    console.log('请求返回信息', res)
    if (typeof res.data === 'object' && res.data.code === 0) {
      return Promise.resolve(res.data)
    } else {
      if (!toast) {
        Toast(res.data.data[Object.keys(res.data.data)[0]][0] || res.data.message || '系统错误')
      }
      return Promise.reject(res)
    }
  }).catch(err => {
    if (!toast) {
      Toast(err.data.data[Object.keys(err.data.data)[0]][0] || err.data.message || '系统错误')
    }
    return Promise.reject(err)
  })
}

export function getConfigure (params, toast) {
  return httpFunc(`/api/v1/product/configure${auth}`, params, 'get', toast)
}
export function getDetail (params, toast) {
  return httpFunc(`/api/v1/product/distribution/detail${auth}`, params, 'get', toast)
}
// 计算保费 /api/v1/product/premium/calculate${auth}
export function getCalculate (params, toast) {
  return httpFunc(`/api/v1/product/premium/calculate${auth}`, params, 'post', toast)
}
// 属性监听 /api/v1/product/attributes${auth}
export function getAttr (params, toast) {
  return httpFunc(`/api/v1/product/attributes${auth}`, params, 'post', toast)
}
// app分享  forwardAgent: `/api/v1/product/distribution/detail/forward/agent${auth}`,
export function fetchAgent (params, toast) {
  return httpFunc(`/api/v1/product/distribution/detail/forward/agent${auth}`, params, 'post', toast)
}
// app职业/api/v1/product/profession/list${auth}
export function getProfression (params, toast) {
  return httpFunc(`/api/v1/product/profession/list${auth}`, params, 'get', toast)
}
// app投保页初始化 /api/v1/product/distribution/insure/attributes${auth}
export function getAttributes (params, toast) {
  return httpFunc(`/api/v1/product/distribution/insure/attributes${auth}`, params, 'post', toast)
}

// --------------------- wap端接口 -----------------------------
// 详情 api/v1/insurance/product/distribution/detail
export function wapGetDetail (params, toast) {
  return httpFunc(`http://h5.beta.12354.com/api/v1/insurance/product/distribution/detail${auth}`, params, 'get', toast)
}
// 监听属性 /api/v1/insurance/product/attributes
export function wapGetAttr (params, toast) {
  return httpFunc(`http://h5.beta.12354.com/api/v1/insurance/product/attributes${auth}`, params, 'post', toast)
}
