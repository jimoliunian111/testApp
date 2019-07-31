import Vue from 'vue'
import App from '@/App.vue'
import router from './router'
import axios from '@/plugins/axios.js'
import '@/common.js'

Vue.config.productionTip = false

new Vue({
  router,
  App,
  axios,
  render: h => h(App)
}).$mount('#app')
