// mutation.js
import * as types from './mutation-types'
import api from '../http/fetchData'


function getMovieList(state,id,opts) {
  console.log('：下来的电影'+id)
  switch (Number(id)) {
    case 1:
      api.moviesList(opts).then(data => {
        state.movies = data.data.subjects;
      }).catch()
      break;
    case 2:
      api.comingList(opts).then(data => {
        state.movies = data.data.subjects;
      }).catch()
      break;
    case 3:
      api.topList(opts).then(data => {
        state.movies = data.data.subjects;
      }).catch()
      break;
  }
}

export default {
  // 分页 上一页
  [types.PRE_PAGE](state, data) {
    getMovieList(state,data.id, data.opts)//电影数据变化
    state.offset -= data.opts.limit
  },
  // 分页 下一页
  [types.NEXT_PAGE](state, data) {
    console.log(api, state, data)
    getMovieList(state,data.id, data.opts)
    state.offset += data.opts.limit
  },
  // 分页 跳转到指定页码
  [types.GO_PAGE](state, data) {
    getMovieList(state,data.id, data.opts)//电影数据变化
    state.offset = ((data.opts.start - 1) * data.opts.limit)
    //state.offset = offset
  },

  // 初始化数据
  [types.INIT_DATA](state, data) {
    console.log(data)
    state.movies = data.initMovies
  },
};
