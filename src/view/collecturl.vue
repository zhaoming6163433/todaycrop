<template>
  <div class="collecturl">
      <div class="popover-new-header">
        <a class="popover-new-close" href="#"></a><h2>保存项目到个人分类</h2>
        <a class="closebtn" @click="closepage"></a>
      </div>
      <div>
        <mt-field label="" class="urltype" :id="'addurlinput'" :attr="{ maxlength: 1000 }" placeholder="请输入网址" type="url" v-model="website"></mt-field>
        <div class="seltype" @click="showtype">{{typeitem.name}}</div>
      </div>
      <div><mt-button type="danger" class="savebtn" @click="saveUrl()">保存</mt-button></div>
      <mt-actionsheet class="actionstyle" :actions="typelist" v-model="sheetVisible" cancelText=""></mt-actionsheet>
  </div>
</template>

<script>
import { api_add_website,api_get_seek } from 'src/model/api.js'
import util from 'src/util/util.js'
import appConfigs from 'src/configs'
import { mapState, mapMutations } from 'vuex'

export default {
    name: 'collecturl',
    props : [],
    data () {
        return {
            sheetVisible:false,
            website:'',
            typeitem:{
                name:'选择分类',
                type:'',
                typeid:''
            },
            typelist:[]
        }
    },
    activated(){
        util.initdata(this);
        this.getseek();
        $('#addurlinput').find('input').focus();
    },
    components: {

    },
    computed: {
        ...mapState([
            "userinfo"
        ])
    },
    methods : {
        //获取个人类别列表
        async getseek(){
            let res = await api_get_seek();
            res.result.forEach((item)=> {
                var obj = {
                    name: item.seekname,
                    type: item.type,
                    typeid: item._id,
                    method: this.handltype
                }
                this.typelist.push(obj);
            });
            if(this.typelist.length == 0){
                this.typeitem.name = '暂无分类';
            }else{
                this.typeitem.name = '选择分类';
            }
        },
        //添加网址
        async get_add_website(params){
            util.showloading();
            try{
                let res = await api_add_website(params);
                util.closeloading();
                this.$router.go(-1);
                util.toastinfo('添加成功');
                console.log('-----保存成功-----');
                console.log(res);
            }catch (err) {
                util.toastinfo(err.message||'保存失败');
            }
        },
        //展示分类
        showtype(){
            if(this.typeitem.name != '暂无分类'){
                this.sheetVisible=true;
            }
        },
        //返回
        closepage(){
            this.$router.go(-1);
        },
        //保存
        saveUrl(){
            let params = {'url':this.website,'type':this.typeitem.type,'typeid':this.typeitem.typeid};
            this.get_add_website(params);
        },
        //选择type
        handltype(item){
            console.log(item)
            this.typeitem = item;
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
  padding-top:2rem;
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
    margin-top: 4rem;
    margin-left: 5%;
  }
  .actionstyle{
      max-height: 20rem;
      overflow-y: auto;
  }
  .seltype{
    width: 6rem;
    font-size: 1.4rem;
    margin-left: 1rem;
    color: $black_c;
    margin-top:2rem;
    background-color:$bottom_c;
    border: 1px solid $bord_c;
    height: 3rem;
    line-height: 3rem;
    border-radius: 3px;
    text-align: center;
  }
  .urltype{
      width:100%;
      border-bottom:1px solid $bord_c;
  }
}
</style>
