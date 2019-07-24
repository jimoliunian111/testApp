import Vue from 'vue'
import Router from 'vue-router'
import XiaoMai from './xiaomai.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'xiaomai',
      component: XiaoMai
    }
  ]
})
