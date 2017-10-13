<template>
  <div class="loadbottom">
    <div class="showbottom">
      <img v-bind:style="[styleObject1, styletrans]"  src="../../static/img/bottom_left.png"/>
      <span v-bind:style="[stylespan, styletrans]">已经到底了</span>
      <img v-bind:style="[styleObject2, styletrans]"  src="../../static/img/bottom_right.png"/>
    </div>
  </div>
</template>

<script>

export default {
  name: 'loadbottom',
  props : ['bindid'],
  data () {
    return {
      stylespan:{
        'top':'0'
      },
      styletrans:{
        '-webkit-transition':'0s'
      },
      styleObject1:{
        '-webkit-transform':'rotate(0deg)'
      },
      styleObject2:{
        '-webkit-transform':'rotate(0deg)',
      },
      startY:'',
      moveY:''
    }
  },
  methods : {
    startfn(e){
      let touch = e.touches[0];
      this.startY = touch.screenY;
      this.styletrans['-webkit-transition'] = '0s';
    },
    movefn(e){
      let touch = e.touches[0];
      this.moveY = touch.screenY-this.startY;
      if(this.moveY<0&&this.moveY>-35){
        let move1 = this.moveY;
        let move2 = -this.moveY;

        this.stylespan['top'] = move1/40+'rem';
        this.styleObject1['-webkit-transform'] = 'rotate('+move1+'deg)';
        this.styleObject2['-webkit-transform'] = 'rotate('+move2+'deg)';
      }
    },
    endfn(e){
      this.styletrans['-webkit-transition'] = '0.5s';
      this.styleObject1['-webkit-transform'] = 'rotate(0deg)';
      this.styleObject2['-webkit-transform'] = 'rotate(0deg)';
      this.stylespan['top'] = '0';
    }
  },
  mounted(){
    let _dom = document.getElementById(this.bindid);

    _dom.removeEventListener("touchstart", this.startfn);
    _dom.removeEventListener("touchmove", this.movefn);
    _dom.removeEventListener("touchend", this.endfn);

    _dom.addEventListener("touchstart", this.startfn);
    _dom.addEventListener("touchmove", this.movefn);
    _dom.addEventListener("touchend", this.endfn);

  }
}

</script>

<style lang="scss" scoped>
@import 'static/css/common_color.scss';
  .loadbottom{
    margin-bottom: 55px;
    position:relative;
    width:100%;
    .showbottom{
      text-align: center;
      background-color:$bottom_c;
      height: 2.7rem;
      line-height: 2.7rem;
      font-size: 0.9rem;
      color:$grey_c;
      >span{
        position:relative;
      }
      >img{
        position: relative;
        top: -0.1rem;
        width: 8%;
      }
      >img:nth-child(1){
        right: 0.5rem;
        transform-origin: left;
      }
      >img:nth-child(3){
        left: 0.5rem;
        transform-origin: right;
      }
    }
  }
</style>
