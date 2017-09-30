import Vue from 'vue'
import Router from 'vue-router'
import home from '@/view/home/home'//首页路由
import homechild from '@/view/home/homechild'//首页
import myInfo from '@/view/myInfo'//我的
import article from '@/view/article'//文章
import login from '@/view/login'//登录
import register from '@/view/register'//注册

Vue.use(Router)

export default new Router({
  routes: [
    {//首页
      path: '/',
      name: 'home',
      component: home,
      children: [
        {//首页
          path: '/', 
          name: 'homechild',
          component: homechild
        },/*,
        {//分类
          path: 'home/seekclass', 
          name: 'seekclass',
          component: seekclass
        },
        {//微聊
          path: 'home/mytalk', 
          name: 'mytalk',
          component: mytalk
        },*/
        {//我的
          path: 'home/myInfo', 
          name: 'myInfo',
          component: myInfo
        }
      ]
    },
    {
      path: '/article',
      name: 'article',
      component: article
    },
    //登录页面
    {
      path: '/login',
      name: 'login',
      component: login
    },
    //注册
    {
      path: '/register',
      name: 'register',
      component: register
    }
  ]
})
