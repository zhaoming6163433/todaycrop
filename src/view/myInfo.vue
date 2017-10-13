<template>
  <div class="myInfo">
      <section class="mybaseInfo">
        <div><img src="../../static/img/user_def_head.png"/></div>
        <div>{{userinfo.username}}</div>
      </section>
      <div class="div_line"></div>
      <section>
        <div class="infosel" @click="collecturl()">
          <div>新增网址</div>
          <div class="gotoback"><img src="../../static/img/grayback2.png"/></div>
        </div>
      </section>
      <section>
        <div class="infosel" @click="createseek()">
          <div>新增类别</div>
          <div class="gotoback"><img src="../../static/img/grayback2.png"/></div>
        </div>
      </section>
      <section>
        <div>
          <mt-button :type="buttontype" class="savebtn" @click="loginout()">{{logintext}}</mt-button></div>
      </section>
  </div>
</template>

<script>
import { api_user_islogin, api_user_logout} from 'src/model/api.js'
import util from 'src/util/util.js'
import appConfigs from 'src/configs'
import { mapState, mapMutations } from 'vuex'

export default {
    name: 'myInfo',
    props : [],
    data () {
        return {
            buttontype:'danger',
            logintext:'',
            loginstatu:''//登录状态 0已退出 1已登录
        }
    },
    components: {

    },
    created(){

    },
    computed:{
        ...mapState([
            'userinfo'
        ])
    },
    activated(){
        if(this.userinfo._id){
            this.loginchange();
        }else{
            this.get_user_islogin();
        }
    },
    methods : {
        ...mapMutations({
            SAVE_USER_INFO: 'SAVE_USER_INFO',//用户信息
            SHOW_COLLECT_URL: 'SHOW_COLLECT_URL',//展示新增地址
            SHOW_SEEK_NAME: 'SHOW_SEEK_NAME'//展示新增分类
        }),
        //是否登录
        async get_user_islogin(params){
            try{
                let res = await api_user_islogin(params);
                this.SAVE_USER_INFO(res.result);
                console.log('-----获取是否登录-----');
                console.log(res);
                this.loginchange();
            }catch (err) {
                console.log(err)
                this.SAVE_USER_INFO({});
                this.logoutchange();
            }
        },
        //退出登录
        async get_user_logout(){
            util.showloading();
            try{
                let res = await api_user_logout();
                this.SAVE_USER_INFO(res.result);
                util.closeloading();
                this.logoutchange();
                console.log('-----退出-----');
                console.log(res);
            }catch (err) {
                this.loginchange();
                this.SAVE_USER_INFO({});
            }
        },
        //添加网址
        collecturl(){
            //点击时vuex就肯定有值了就不需要掉接口判断了
            if(this.userinfo._id){
                this.$router.push({name:'collecturl'});
            }else{
                util.toastinfo('请先登录');
            }
        },
        //创建分类
        createseek(){
            if(this.userinfo._id){
                this.$router.push({'name':'createseek'});
            }else{
                util.toastinfo('请先登录');
            }
        },
        //登录或退出
        loginout(){
            switch (this.loginstatu) {
                case 0:
                    this.$messagebox.confirm('确定要退出登录？','').then(() => {
                        this.get_user_logout();
                    },() => {

                    });
                    break;
                case 1:
                    this.$router.push({name:'login'});
                    break;
                default:
                // statements_def
                break;
            }
        },
        //登录改变状态
        loginchange(){
            this.logintext = '退出';
            this.buttontype = 'default';
            this.loginstatu = 0;
        },
        //退出改变状态
        logoutchange(){
            this.logintext = '登录';
            this.buttontype = 'danger';
            this.loginstatu = 1;
        }
    },
    mounted(){
        //刷新时就不跳转了只改变按钮样式
        util.vueEvent.$emit("homebar",'myInfo');
    }
}

</script>

<style lang="scss" scoped>
@import 'static/css/common_color.scss';
  .myInfo{
    .mybaseInfo{
      text-align: left;
      height:10rem;
      >div{
        display: inline-block;
      }
      >div:nth-child(1){
        position: relative;
        top: 2.5rem;
        left: 1.2rem;
        overflow: hidden;
        img{
          width: 5rem;
          border-radius: 6rem;
        }
      }
      >div:nth-child(2){
        font-size:1.6rem;
        margin-left: 2.5rem;
      }
    }
    .infosel{
      position:relative;
      margin-left: 1.2rem;
      border-bottom:1px solid $bord_c;
      height:5rem;
      font-size: 1.4rem;
      line-height: 5rem;
      >div{
        position:absolute;
      }
    }
    .gotoback{
      position:absolute;
      right:1.2rem;
      img{
        width:1.2rem;
      }
    }
    .savebtn{
      font-size:1.6rem;
      width: 90%;
      margin-top: 2rem;
      margin-left: 5%;
    }
  }
</style>
