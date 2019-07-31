import Vue from 'vue'
import '@/assets/iconfont/iconfont.css'
import '@/assets/styles/rest.css'

import fastClick from 'fastclick'
import { Toast } from 'vant'

import share from '@/components/ver1.0.0/share.vue'

Vue.use(Toast)

Vue.component('share', share)

fastClick.attach(document.body)
