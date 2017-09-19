<template>
  <div class="progressbar">
    <div class="reading_progress_bar" :style="{ width: barw }"></div>
  </div>
</template>
<script>

export default {
  name: 'progressbar',
  props : [],
  data () {
    return {
      barw:0//进度条宽度
    }
  },

  methods : {
    
  },
  mounted(){
    $(document).scroll(() => {
        let _this = this;
        let step = function() {
            let _totalh = document.body.scrollHeight;
            let _t = document.body.scrollTop;
            let _h = window.screen.height;

            _this.barw = parseFloat(_t*100/(_totalh -_h)).toFixed(5)+'%';
        }
        if (requestAnimationFrame) {
            requestAnimationFrame(step);
        } else {
            step();
        }
    });
  }
}

</script>

<style lang="scss" scoped>
@import 'static/css/common_color.scss';
.progressbar{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 2px;
  z-index: 1;
  .reading_progress_bar{
    height: 100%;
    -webkit-transition: width .1s linear;
    transition: width .1s linear;
    background-color: $link_c;
  }
}
</style>
