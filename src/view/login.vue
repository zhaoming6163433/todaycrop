<template>
  <div class="login">
    <div><a class="closebtn" @click="closepage"></a></div>
    <h2>登录你的口袋，精彩永不丢失</h2>
    <div class="username inputdiv"><input id="username" type="text" maxlength="20" placeholder="用户名" v-model="username" autocomplete="new-password" /></div>
    <div class="password inputdiv"><input id="password" type="password"  maxlength="20" placeholder="密码" v-model="password" autocomplete="new-password" /></div>
    <div><mt-button type="danger" class="gotopocket" @click="gotopocket()">进入口袋</mt-button></div>
    <div class="register"><a @click="goregister">注册</a>|<a>忘记密码？</a></div>
  </div>
</template>

<script>
import { api_user_login } from 'src/model/api.js'
import { mapMutations } from 'vuex'
import util from 'src/util/util.js'

export default {
  name: 'login',
  props : [],
  data () {
    return {
      username:'',
      password:''
    }
  },
  components: {

  },
  created(){

  },
  methods : {
    ...mapMutations({
      SAVE_USER_INFO: 'SAVE_USER_INFO'//用户信息
    }),
    //登录
    async get_user_login(params){
        util.showloading();
        try{
            let res = await api_user_login(params);
            console.log('-----登录-----');
            console.log(res);
            this.SAVE_USER_INFO(res.userInfo);
            util.closeloading();
            this.$router.go(-1);
        }catch (err) {
          if(err.message){
            util.toastinfo(err.message);
          }
        }
    },
    closepage(){
      this.$router.go(-1);
    },
    //登录
    gotopocket(){
      let params = {'username':this.username,'password':this.password};
      this.get_user_login(params);
    },
    //注册
    goregister(){
      this.$router.push({name:'register'});
    }
  },
  mounted(){

  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import 'static/css/common_color.scss';
  .login{
      margin-top: 5rem;
      h2{
        font-size: 2rem;
        text-align: center;
        width: 100%;
        margin: 3rem 0;
      }
      .password{
        margin-top:2rem;
      }
      .inputdiv>input{
        outline: none;
        border: 1px solid $inputborder_c;
        width: 70%;
        height: 3rem;
        border-radius: 3rem;
        margin-left: 10%;
        font-size: 1.4rem;
        padding: 0 5%;
      }
      .gotopocket{
        font-size:1.6rem;
        width: 80%;
        margin-top: 2rem;
        margin-left: 10%;
        border-radius: 3rem;
      }
      .register{
        text-align: right;
        margin: 2rem 10% 0 0;
        font-size: 1.4rem;
        color: $grey_c;
        a:nth-child(1){
          margin-right: 1rem;
        }
        a:nth-child(2){
          margin-left: 1rem;
        }
      }
  }
</style>
