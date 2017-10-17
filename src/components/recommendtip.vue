<template>
  <div class="recommendtip" v-show="visible">
      <div class="rectip" :style="{height: classtypeh + 'rem' }">{{text}}</div>
  </div>
</template>

<script>
import util from 'src/util/util.js'
export default {
    name: 'recommendtip',
    props : [],
    data () {
        return {
            text:'',
            visible:false,
            classtypeh:2.3
        }
    },
    methods : {

    },
    mounted(){
        util.vueEvent.$on("recomtip", (text) => {
            util.initdata(this);

            if(text) this.text = text;
            this.visible = true;
            clearInterval(window.recommendtiptime1);
            clearInterval(window.recommendtiptime2);
            window.recommendtiptime1 = setTimeout(()=>{
                this.classtypeh = 0;
                window.recommendtiptime2 = setTimeout(()=>{
                    this.visible = false;
                },300);
            },1500);
        });
    }
}

</script>

<style lang="scss" scoped>
@import 'static/css/common_color.scss';
.recommendtip{
    .rectip{
        transition: height .3s;
        overflow: hidden;
        background-color:$blue_b;
        color:$blue_c;
        text-align: center;
        font-size:1.4rem;
        line-height: 2.3rem;
    }
}
</style>
