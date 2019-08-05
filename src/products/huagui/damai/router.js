import Vue from 'vue'
import Router from 'vue-router'
import damai from './damai.vue'
const insure = () => import(/* webpackChunkName: "insure" */ './pages/insure.vue')
Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'damai',
      meta: {
        title: '华贵大麦定期寿险'
      },
      component: damai
    },
    {
      path: '/insure',
      name: 'damai_insure',
      meta: {
        title: '华贵大麦定期寿险投保页'
      },
      component: insure
    }
  ]
})
router.beforeEach((to, from, next) => {
  const { title } = to.meta
  title && (document.title = title)
  next()
})
export default router
