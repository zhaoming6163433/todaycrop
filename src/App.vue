<template>
  <div id="app">
    <loading v-show="showLoading"></loading>
    <transition name="router-fade" mode="out-in">
      <router-view ></router-view>
    </transition>
  </div>
</template>

<script>
import router from './router'
import appConfigs from './configs'
import loading from 'components/loading'
import util from 'src/util/util.js'

export default {
  name: 'app',
  data(){
      return{
          showLoading: false
      }
  },
  created(){
    //拦截路由
    router.beforeEach((to, from, next) => {
      next();
      //初始化滚动事件监听
      document.body.scrollTop = 0;
      $(document).unbind('scroll');
      //运行滚动条滚动
      util.allscroll();
    });

    util.vueEvent.$on("showloading", ()=>{
        this.showLoading = true;
    });
    util.vueEvent.$on("disloading", ()=>{
        this.showLoading = false;
    });
  },
  methods : {

  },
  components: {
      loading
  }
}
</script>

<style>
/*.router-fade-enter-active, .router-fade-leave-active {
      transition: opacity .1s;
}
.router-fade-enter, .router-fade-leave-active {
    opacity: 0;
}*/
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  color: #000000;
  font-size: 16px;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}
body{
	overflow-x:hidden;
	min-width: 320px;
}
body,h1,h2,h3,h4,h5,h6,hr,p,blockquote,dl,dt,dd,ul,ol,li,pre,form,fieldset,legend,button,input,textarea,th,td{margin:0;padding:0;}

/*去掉百度地图logo*/
.mapdetail .anchorBL{ 
  display: none;
}
/*顶部fixed标题栏高度*/
.paddingtop{
  padding-top:44px;
}
.paddingtop2{
  padding-top:88px;
}
/*左右边距离*/
.marginleft{
  margin-left:12px;
}
.marginright{
  margin-right:12px;
}
/*文字超出省略号 第二行超出省略*/
.ellipisis{
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.ellipisis2{
  overflow:hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
/*自适应颜色*/

/*公共样式*/
/*分割线*/
.div_line{
  width: 100%;
  box-sizing: border-box;
  line-height: 0;
  height: 0.5rem;
  background-color: #f5f5f5;
  position: relative;
}
</style>
