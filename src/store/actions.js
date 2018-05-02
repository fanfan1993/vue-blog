export default {
    //
    nextData({commit}, data) {
      commit('NEXT_PAGE', data)
    },
    preData({commit}, data) {
      commit('PRE_PAGE', data)
    },
    goData({commit}, data) {
      commit('GO_PAGE', data)
    },
    initMovies({commit}, data) {
      commit('INIT_DATA', data)
    }
  }