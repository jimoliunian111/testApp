import Vue from 'vue'
import App from '../../../App.vue'
import router from './router'

Vue.config.productionTip = false
console.log('执行了大麦入口的main.js')
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
