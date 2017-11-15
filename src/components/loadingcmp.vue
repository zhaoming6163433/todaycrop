<template>
  <div class="loadingcmp">
    <div class="showloading"><img src="../../static/img/moreloading.gif" />加载中...</div>
  </div>
</template>

<script>

export default {
  name: 'loadingcmp',
  props : ['tiptext'],
  data () {
    return {

    }
  },
  methods : {

  },
  mounted(){

  }
}

</script>

<style lang="scss" scoped>
 
  .loadingcmp{
    position:fixed;
    width:100%;
    bottom:0;
    text-align: center;
    .showloading{
      background-color:$bottom_c;
      height: 2.7rem;
      line-height: 2.7rem;
      font-size: 1.2rem;
      color:$grey_c;
      >img:nth-child(1){
        position: relative;
        top: 0.3rem;
        right: 0.5rem;
        width: 5%;
      }
    }
  }
</style>
