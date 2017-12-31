<template>
    <div class="nuxtlogin">
        <div class="backimg" @click="goback"></div>
        <h2>登录你的博客，精彩永不丢失</h2>
        <div class="username inputdiv"><input  type="text" maxlength="20" placeholder="用户名" v-model="username" autocomplete="new-password" /></div>
        <div class="password inputdiv"><input  type="password" maxlength="20" placeholder="密码" v-model="password" autocomplete="new-password" /></div>
        <div style="text-align:center;margin-top:10px">
            <el-button type="primary" class="gotopocket" @click="gotopocket" round>登录</el-button>
        </div>
        <div class="register"><a @click="goregister">注册</a></div>
    </div>
</template>

<script>
import { api_user_login } from 'src/model/api.js'

    export default {
        name: 'nuxtlogin',
        data() {
            return {
                username: '',
                password: ''
            }
        },
        components: {

        },
        methods: {
            async login_post(params) {

                let res = '';
                try {
                    res = await api_user_login(params);
                    this.$router.go(-1);
                } catch (e) {
                    this.$message.error({message:e.message,showClose: true});
                }
            },
            goback() {
                this.$router.go(-1);
            },
            gotopocket() {
                let params = {'username':this.username,'password':this.password};
                this.login_post(params);
            },
            goregister() {
                this.$router.push({
                    "name": "nuxtregister"
                })
            }
        },

        mounted() {

        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    .nuxtlogin {
        .backimg {
            display: inline-block;
            margin: 0;
            margin-left: 5%;
        }
        margin-top: 20px;
        h2 {
            font-size: 20px;
            text-align: center;
            width: 100%;
            margin: 30px 0;
        }
        .password {
            margin-top: 20px;
        }
        .inputdiv {
            text-align: center;
        }
        .inputdiv>input {
            outline: none;
            border: 1px solid $bord_c;
            width: 60%;
            height: 35px;
            border-radius: 30px;
            font-size: 14px;
            padding: 0 5%;
        }
        .gotopocket {
            font-size: 16px;
            width: 70%;
            margin-top: 20px;
            border-radius: 30px;
        }
        .register {
            text-align: right;
            margin: 20px 14% 0 0;
            font-size: 14px;
            color: $grey_c;
            cursor: pointer;
            a:nth-child(1) {
                margin-right: 10px;
            }
            a:nth-child(2) {
                margin-left: 10px;
            }
        }
    }
</style>
