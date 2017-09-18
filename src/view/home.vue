<template>
  <div class="home">
  	<div v-html="readabilitylist.content"></div>
  </div>
</template>

<script>
import vueutil from 'src/util/vueutil.js'
import api from 'src/model/api.js'

export default {
  name: 'home',
  data () {
    return {
      readabilitylist:{}
    }
  },
  methods : {
    //获取访问页面的内容
    async get_article(params){
        try{
            let res = await api.get_article(params);
            console.log('-----获取访问页面的内容-----');
            console.log(res);
            if(res.content == false){
              window.location.href = params.url;
            }else{
              this.readabilitylist = res;
            }
            
            this.$nextTick(() => {
              
            });
        }catch (err) {
          
        }  
    }
  },
  mounted(){
  		this.get_article({'url':'https://www.ffmpeg.org/download.html#get-sources'});
  }
}
</script>

<style scoped>
@import '../../static/css/common_color.scss';
</style>
