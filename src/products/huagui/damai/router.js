import Vue from 'vue'
import Router from 'vue-router'
import Damai from './damai.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'huagui_damai',
      component: Damai
    }
  ]
})
