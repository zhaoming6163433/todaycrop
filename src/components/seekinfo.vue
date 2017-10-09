<template>
    <div class="seekinfo">
        <!--内容-->
        <section class="content" id="seekinfo" v-show="myseek.ishasdata">
            <mt-loadmore class="loadmore" :top-method="loadTop"  topDropText="释放刷新" ref="loadmore">
                <ul :class="showbottom?'':'marginbt'"
                    v-infinite-scroll="loadMore"
                    infinite-scroll-disabled="loading"
                    infinite-scroll-immediate-check="false"
                    infinite-scroll-distance="10">
                    <li v-for="item in seeklist" @click="godetail(item)">
                        <div class="title ellipisis2">{{ item | titlef }}</div>
                        <div class="logo"><img :src="item._urlinfo&&item._urlinfo.logoimg || defaultimg" @error="loaderrimg" @load="loadimg"/></div>
                        <div class="domain"><span>{{ item.domain }}</span><img :src="`http://statics.dnspod.cn/proxy_favicon/_/favicon?domain=${item.domain}`" @error="loaderrimg" @load="loadimg" type="logogray"/></div>
                        <div class="delete" @click="deleteInfo(item,$event)"><img src="../../static/img/delete.png"/></div>
                    </li>
                </ul>
                <loadbottom v-show="showbottom" :bindid="bindid"></loadbottom>
                <loadingcmp v-show="loading"></loadingcmp>
            </mt-loadmore>
        </section>
        <nodatac :text="nodatacobj.text"  :type="1" :nodataimg="nodatacobj.nodataimg" v-show="shownodata"></nodatac>
    </div>
</template>

<script>
import { api_user_islogin, api_get_seekinfo, api_delWebUrlInfo } from 'src/model/api.js'
import { mapState, mapMutations } from 'vuex'
import util from 'src/util/util.js'
import nodatac from 'src/components/nodatac'
import loadingcmp from 'components/loadingcmp'
import loadbottom from 'components/loadbottom'
import appConfigs from 'src/configs'

