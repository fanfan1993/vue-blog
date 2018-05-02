import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Home from '@/components/Home'
import Detail from '@/components/Detail'
import Posts from '@/components/common/posts'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'*',
      redirect:'/'
    },
    {
      path: '/',
      name: 'home',
      component: Home,
      children:[
        {
          name:'posts',
          path:'/home/posts/:id',
          component:Posts
        }
      ],
    },
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/detail/:id',
      name: 'detail',
      component: Detail
    },
  ]
})
