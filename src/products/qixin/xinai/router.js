import Vue from 'vue'
import Router from 'vue-router'
import xinai from './xinai.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'xinai',
      component: xinai
    }
  ]
})
