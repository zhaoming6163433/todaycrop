<template>
  <div class="createseek" v-show="createseek.showseekname">
      <div class="popover-new-header">
        <a class="popover-new-close" href="#"></a><h2>保存个人类别</h2>
        <a class="closebtn" @click="closepage"></a>
      </div>
      <div>
        <mt-field label="" :attr="{ maxlength: 5 }" placeholder="请输入类别，最多五个字符" type="url" v-model="$store.state.createseek.seekname"></mt-field>
      </div>
      <div><mt-button type="danger" class="savebtn" @click="saveUrl()">保存</mt-button></div>
  </div> 
</template>

<script>
import { api_add_seekname } from 'src/model/api.js'
import util from 'src/util/util.js'
import appConfigs from 'src/configs'
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'createseek',
  props : [],
  data () {
    return {

    }
  },
  components: {
    
  },
  created(){
    
  },
  computed: {
    ...mapState([
        "createseek"
    ])
  },
  methods : {
    ...mapMutations({
      SHOW_SEEK_NAME: 'SHOW_SEEK_NAME'//展示新增类别
    }),
    //新增类别
    async get_add_seekname(params){
        util.showloading();
        try{
            let res = await api_add_seekname(params);
            util.closeloading();
            util.toastinfo(res.message);
            this.SHOW_SEEK_NAME({ 'flag': false ,'seekname':''});
            console.log('-----保存成功-----');
            console.log(res);
        }catch (err) {
            util.toastinfo(err.message||'保存失败');
        }  
    },
    //返回
    closepage(){
      this.SHOW_SEEK_NAME({ 'flag': false ,'seekname':''});
    },
    //保存
    saveUrl(){
      let userInfo = util.handleCookieGet('userInfo');
      if(userInfo){
        if(this.createseek.seekname.trim() == ''){
          util.toastinfo('类别不能为空');
        }else{
          let params = {'seekname':this.createseek.seekname};
          this.get_add_seekname(params);
        }
      }else{
        util.toastinfo('请先登录');
      }  
    }
  },
  mounted(){
  }
}

</script>

<style lang="scss" scoped>
@import 'static/css/common_color.scss';
.createseek{
  height: 100%;
  left: 0;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1;
  background-color: $wihte_c;
  .popover-new-header{
    border-bottom: 1px solid $bord_c;
    position: relative;
    height:4rem;
    line-height: 4rem;
    h2 {
        font-size: 1.5rem;
        margin: 0 1rem;
    }
  }
  .savebtn{
    font-size:1.6rem;
    width: 90%;
    margin-top: 2rem;
    margin-left: 5%;
  }
}
</style>
