<template>
  <div class="collecturl" v-show="collecturl.showcollecturl">
      <div class="popover-new-header">
        <a class="popover-new-close" href="#"></a><h2>保存项目到个人分类</h2>
        <a class="closebtn" @click="closepage"></a>
      </div>
      <div>
        <mt-field label="" :attr="{ maxlength: 1000 }" placeholder="请输入网址" type="url" v-model="$store.state.collecturl.website"></mt-field>
      </div>
      <div><mt-button type="danger" class="savebtn" @click="saveUrl()">保存</mt-button></div>
  </div>
</template>

<script>
import { api_add_website } from 'src/model/api.js'
import util from 'src/util/util.js'
import appConfigs from 'src/configs'
import { mapState, mapMutations } from 'vuex'

export default {
    name: 'collecturl',
    props : [],
    data () {
        return {

        }
    },
    components: {

    },
    computed: {
        ...mapState([
            "collecturl",
            "userinfo"
        ])
    },
    methods : {
        ...mapMutations({
            SAVE_USER_INFO: 'SAVE_USER_INFO',//用户信息
            SHOW_COLLECT_URL: 'SHOW_COLLECT_URL'//展示新增地址
        }),
        //添加网址
        async get_add_website(params){
            util.showloading();
            try{
                let res = await api_add_website(params);
                util.closeloading();
                util.toastinfo(res.message);
                this.SHOW_COLLECT_URL({ 'flag': false ,'website':''});
                console.log('-----保存成功-----');
                console.log(res);
            }catch (err) {
                util.toastinfo(err.message||'保存失败');
            }
        },
        //返回
        closepage(){
        this.SHOW_COLLECT_URL({ 'flag': false ,'website':''});
        },
        //保存
        saveUrl(){
            if(this.userinfo._id){
                let params = {'url':this.collecturl.website,'type':'','typeid':''};
                this.get_add_website(params);
            }else{
                util.toastinfo('请先登录');
            }
        }
    },
    created(){

    },
    mounted(){

    }
}

</script>

<style lang="scss" scoped>
@import 'static/css/common_color.scss';
.collecturl{
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
