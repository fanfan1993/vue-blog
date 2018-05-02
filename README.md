# vue-blog（如果对你有帮助点右上角star，谢谢啦）
## 技术栈
用到vue2 + vue-router + vuex + axios+ sass+flex
<br>
api是豆瓣电影，由于页面不是很多，vuex用的不多，关键掌握怎么实现就好了

## 参与开发
<br>
更多项目请关注 https://github.com/fanfan1993
<br>

### vuex 部分
  * 在此介绍一下 vuex 部分的实现 。在 src 目录下（和 components 目录平级），新建 store 目录，其中 index.js 文件传入 mutation，初始化 vuex；
  ```js
  // vuex store/index.js
    import Vue from 'vue'
    import Vuex from 'vuex'
    import mutations from './mutations'

    Vue.use(Vuex);

    const state = {
      offset: 0
    };

    export default new Vuex.Store({
      state,
      mutations
    })
  ```
  * mutation-types.js 记录所有的事件名，其实这个文件最大的好处是能让我们更直观地管理所有的 vuex 方法，它的优点会在项目复杂后凸显出来，项目复杂时我们可能会使用 vuex 存储很多数据、定义很多方法，这时 mutation-types.js 就能更好更直观地管理这些方法。这也是一种设计理念嘛，有利于后期维护。

  ```js
  // mutation-types.js
      export const PRE_PAGE = 'PRE_PAGE'
      export const NEXT_PAGE = 'NEXT_PAGE'
      export const GO_PAGE = 'GO_PAGE'
  ```

  * mutation.js 这是 vuex 的核心文件，注册了实现的所有事件，我们定义了点击上一页、下一页和跳转到指定页面的方法。

  ```js
  // mutation.js
    import * as types from './mutation-types'

    export default {
      // 分页 上一页
      [types.PRE_PAGE] (state, offset) {
        state.offset -= offset
      },
      // 分页 下一页
      [types.NEXT_PAGE] (state, offset) {
        state.offset += offset
      },
      // 分页 跳转到指定页码
      [types.GO_PAGE] (state, offset) {
        state.offset = offset
      }
    };
  ```
  ## 页面效果
##### 页面显示
![screenshot](./screenshot/1.png)

> blog

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report


For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
