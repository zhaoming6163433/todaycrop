<template>
  <div class="navbar">
      <mt-tabbar v-model="selected" fixed>
        <mt-tab-item id="homechild">
          <div class="barimg home img1"></div>
          首页
        </mt-tab-item>
        <mt-tab-item id="seekclasschild">
          <div class="barimg seekclass img2"></div>
          个人分类
        </mt-tab-item>
        <mt-tab-item id="shopcar">
          <div class="barimg shoppingcart img3"></div>
          问问
        </mt-tab-item>
        <mt-tab-item id="myInfo">
          <div class="barimg my img4"></div>
          我的
        </mt-tab-item>
      </mt-tabbar>
  </div>
</template>

<script>
import appConfigs from 'src/configs'
import util from 'src/util/util.js'

export default {
  name: 'navbar',
  props : [],
  data () {
    return {
      selected: 'homechild'
    }
  },
  watch: {
      selected: function (val, oldVal) {
          // 这里就可以通过 val 的值变更来确定
          switch (val) {
            case 'seekclass':
              this.$router.push({'name':'seekclass'})
              break;
            case 'homechild':
              this.$router.push({'name':'homechild'});
              break;
            case 'mytalk':
              this.$router.push({'name':'mytalk'});
              break;
            case 'myInfo':
              this.$router.push({'name':'myInfo'});
              break;
          }
      }
  },
  created(){
    util.vueEvent.$off("homebar")
    util.vueEvent.$on("homebar", (flag)=>{
        this.selected = flag;
    });
  },
  methods : {
  },
  mounted(){
    
  }
}

</script>

<style lang="scss">
@import 'static/css/common_color.scss';
  .mint-tabbar > .mint-tab-item.is-selected{
    color: $toutiao_r!important;
    background-color:$nav_tabbar;
    .img1{
      background:url('../../static/img/home_sel.png') no-repeat;
      background-size: 100%;
    }
    .img2{
      background:url('../../static/img/fenlei_sel.png') no-repeat;
      background-size: 100%;
    }
    .img3{
      background:url('../../static/img/gowuche_sel.png') no-repeat;
      background-size: 100%;
    }
    .img4{
      background:url('../../static/img/my_sel.png') no-repeat;
      background-size: 100%;
    }
  }
</style>
<style lang="scss" scoped>
@import 'static/css/common_color.scss';
  .navbar{
    .barimg{
      width: 24px;
      height: 24px;
      margin: 0 auto;
      padding-bottom: 5px;
      background-repeat: no-repeat;
    }
    .home{
      background:url('../../static/img/home.png') no-repeat;
      background-size: 100%;
    }
    .seekclass{
      background:url('../../static/img/fenlei.png') no-repeat;
      background-size: 100%;
    }
    .shoppingcart{
      background:url('../../static/img/gowuche.png') no-repeat;
      background-size: 100%;
    }
    .my{
      background:url('../../static/img/my.png') no-repeat;
      background-size: 100%;
    }
  }
</style>
