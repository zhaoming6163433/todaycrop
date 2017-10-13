<template>
  <div class="home">
    <transition :name="transitionName">
        <keep-alive>
            <router-view class="child-view"></router-view>
        </keep-alive>
    </transition>
    <navbar></navbar>
  </div>
</template>

<script>
import navbar from 'components/navbar'

export default {
    name: 'home',
    props : [],
    data () {
        return {
            transitionName: 'slide-left'
        }
    },
    components: {
        navbar
    },
    created(){

    },
    methods : {

    },
    watch: {
        '$route' (to, from) {
            let tolevel = to.params.level;
            let fromlevel = from.params.level;

            if(tolevel >= fromlevel){
                this.transitionName = 'slide-left';
            }else{
                this.transitionName = 'slide-right';
            }
        }
    },
    mounted(){

    }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    .child-view {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        transition: all .5s cubic-bezier(.55,0,.1,1);
    }
    .slide-left-enter, .slide-right-leave-active {
        opacity: 0;
        -webkit-transform: translate(100%, 0);
        transform: translate(100%, 0);
    }
    .slide-left-leave-active, .slide-right-enter {
        opacity: 0;
        -webkit-transform: translate(-100%, 0);
        transform: translate(-100%, 0);
    }
    .home{
        height:100%;
    }
</style>
