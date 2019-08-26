// 本文件代码内容用于添加产品
// 实现流程：一、判断公司产品是否存在->：
// 1、仅存在公司，在公司目录下创建相关产品；存在公司和产品，返回提示
// 2、不存在公司则也无存在产品  创建公司目录以及产品目录
// 二、创建相关模块： 入口main.js 路由router.js 初始页面（以输入产品名命名） 创建运行的配置 pagesConf.js里的信息
// 若要开启调试模式， 请在package.json模式相对应命令里添加语句：  --inspect-brk
const readline = require('readline');
const fs = require('fs');
const pagesConf = require('./pagesConf.js')
const filePath = './src/products'
let terminal = 'app'

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// 判断有没有公司
function hadCompany (keyword, mypath = './src/products') {
  const items = fs.readdirSync(mypath);
  return items.some((item) => item === keyword.split('_')[0])
}

// 判断有无产品
function hadProduct (keyword, mypath = './src/products') {
  const items = fs.readdirSync(mypath + '/' + keyword.split('_')[0]);
  return items.some((item) => item === keyword.split('_')[1])
}

// 判断是否有终端
function hadTerminal (keyword, mypath = './src/products') {
  const items = fs.readdirSync(mypath + '/' + keyword.split('_')[0] + '/' + keyword.split('_')[1]);
  return items.some((item) => item === terminal)
}

// 根据传的关键字创建公司目录
function setCompany (keyword, mypath = './src/products') {
  console.log('正在创建公司目录...')
  fs.mkdirSync(mypath + '/' + keyword.split('_')[0])
  console.log('创建公司目录成功！')
}

// 创建产品目录
function setProduct (keyword, mypath = './src/products') {
  console.log('正在创建产品目录...')
  fs.mkdirSync(mypath + '/' + keyword.split('_')[0] + '/' + keyword.split('_')[1])
  console.log('创建产品目录成功！')
}

// 创建终端类型目录
function setTerminal (type, keyword, mypath = './src/products') {
  console.log('正在创建终端类型目录...')
  fs.mkdirSync(mypath + '/' + keyword.split('_')[0] + '/' + keyword.split('_')[1] + '/' + type)
  console.log('创建终端类型目录成功！')
}

// 创建产品独立入口文件main.js
function setProductMainjs(keyword, mypath = './src/products') {
  console.log('正在创建产品独立入口文件main.js...')
  let arr = keyword.split('_')
  let path = `${mypath}/${arr[0]}/${arr[1]}/${terminal}/main.js`
  mainConf = `import Vue from 'vue'
import App from '@/App.vue'
import router from './router'
import store from './store/index'
import axios from '@/plugins/axios.js'
import '@/common.js'
import '@/assets/styles/common.scss'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  App,
  axios,
  render: h => h(App)
}).$mount('#app')
`
  fs.writeFileSync(path, mainConf)

  console.log('创建main.js成功！')
}

// 创建存储模块
function setStateModule (keyword, mypath = './src/products') {
  fs.mkdirSync(mypath + '/' + keyword.split('_')[0] + '/' + keyword.split('_')[1] + '/' + terminal + '/store')
  let str = `import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from '@/store/actions'
import * as getters from '@/store/getters'
import commonStore from '@/store/index.js'

Vue.use(Vuex)

const state = {
  pariceStatus: -5
}

export default new Vuex.Store({
  actions,
  getters,
  state,
  modules: {
    ...commonStore
  }
})
`
  let arr = keyword.split('_')
  let path = `${mypath}/${arr[0]}/${arr[1]}/${terminal}/store/index.js`
  fs.writeFileSync(path, str)
}

// 创建独立路由
function setProductRouter (keyword, mypath = './src/products') {
  console.log('正在创建产品独立router.js...')
  let arr = keyword.split('_')
  let path = `${mypath}/${arr[0]}/${arr[1]}/${terminal}/router.js`
  let data =
`import Vue from 'vue'
import Router from 'vue-router'
import ${arr[1]} from './${arr[1]}.vue'
Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: '${arr[1]}',
      meta: {
        title: '${keyword}'
      },
      component: ${arr[1]}
    }
  ]
})
router.beforeEach((to, from, next) => {
  const { title } = to.meta
  title && (document.title = title)
  next()
})
export default router
`
  fs.writeFileSync(path, data)
  console.log('创建router.js成功！')
}

// 创建vue文件
function setProductPage (keyword, mypath = './src/products') {
  console.log('正在创建产品独立页面...')
  let data = `<template>
  <div>${keyword}</div>
</template>
<script>
export default {
  name: '${keyword}'
}
</script>
<style>
</style>`
  let arr = keyword.split('_')
  let path = `${mypath}/${arr[0]}/${arr[1]}/${terminal}/${arr[1]}.vue`

  fs.writeFileSync(path, data)
  console.log('创建页面成功！')
}

// 创建打包配置
function setBuildConf (keyword, mypath = './utils/pagesConf.js') {
  // pagesConf
  console.log('正在创建打包配置...')
  let arr = keyword.split('_')
  if (!pagesConf[keyword]) {
    pagesConf[keyword] = {}
  }
  pagesConf[keyword][terminal] = {
    entry: `src/products/${arr[0]}/${arr[1]}/${terminal}/main.js`,
    template: `src/public/index.html`,
    filename: `index.html`,
    chunks: ["chunk-vendors", "chunk-common", keyword]
  }
  let data =
  `module.exports = ${JSON.stringify(pagesConf, null, 2)}`

  fs.writeFileSync(mypath, data)
  console.log('打包配置创建成功...')
  console.log('产品：' + keyword + '添加成功')
}

rl.question('请输入添加的产品名，如huagui_damai  ', (answer) => {
  rl.question('请输入终端类型（app、wap默认为app)，', (type) => {
    if (type === '') {
      type = 'app'
    } else {
      terminal = type
    }
    console.log(`正在创建：${answer}相关模块,请稍后...`);
    if (!hadCompany(answer)) {
      setCompany(answer) // 创建公司名目录
    }
    if (hadProduct(answer)) {
      if (hadTerminal(answer)) {
        console.log('已存在')
        rl.close()
        return
      } else {
        setTerminal(type, answer)
      }
    } else {
      setProduct(answer)
      setTerminal(type, answer)
    }
    setProductMainjs(answer)
    setProductRouter(answer)
    setProductPage(answer)
    setStateModule(answer)
    setBuildConf(answer)
    rl.close()
    return
  })
});
