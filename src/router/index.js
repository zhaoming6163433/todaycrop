import Vue from 'vue'
import Router from 'vue-router'
import home from '@/view/home/home'//首页路由
import homechild from '@/view/home/homechild'//首页
import myseek from '@/view/myseek'//个人分类
import myInfo from '@/view/myInfo'//我的
import article from '@/view/article'//文章
import login from '@/view/login'//登录
import register from '@/view/register'//注册
import updateseek from '@/view/updateseek'//修改类别
import collecturl from '@/view/collecturl'//添加地址
import createseek from '@/view/createseek'//添加类别
import mytalk from '@/view/mytalk'//问问
import nuxtlogin from '@/view/nuxtlogin/login'//nuxt登录
import nuxtregister from '@/view/nuxtlogin/register'//nuxt注册
import nuxtlogout from '@/view/nuxtlogin/logout'//nuxt退出

Vue.use(Router)

export default new Router({
//   mode:'history',
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
        },
        {//个人分类
          path: 'home/myseek',
          name: 'myseek',
          component: myseek
        },
        {//问问
            path: '/mytalk',
            name: 'mytalk',
            component: mytalk
        },
        {//我的
          path: 'home/myInfo',
          name: 'myInfo',
          component: myInfo
        },
        {//修改类别
            path: 'updateseek',
            name: 'updateseek',
            component: updateseek
        }
      ]
    },
    //文章内链
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
    },
    {//添加地址
        path: '/collecturl',
        name: 'collecturl',
        component: collecturl
    },
    {//添加类别
        path: '/createseek',
        name: 'createseek',
        component: createseek
    },
    {//nuxt登录
        path: '/nuxtlogin',
        name: 'nuxtlogin',
        component: nuxtlogin
    },
    {//nuxt注册
        path: '/nuxtregister',
        name: 'nuxtregister',
        component: nuxtregister
    },
    {//nuxt退出
        path: '/nuxtlogout',
        name: 'nuxtlogout',
        component: nuxtlogout
    }
  ]
})
