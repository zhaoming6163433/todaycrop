import Vue from 'vue'
import Router from 'vue-router'
import home from '@/view/home'
import article from '@/view/article'

Vue.use(Router)

export default new Router({
  routes: [
    {//首页
      path: '/',
      name: 'home',
      component: home
    },
    {//文章页面
      path: '/article',
      name: 'article',
      component: article
    }
  ]
})
