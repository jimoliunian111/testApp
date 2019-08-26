import Vue from 'vue'
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
