<template>
  <div class="homechild">
    1122
  </div>
</template>

<script>
import util from 'src/util/util.js'

export default {
  name: 'homechild',
  props : [],
  data () {
    return {
    }
  },
  components: {

  },
  created(){

  },
  methods : {

  },
  mounted(){
        util.showloading();
        setTimeout(()=>{
            util.closeloading();
        },1000);
        //刷新时就不跳转了只改变按钮样式
        util.vueEvent.$emit("homebar",'homechild');
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

</style>
