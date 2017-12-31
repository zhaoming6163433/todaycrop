<template>
    <div class="nuxtlogout">
        正在退出...
    </div>
</template>

<script>
    import {
        api_user_logout
    } from 'src/model/api.js'

    export default {
        name: 'nuxtlogout',
        data() {
            return {

            }
        },
        components: {

        },
        methods: {
            async loginout_post() {
                let res = '';
                try {
                    res = await api_user_logout();
                    this.$router.go(-1);
                } catch (e) {
                    this.$message.error({
                        message: e.message,
                        showClose: true
                    });
                }
            }
        },

        mounted() {
            this.loginout_post();
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    .nuxtlogout {
        position: absolute;
        top: 40%;
        left: 50%;
        margin-left: -40px;
        font-size: 20px;
    }
</style>
