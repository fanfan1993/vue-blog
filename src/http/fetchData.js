//const baseUrl = 'https://douban.uieee.com/v2'

const baseUrl = this.HOST || '/api'
// 在正上映
import Vue from 'vue'
import axios from 'axios'
import store from '../store'
//import cookies from 'js-cookie''


// 初始化请求实例
const http = axios.create({
  baseURL: baseUrl,
  timeout: 10000,
  responseType: 'json',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
  }
})
// const API_ROOT = ''http://127.0.0.1:3000/'
//http('/movie/in_theaters{/start}{/count}')
// Vue.http.interceptors.push((request, next) => {
//   Vue.http.headers.common['token'] = cookies.get('token') || ''
//   store.state.showLoading = true
//   next((response) => {
//     store.state.showLoading = false
//     if (response.status === 401) {
//       window.location.hash = '#!/login'
//     }
//   })
// })

//正在上映
const moviesList = (opts) => http('/movie/in_theaters?' + 'start=' + opts.start + '&count=' + opts.limit).then(
  //console.log(opts)
)
//即将上映
const comingList = (opts) => http('/movie/coming_soon?' + 'start=' + opts.start + '&count=' + opts.limit).then(
  //console.log(opts)
)
//top250
const topList = (opts) => http('/movie/top250?' + 'start=' + opts.start + '&count=' + opts.limit).then(
  //console.log(opts)
)



export default {
  moviesList,
  comingList,
  topList
}

// 获取电影
// function moviesList (opts) {
//     
//   }
