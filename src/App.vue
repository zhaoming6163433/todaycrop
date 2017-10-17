<template>
  <div id="app">
    <loading v-show="showLoading"></loading>
    <keep-alive>
        <router-view ></router-view>
    </keep-alive>
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
          showLoading: false,
          titlename: {
            'myInfo':'我的',
            'mytalk':'问问',
            'myseek':'个人分类',
            'homechild':'今日口袋',
            'login':'登录',
            'register':'注册',
            'article':'网址详情',
            'updateseek':'编辑类别',
            'createseek':'新增类别',
            'collecturl':'新增网址'
          },
          //页面左右滑动优先级
          levelist: {
              'homechild':1,
              'myseek':2,
              'mytalk':3,
              'myInfo':4
          }
      }
  },
  created(){
    //拦截路由
    router.beforeEach((to, from, next) => {
      //首页拦截展示标题和页面样式切换
      this.hometab(to);
      //给路由添加优先级
      this.addlevel(to,from);
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
    this.firstitle();
  },
  methods : {
    hometab(to) {
      if (this.titlename[to.name]) {
        document.title = this.titlename[to.name];
      }
      switch (to.name) {
        case 'myseek':
          util.vueEvent.$emit("homebar", 'myseek');
          break;
        case 'homechild':
          util.vueEvent.$emit("homebar", 'homechild');
          break;
        case 'mytalk':
          util.vueEvent.$emit("homebar", 'mytalk');
          break;
        case 'myInfo':
          util.vueEvent.$emit("homebar", 'myInfo');
          break;
      }
    },
    addlevel(to,from){
        to.params.level = this.levelist[to.name]?this.levelist[to.name]:999;
        from.params.level = this.levelist[from.name]?this.levelist[from.name]:999;
    },
    //第一次进入页面也判断标题
    firstitle(){
      let url = window.location.href;
      let name = '';
      if(url.indexOf('?')!=-1){
        name = url.substring(url.indexOf('#')+2,url.indexOf('?'));
      }else{
        name = url.substring(url.indexOf('#')+2);
      }

      let _arr = name&&name.split('/');
      name = _arr[_arr.length-1];
      if(name){
        document.title = this.titlename[name]
      }
    }
  },
  components: {
      loading
  }
}
</script>

<style>
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
img{
    width:100%;
}
html{
    width:100%;
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
/*距离底部*/
.marginbt{
  margin-bottom: 55px;
}
/*左右边距离*/
.marginleft{
  margin-left:12px;
}
.marginright{
  margin-right:12px;
}
/*加载中文字 */
.mint-loadmore-text{
    font-size:14px;
    color:#999;
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
.closebtn{
  top:1.4rem;
  right:1rem;
  width:1.6rem;
  height:1.6rem;
  position:absolute;
  background:url('../static/img/close.png') no-repeat;
  background-size: 100%;
}
.mint-toast{
    z-index:99999;
}
.animated {
    animation-duration: .5s;
    animation-fill-mode: both;
}
</style>
