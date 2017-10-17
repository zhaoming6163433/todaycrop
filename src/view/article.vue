<template>
  <div class="article">
  	<iframe :src="url" ></iframe>
  </div>
</template>

<script>
import vueutil from 'src/util/vueutil.js'
import api from 'src/model/api.js'
import util from 'src/util/util.js'
import {api_get_tuling_bot} from 'src/model/api.js'

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
    //图灵机器人
    async get_tuling_bot(params){
        try{
            let res = await api_get_tuling_bot(params);
            console.log('-----获取机器人返回的内容-----');
            console.log(res);

            this.$nextTick(() => {

            });
        }catch (err) {

        }
    }
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
    //this.get_tuling_bot({'info':'haha','userid':'zhaoming'});
  }
}
</script>

<style lang="scss" scoped>
@import '../../static/css/common_color.scss';
.article{
    width:100%;
    height:100%;
}
iframe{
    width: 100%;
    height: 100%;
    border: none;
    margin: 0;
    padding: 0;
}
</style>
