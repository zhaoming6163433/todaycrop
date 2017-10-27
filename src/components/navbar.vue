<template>
  <div class="navbar">
      <mt-tabbar v-model="selected" fixed>
        <mt-tab-item id="homechild">
            <div class="outdiv" @click="gopage('homechild')">
                <div class="barimg home img1"></div>
                推荐
            </div>
        </mt-tab-item>
        <mt-tab-item id="myseek">
            <div class="outdiv" @click="gopage('myseek')">
                <div class="barimg seekclass img2"></div>
                个人分类
            </div>
        </mt-tab-item>
        <mt-tab-item id="mytalk">
            <div class="outdiv" @click="gopage('mytalk')">
                <div class="barimg shoppingcart img3"></div>
                问问
            </div>
        </mt-tab-item>
        <mt-tab-item id="myInfo">
            <div class="outdiv" @click="gopage('myInfo')">
                <div class="barimg my img4"></div>
                我的
            </div>
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
  created(){
    util.vueEvent.$off("homebar")
    util.vueEvent.$on("homebar", (flag)=>{
        this.selected = flag;
    });

  },
  methods : {
      //跳转页面
      gopage(val){
            switch (val) {
                case 'myseek':
                    this.$router.push({'name':'myseek'});
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
  mounted(){

  }
}

</script>

<style lang="scss">
@import 'static/css/common_color.scss';
    .mint-tab-item{
        padding:0!important;
    }
    .mint-tabbar > .mint-tab-item.is-selected{
        border-top:1px solid $bord_c;
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
        background:url('../../static/img/wenwen_sel.png') no-repeat;
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
        .outdiv{
            padding:7px 0;
        }
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
            background:url('../../static/img/wenwen.png') no-repeat;
            background-size: 100%;
        }
        .my{
            background:url('../../static/img/my.png') no-repeat;
            background-size: 100%;
        }
  }
</style>
