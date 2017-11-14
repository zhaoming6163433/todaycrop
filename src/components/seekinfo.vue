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
                    <li v-for="(item, index) in seeklist" :key="index" @click="godetail(item)">
                        <div class="title ellipisis2">{{ item | titlef }}</div>
                        <div class="logo"><img :src="item._urlinfo&&item._urlinfo.logoimg || defaultimg" @error="loaderrimg" @load="loadimg"/></div>
                        <div class="domain"><span>{{ item.domain }}</span><img :src="`http://statics.dnspod.cn/proxy_favicon/_/favicon?domain=${item.domain}`" @error="loaderrimg" @load="loadimg" type="logogray"/></div>
                        <div class="createdate"><span>创建日期</span><span>{{ item.createTime | timedatehandle }}</span><span>类别：{{[item.type,myseek] | typenamef}}</span></div>
                        <div class="belongseek" @click="belongseek(item,$event)">归类</div>
                        <div class="setpublic" @click="setPublicInfo(item,$event)"><div v-if="item.setpublic" class="pubdiv">公开</div><div v-else class="pridiv">私有</div></div>
                        <div class="delete" @click="deleteInfo(item,$event)"><img src="../../static/img/delete.png"/></div>
                    </li>
                </ul>
                <loadbottom v-show="showbottom" :bindid="bindid"></loadbottom>
                <loadingcmp v-show="loading"></loadingcmp>
            </mt-loadmore>
        </section>
        <seekpopup  :classtypestop="classtypestop"></seekpopup>
        <nodatac :text="nodatacobj.text"  :type="1" :nodataimg="nodatacobj.nodataimg" v-show="shownodata"></nodatac>
    </div>
</template>

