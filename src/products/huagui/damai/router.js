import Vue from 'vue'
import Router from 'vue-router'
import damai from './damai.vue'
Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'damai',
      meta: {
        title: 'huagui_damai'
      },
      component: damai
    }
  ]
})
router.beforeEach((to, from, next) => {
  const { title } = to.meta
  title && (document.title = title)
  next()
})
export default router