export default {
    name: 'seekinfo',
    props : [],
    data () {
        return {
            loading:false,
            active:'tab-container0',
            bindid:'seekinfo',//滚动绑定页面
            showbottom:false,//是否已经到底
            nodatacobj:{
                text:'',
                nodataimg:appConfigs.assetsPublicPath+'/static/img/no_img_middle.png'
            },
            maxlength:10,
            pageNum:1,
            totalpage:0,//共几页
            shownodata:false,//判断列表是否有数据
            defaultimg: appConfigs.assetsPublicPath+'/static/img/picturedefault.png',
            totallist:[],//当前返回总集合
            seeklist:[],
            userInfo:{}
        }
    },
    filters:{
        titlef(val){
            if(val._urlinfo){
                return val._urlinfo.readability ? val._urlinfo.articleres.title : val._urlinfo.url;
            }else{
                return val.url;
            }
        }
    },
    components: {
        nodatac,
        loadingcmp,
        loadbottom
    },
    created(){

    },
    computed:{
        ...mapState([
            'userinfo',
            'myseek'
        ])
    },
    activated(){
        //每次都清空数据
        util.initdata(this);
        this.SAVE_MY_SEEK({'sel_type':'', '_id':'', 'ishasdata':true});
        util.vueEvent.$emit("homebar",'myseek');
        //每次都重新加载，也可以下拉刷新
        util.showloading();
        if(this.userinfo._id){
            //查询当前用户分类列表
            this.get_seekinfo({id:this.userinfo._id, pageNum:1, pageSize:this.maxlength});
        }else{
            this.get_user_islogin( (_id)=> {
                this.get_seekinfo({id:_id, pageNum:1, pageSize:this.maxlength});
            });
        }
    },
    methods : {
        ...mapMutations({
            SAVE_USER_INFO: 'SAVE_USER_INFO',//用户信息
            SAVE_MY_SEEK: 'SAVE_MY_SEEK'//个人分类
        }),
        //是否登录
        async get_user_islogin(callback){
            try{
                let res = await api_user_islogin();
                this.SAVE_USER_INFO(res.result);
                callback(res.result._id);
            }catch (err) {
                this.SAVE_USER_INFO({});
                this.seeklist = [];
                if(err.code == 1000){
                    this.nodatacobj.text = '请登录后查看'
                }else{
                    this.nodatacobj.text = '啊哦！网络请求失败了'
                }
                this.SAVE_MY_SEEK({'ishasdata':false});
                console.log(this.myseek.ishasdata)
                this.shownodata = true;
            }
        },
        //查询分类列表
        async get_seekinfo(params,callback){
            try{
                if(this.myseek.sel_type || this.myseek.sel_type==0){
                    params.type = this.myseek.sel_type;
                    params.typeid = this.myseek._id;
                }

                let res = await api_get_seekinfo(params);
                util.closeloading();
                console.log('-----个人分类列表-----');
                console.log(res.result);
                this.loading = false;
                this.totalpage = res.totalpage;
                this.totallist = this.totallist.concat(res.result);
                this.seeklist = this.totallist;
                if(res.result.length == 0){
                    this.shownodata = true;
                    this.nodatacobj.text = '暂无数据';
                }else{
                    this.shownodata = false;
                }
            }catch (err) {
                this.seeklist = [];
                this.nodatacobj.text = '啊哦！网络请求失败了'
                this.shownodata = true;
            }
            callback?callback():'';
        },
        //删除当前用户文章
        async get_delWebUrlInfo(params){
            util.showloading();
            try{
                let res = await api_delWebUrlInfo(params);
                util.closeloading();
                util.toastinfo('删除成功');
                util.initdata(this);
                this.get_seekinfo({id:this.userinfo._id, pageNum:1, pageSize:this.maxlength});
            }catch (err) {
                util.toastinfo(err.message||'删除失败');
            }
        },
        //下拉刷新
        loadTop() {
            console.log("下拉在执行");
            util.initdata(this);
            this.get_seekinfo({id:this.userinfo._id, pageNum:1, pageSize:this.maxlength},()=>{
                this.$refs.loadmore.onTopLoaded();
            });
        },
        //上拉加载
        loadMore(){
            if(this.pageNum<this.totalpage){
                this.loading = true;
                this.pageNum++;
                this.get_seekinfo({id:this.userinfo._id, pageNum:this.pageNum, pageSize:this.maxlength});
            }else{
                this.showbottom = true;
            }
        },
        //跳转详情
        godetail(item){
            console.log(item._urlinfo)
            if(item._urlinfo && item._urlinfo._id && item._urlinfo.readability == true){
                window.location.href = appConfigs.ssrurl+"/article/"+item._urlinfo._id;
            }else{
                window.location.href = item.url;
            }
        },
        //删除
        deleteInfo(item,e){
            e.stopPropagation();
            this.$messagebox.confirm('您确定要删除该条地址？','').then(() => {
                let params = {url:item.url,userid:this.userinfo._id}
                this.get_delWebUrlInfo(params);
            },() => {

            });
        }
    },
    mounted(){
        util.vueEvent.$on("refreshseek", () => {
            util.initdata(this);
            this.get_seekinfo({id:this.userinfo._id, pageNum:1, pageSize:this.maxlength});
        });
    }
}

</script>

<style lang="scss" scoped>
@import 'static/css/common_color.scss';
    .seekinfo{
        height:100%;
        .loadmore{
            min-height: 100%;
        }
        .content{
            width:100%;
            padding-top: 4rem;
            height:100%;
            background-color:$bottom_c;
            word-wrap: break-word;
            min-width: 24rem;
            ul{
                background-color:$wihte_c;
                padding: 0px 1rem;
            }
            ul>li{
                position:relative;
                border-bottom:1px solid $bord_c;
                height: 9rem;
                overflow: hidden;
                >div{
                    position:absolute;
                }
            }
            .title{
                width: 68%;
                top: 1.2rem;
                font-size: 1.7rem;
            }
            .logo{
                overflow: hidden;
                text-align: center;
                right: 0;
                top: 1.5rem;
                width: 8.5rem;
                height: 5.8rem;
                background-color: #f9f9f9;
            }
            .domain{
                width:100%;
                overflow:hidden;
                top: 5.7rem;
                color:$grey_c;
                span{
                    height: 2rem;
                    line-height: 2rem;
                    display: inline-block;
                    vertical-align: middle;
                    max-width: 57%;
                }
                img{
                    width: 1.1rem!important;
                    margin-left:0.5rem;
                    vertical-align: middle;
                }
            }
            .delete{
                right: 9.5rem;
                width: 1.5rem;
                bottom: 1rem;
            }
        }
    }
</style>