<script>
import { api_user_islogin, api_get_seekinfo, api_delWebUrlInfo, api_set_addr_pub } from 'src/model/api.js'
import { mapState, mapMutations } from 'vuex'
import util from 'src/util/util.js'
import nodatac from 'src/components/nodatac'
import seekpopup from 'components/seekpopup'
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
            classtypestop:200,//类别选择默认距离顶部距离
            nodatacobj:{
                text:'',
                nodataimg:appConfigs.assetsPublicPath+'/static/img/no_img_middle.png'
            },
            maxlength:10,
            pageNum:1,
            totalpage:0,//共几页
            shownodata:false,//判断列表是否有数据
            defaultimg: appConfigs.assetsPublicPath+'/static/img/picturedefault.png',
            totallist:[],//当前返回总集
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
        },
        typenamef([val,list]){
            let name = '暂无';
            try{
                for(var i=0; i<list.typelist.length; i++){
                    var item = list.typelist[i];
                    if(val === ''){
                        name = '暂无';
                        break;
                    }else if(item.type == val){
                        name = item.seekname;
                        break;
                    }
                }
            }catch(e){}

            return name;
        }
    },
    components: {
        nodatac,
        loadingcmp,
        loadbottom,
        seekpopup
    },
    created(){

    },
    computed:{
        ...mapState([
            'userinfo',
            'myseek',
            'seeklist'
        ])
    },
    activated(){
        //每次都清空数据
        util.initdata(this);
        util.vueEvent.$emit("popupVisibleTypes",false);
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
            SAVE_MY_SEEK: 'SAVE_MY_SEEK',//个人分类
            SAVE_SEEK_LIST: 'SAVE_SEEK_LIST'//分类列表信息
        }),
        //是否登录
        async get_user_islogin(callback){
            try{
                let res = await api_user_islogin();
                this.SAVE_USER_INFO(res.result);
                callback(res.result._id);
            }catch (err) {
                this.SAVE_USER_INFO({});
                this.SAVE_SEEK_LIST([]);
                if(err.code == 1000){
                    this.nodatacobj.text = '请登录后查看'
                }else{
                    this.nodatacobj.text = '啊哦！网络请求失败了'
                }
                this.shownodata = true;
            }
        },
        //查询分类列表
        async get_seekinfo(params,callback){
            try{
                if(this.myseek.sel_type || this.myseek.sel_type===0){
                    params.typeid = this.myseek._id;
                }

                let res = await api_get_seekinfo(params);
                util.closeloading();
                console.log('-----个人分类列表-----');
                console.log(res.result);
                this.loading = false;
                this.totalpage = res.totalpage;
                this.totallist = this.totallist.concat(res.result);
                this.SAVE_SEEK_LIST(this.totallist);
                if(res.result.length == 0){
                    this.shownodata = true;
                    this.nodatacobj.text = '暂无数据';
                }else{
                    this.shownodata = false;
                }
            }catch (err) {
                this.SAVE_SEEK_LIST([]);
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
                util.vueEvent.$emit("refreshseeklist",params);
            }catch (err) {
                util.toastinfo('删除失败');
            }
        },
        //公开地址
        async set_addr_pub(params,callback){
            util.showloading();
            try{
                let res = await api_set_addr_pub(params);
                callback(params.setpublic);
                util.closeloading();
                util.toastinfo('设置成功');
            }catch (err) {
                util.toastinfo('设置失败');
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
                if(this.totallist.length>5){
                    this.showbottom = true;
                }else{
                    this.showbottom = false;
                }
            }
        },
        //跳转详情
        godetail(item){
            let url = '';
            if(item._urlinfo && item._urlinfo._id && item._urlinfo.readability == true){
                url = appConfigs.ssrurl+"/article/"+item._urlinfo._id;
                this.$router.push({name:'article',query:{'url':url}});
            }else{
                url = item.url;
                window.location.href = url;
                //window.open(url,'_blank');
            }
        },
        //归纳分类
        belongseek(item,e){
            e.stopPropagation();
            this.classtypestop = $(e.currentTarget).offset().top+$(e.currentTarget).height()-$(window).scrollTop()+5;
            util.vueEvent.$emit("popupVisibleTypes",true,item._id);
        },
        //删除
        deleteInfo(item,e){
            e.stopPropagation();
            this.$messagebox.confirm('您确定要删除该条地址？','').then(() => {
                let params = {url:item.url,_id:item._id,logoimg:item._urlinfo&&item._urlinfo.logoimg}
                this.get_delWebUrlInfo(params);
            },() => {

            });
        },
        //设置公开
        setPublicInfo(item,e){
            e.stopPropagation();
            let tip = '';
            let flag = false;
            if(item.setpublic){
                tip = '您确定要撤销公开该条地址？';
                flag = false;
            }else{
                tip = '您确定要公开该条地址？'
                flag = true;
            }
            this.$messagebox.confirm(tip,'').then(() => {
                let params = {_id:item._id, setpublic:flag}
                this.set_addr_pub(params,(isflag)=>{
                    item.setpublic = isflag;
                });
            },() => {

            });
        }
    },
    mounted(){
        //刷新页面
        util.vueEvent.$on("refreshseek", () => {
            util.initdata(this);
            util.showloading();
            this.get_seekinfo({id:this.userinfo._id, pageNum:1, pageSize:this.maxlength});
        });
        //监听删除和设置分类后刷新dom
        util.vueEvent.$on("refreshseeklist", (params) => {
            this.seeklist.forEach((item,index) => {
                if(item._id == params._id){
                    console.log('delete')
                    this.seeklist.splice(index,1);
                }
            });
            if(this.seeklist.length==0){
                this.shownodata = true;
                this.nodatacobj.text = '暂无数据';
            }
        });
        //刷新时就不跳转了只改变按钮样式
        util.vueEvent.$emit("homebar",'myseek');
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
                height: 11rem;
                overflow: hidden;
                >div{
                    position:absolute;
                }
            }
            .title{
                width: 66%;
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
                    max-width: 55%;
                }
                img{
                    width: 1.1rem!important;
                    margin-left:0.5rem;
                    vertical-align: middle;
                }
            }
            .createdate{
                bottom: 1rem;
                font-size: 1.2rem;
                color:$grey_c;
                >span:nth-child(2){
                    margin-left:1rem;
                    margin-right:1rem;
                }
            }
            .belongseek{
                right: 6rem;
                width: 2.4rem;
                bottom: 0.9rem;
                font-size: 1rem;
                text-align: center;
                border-radius: 5px;
                color: $grey_c;
                border: 1px solid $bord_c;
            }
            .delete{
                right: 0;
                width: 1.5rem;
                bottom: 0.5rem;
            }
            .setpublic{
                right: 2.5rem;
                width: 2.4rem;
                bottom: 0.9rem;
                font-size: 1rem;
                text-align: center;
                .pubdiv{
                    border-radius: 5px;
                    color: $toutiao_r;
                    border: 1px solid $toutiao_r;
                }
                .pridiv{
                    border-radius: 5px;
                    color: $grey_c;
                    border: 1px solid $bord_c;
                }
            }
        }
    }
</style>
