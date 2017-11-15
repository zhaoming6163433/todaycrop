<template>
  <div class="register">
    <div><a class="closebtn" @click="closepage"></a></div>
    <div class="username inputdiv"><input type="text" maxlength="20" placeholder="用户名" v-model="username" /></div>
    <div class="password inputdiv"><input type="password" autocomplete="new-password" maxlength="20" placeholder="密码" v-model="password" /></div>
    <div class="password inputdiv"><input type="password" autocomplete="new-password" maxlength="20" placeholder="确认密码" v-model="repassword" /></div>
    <div><mt-button type="danger" class="gotopocket" @click="gotopocket()">注册</mt-button></div>
  </div> 
</template>

<script>
import { api_user_register } from 'src/model/api.js'
import util from 'src/util/util.js'

export default {
  name: 'login',
  props : [],
  data () {
    return {
      username:'',
      password:'',
      repassword:''
    }
  },
  components: {
    
  },
  created(){
    
  },
  methods : {
    //注册
    async get_user_register(params){
        util.showloading();
        try{
            let res = await api_user_register(params);
            util.closeloading();
            this.$router.go(-1);
            util.toastinfo('注册成功');
            console.log('-----注册成功-----');
            console.log(res);
        }catch (err) {
          util.closeloading();
          if(err.message){
            util.toastinfo(err.message);
          }
        }  
    },
    closepage(){
      this.$router.go(-1);
    },
    //注册
    gotopocket(){
      let params = {'username':this.username,'password':this.password,'repassword':this.repassword};
      this.get_user_register(params);
    }
  },
  mounted(){

  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
 
  .register{
      margin-top:5rem;
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
