<template>
  <div>
    <div v-show="type==1" class="nodatac">
      <div><img :src="nodataimg"/></div>
      <div>{{text}}</div>
    </div>
    <div v-show="type==2" class="nodatac">

    </div>
  </div>
</template>

<script>

export default {
  name: 'nodatac',
  props : ['text','nodataimg','type'],
  data () {
    return {

    }
  },
  methods : {
    gologin(){

    }
  },
  mounted(){

  }
}

</script>

<style lang="scss" scoped>
  @import 'static/css/common_color.scss';
  .nodatac{
        position: absolute;
        top: 35%;
        left: 0;
        right: 0;
        text-align: center;
        >div:nth-child(1){
            width:8rem;
            margin: 0 auto;
        }
        >div:nth-child(2){
            font-size:1.4rem;
            color:$grey_c;
        }
  }
</style>
