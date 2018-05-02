// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import store from './store'


Vue.prototype.$http= axios
Vue.prototype.HOST = '/api'
Vue.config.productionTip = false

// // 创建基本的axios配置
var $http = axios.create({
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
