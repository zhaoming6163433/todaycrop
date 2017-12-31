<template>
    <div class="nuxtregister">
        <div class="backimg" @click="goback"></div>
        <h2>注册你的博客，精彩永不丢失</h2>
        <div class="username inputdiv"><input  type="text" maxlength="20" placeholder="用户名" v-model="username" autocomplete="new-password" /></div>
        <div class="password inputdiv"><input  type="password" maxlength="20" placeholder="密码" v-model="password" autocomplete="new-password" /></div>
        <div class="password inputdiv"><input  type="password" maxlength="20" placeholder="确认密码" v-model="repassword" autocomplete="new-password" /></div>
        <div style="text-align:center;margin-top:10px">
            <el-button type="primary" class="gotopocket" @click="gotopocket" round>注册</el-button>
        </div>

    </div>
</template>

<script>
    import {
        api_post_register
    } from 'src/model/api.js'

    export default {
        name: 'nuxtregister',
        data() {
            return {
                username: '',
                password: '',
                repassword: ''
            }
        },
        components: {

        },
        methods: {
            async register_post(params) {

                let res = '';
                try {
                    res = await api_post_register(params);
                    this.$router.go(-1);
                } catch (e) {
                    this.$message.error(e);
                }
            },
            goback() {
                this.$router.go(-1);
            },
            gotopocket() {
                let params = {
                    'username': this.username,
                    'password': this.password,
                    'repassword': this.repassword
                };
                this.register_post(params);
            }
        },

        mounted() {

        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    .nuxtregister {
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
            a:nth-child(1) {
                margin-right: 10px;
            }
            a:nth-child(2) {
                margin-left: 10px;
            }
        }
    }
</style>
