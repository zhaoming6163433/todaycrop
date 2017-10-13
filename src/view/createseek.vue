<template>
  <div class="createseek">
      <div class="popover-new-header">
        <a class="popover-new-close" href="#"></a><h2>保存个人类别</h2>
        <a class="closebtn" @click="closepage"></a>
      </div>
      <div>
        <mt-field id="addseekinput" label="" :attr="{ maxlength: 4 }" placeholder="请输入类别，最多四个字符" type="url" v-model="seekname"></mt-field>
      </div>
      <div><mt-button type="danger" class="savebtn" @click="saveUrl()">保存</mt-button></div>
  </div>
</template>

<script>
import { api_add_seekname } from 'src/model/api.js'
import util from 'src/util/util.js'
import appConfigs from 'src/configs'
import { mapState } from 'vuex'

export default {
    name: 'createseek',
    props : [],
    data () {
        return {
            seekname:''
        }
    },
    activated(){
        util.initdata(this);
        $('#addseekinput').find('input').focus();
    },
    components: {

    },
    created(){

    },
    computed: {
        ...mapState([
            "userinfo"
        ])
    },
    methods : {
        //新增类别
        async get_add_seekname(params){
            util.showloading();
            try{
                let res = await api_add_seekname(params);
                util.closeloading();
                this.$router.go(-1);
                util.toastinfo('添加成功');
                console.log('-----保存成功-----');
                console.log(res);
            }catch (err) {
                util.toastinfo(err.message||'保存失败');
            }
        },
        //返回
        closepage(){
            this.$router.go(-1);
        },
        //保存
        saveUrl(){
            if(this.seekname.trim() == ''){
                util.toastinfo('类别不能为空');
            }else{
                let params = {'seekname':this.seekname};
                this.get_add_seekname(params);
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
    padding-top:2rem;
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
