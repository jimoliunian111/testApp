import Vue from 'vue'
import App from '@/App.vue'
import router from './router'
import store from './store/index'
import axios from '@/plugins/axios.js'
import '@/common.js'
Vue.config.productionTip = false
console.log('store', store)
new Vue({
  router,
  store,
  App,
  axios,
  render: h => h(App)
}).$mount('#app')
