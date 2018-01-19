<template>
  <div class="article">
  	<iframe :src="url" ></iframe>
  </div>
</template>

<script>
import vueutil from 'src/util/vueutil.js'
import api from 'src/model/api.js'
import util from 'src/util/util.js'

export default {
  name: 'article',
  data () {
    return {
      url:''
    }
  },
  components:{

  },
  methods : {

  },
  activated(){
      util.showloading();
      let params = this.$route.query;
      this.url = params.url;
      setTimeout(()=>{
          util.closeloading();
      },500);
  },
  mounted(){

  }
}
</script>

<style lang="scss" scoped>
@import '../../static/css/common_color.scss';
.article{
    width:100%;
    height:100%;
    overflow: hidden;
}
iframe{
    width: 100%;
    height: 100%;
    border: none;
    margin: 0;
    padding: 0;
}
</style>
