<template>
    <div class="seekpopup">
        <mt-popup :class="(innerheight/2-classtypestop)>0?'classtypes':'classtypes1'"  v-bind:style="{top: classtypestop + 'px' }" v-model="popupVisibleTypes">
            <div class="classtypesin">
                <div v-for="(item, index) in myseek.typelist" :key="index" v-if="item._id" @click="querytypes(item,$event)">
                    <div class="ellipisis"  v-bind:class="{ borderstyle: index<myseek.typelist.length-1 }">{{item.seekname}}</div>
                </div>
            </div>
        </mt-popup>
    </div>
</template>

<script>
import util from 'src/util/util.js'
import { api_up_url_seek } from 'src/model/api.js'
import { mapState, mapMutations } from 'vuex'

export default {
    name: 'seekpopup',
    props : ['classtypestop'],
    data () {
        return {
            innerheight:'1',
            popupVisibleTypes:false,//默认不展示分类
            aticleid:'',//文章id
            clicktypeflag:true//防止选择分类无限点击
        }
    },
    computed:{
        ...mapState([
            'myseek',
            'seeklist'
        ])
    },
    activated(){
        util.initdata(this);
        this.innerheight = window.innerHeight;
    },
    watch: {
        popupVisibleTypes(val){
            if(!val){
                util.allscroll();
            }else{
                util.forbidscroll();
            }
        }
    },
    methods : {
        ...mapMutations({
            SAVE_SEEK_LIST: 'SAVE_SEEK_LIST'//分类列表信息
        }),
        async up_url_seek(params){
            try{
                let res = await api_up_url_seek(params);
                this.popupVisibleTypes = false;
                //如果不是全部就删除，当前类别提示设置不了
                if(this.myseek.sel_type || this.myseek.sel_type===0){
                    util.vueEvent.$emit("refreshseeklist",params._id);
                }
                this.clicktypeflag = true;
                util.toastinfo('设置成功');
            }catch (err) {
                this.clicktypeflag = true;
                util.toastinfo('设置失败');
            }
        },
        querytypes(item,e){
            if(item.type == this.myseek.sel_type){
                util.toastinfo('已在当前类别中');
            }else{
                if(this.clicktypeflag){
                    this.clicktypeflag = false;
                    this.up_url_seek({'_id':this.aticleid,'typeid':item._id,'type':item.type});
                }
            }
        }
    },
    mounted(){
        util.vueEvent.$on("popupVisibleTypes", (flag,_id) => {
            $('.classtypesin').scrollTop(0);
            this.aticleid = _id;
            this.popupVisibleTypes = flag;
        });
    }
}

</script>

<style lang="scss" scoped>
@import 'static/css/common_color.scss';
.seekpopup{
    .borderstyle{
        border-bottom:1px solid $bord_c;
    }
    .classtypes{
        transform: translate3d(-50%, 0%, 0);
        width: 12rem;
        border-radius: 8px;
        padding: 0.6rem;
        font-size: 1.6rem;
        right: -2rem;
        left: initial;
        .classtypesin{
            height: 17rem;
            overflow: auto;
            >div{
                height: 3rem;
                line-height: 3rem;
                text-align: left;
                width:100%;
                display: inline-block;
                font-size: 1.6rem;
            }
        }
    }
    .classtypes:before{
        display: inline-block;
        width: 0;
        height: 0;
        border: solid transparent;
        border-width: 0.7rem;
        border-bottom-color: #fff;
        content: "";
        position: absolute;
        top: -1.3rem;
        right: 3.1rem;
    }
    .classtypes1{
        transform: translate3d(-50%, -115%, 0);
        width: 12rem;
        border-radius: 8px;
        padding: 0.6rem;
        font-size: 1.6rem;
        right: -2rem;
        left: initial;
        .classtypesin{
            height: 17rem;
            overflow: auto;
            >div{
                height: 3rem;
                line-height: 3rem;
                text-align: left;
                width:100%;
                display: inline-block;
                font-size: 1.6rem;
            }
        }
    }
    .classtypes1:before{
        display: inline-block;
        width: 0;
        height: 0;
        border: solid transparent;
        border-width: 0.7rem;
        border-top-color: #fff;
        content: "";
        position: absolute;
        bottom: -1.3rem;
        right: 3.1rem;
    }
}
</style>
