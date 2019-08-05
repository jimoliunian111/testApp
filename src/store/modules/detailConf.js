import * as types from '../mutation-types'

const state = {
  detailConf: {}
}

// getters
const getters = {
  getdetailConf: state => state.detailConf
}

// actions
const actions = {
  setdetailConf ({ commit, state }, detailConf) {
    commit(types.GET_DETAILCONF, { detailConf })
  }
}

// mutations
const mutations = {
  [types.GET_DETAILCONF] (state, { detailConf }) {
    state.detailConf = detailConf
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
