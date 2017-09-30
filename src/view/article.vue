<template>
  <div class="article">
    <progressbar></progressbar>
  	<div v-html="readabilitylist.content"></div>
  </div>
</template>

<script>
import vueutil from 'src/util/vueutil.js'
import api from 'src/model/api.js'
import {api_get_article,api_get_tuling_bot} from 'src/model/api.js'
import progressbar from 'components/progressbar'

export default {
  name: 'article',
  data () {
    return {
      readabilitylist:{},//内容
      scrollHeight:0//滚动条总高度
    }
  },
  components:{
    progressbar
  },
  methods : {
    //获取访问页面的内容
    async get_article(params){
        try{
            let res = await api_get_article(params);
            console.log('-----获取访问页面的内容-----');
            console.log(res);
            if(res.result.content == false){
              window.location.href = params.url;
            }else{
              //计算权重值
              let score = res.result.content&&res.result.content.split(',').length;
              if(score<2){
                window.location.href = params.url;
              }else{
                this.readabilitylist = res.result;
              }
            }
            this.$nextTick(() => {

            });
        }catch (err) {
          
        }  
    },
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
  mounted(){
  		this.get_article({'url':'http://www.ruanyifeng.com/blog/2015/09/web-page-performance-in-depth.html'});
      this.get_tuling_bot({'info':'haha','userid':'zhaoming'});
  }
}
</script>

<style lang="scss" scoped>
@import '../../static/css/common_color.scss';
</style>
