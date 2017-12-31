<template>
    <div class="nuxtlogout">
        正在退出...
    </div>
</template>

<script>
import { api_post_loginout } from 'src/model/api.js'

    export default {
        name: 'nuxtlogout',
        data() {
            return {

            }
        },
        components: {

        },
        methods: {
            async loginout_post(params) {
                let res = '';
                try {
                    res = await api_post_loginout(params);
                    this.$router.go(-1);
                } catch (e) {
                    this.$message.error({message:e.message,showClose: true});
                }
            }
        },

        mounted() {

        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    .nuxtlogout {

    }
</style>
