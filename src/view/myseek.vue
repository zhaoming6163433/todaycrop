<template>
    <div class="myseek">
        <topseek></topseek>
        <seekinfo></seekinfo>
    </div>
</template>

<script>

import { mapState, mapMutations } from 'vuex'
import util from 'src/util/util.js'
import topseek from 'components/topseek'
import seekinfo from 'components/seekinfo'
import appConfigs from 'src/configs'

export default {
    name: 'myseek',
    props : [],
    data () {
        return {

        }
    },
    components: {
        seekinfo,
        topseek
    },
    created(){

    },
    computed:{

    },
    activated(){

    },
    methods : {

    },
    mounted(){
    }
}

</script>

<style lang="scss" scoped>
@import 'static/css/common_color.scss';
.myseek{
    height:90%;
}
</style>
