<template>
  <div class="homechild">
        <section class="publictitle"><div><img src="../../../static/img/jiantou.png"/>为您推荐</div></section>
        <section class="content" id="homechild" >
            <mt-loadmore class="loadmore" :top-method="loadTop"  topPullText="下拉推荐" topLoadingText="推荐中" topDropText="松开推荐" ref="loadmore">
                <rectip></rectip>
                <ul :class="showbottom?'':'marginbt'"
                    v-infinite-scroll="loadMore"
                    infinite-scroll-disabled="loading"
                    infinite-scroll-immediate-check="false"
                    infinite-scroll-distance="10">
                    <li v-for="(item, index) in seeklist" :key="index"  @click="godetail(item)">
                        <div class="title ellipisis2">{{ item | titlef }}</div>
                        <div class="logo"><img :src="item._urlinfo&&item._urlinfo.logoimg || defaultimg" @error="loaderrimg" @load="loadimg"/></div>
                        <div class="domain"><span>{{ item.domain }}</span><img :src="`http://statics.dnspod.cn/proxy_favicon/_/favicon?domain=${item.domain}`" @error="loaderrimg" @load="loadimg" type="logogray"/></div>
                        <div class="timeshow"><span>更新时间 {{ [item.systemtime,item.publictime] | timeago }} </span><span>浏览 {{item.quantity}}</span></div>
                    </li>
                </ul>
                <loadbottom v-show="showbottom" :bindid="bindid" :text="'没有更多推荐了'"></loadbottom>
                <loadingcmp v-show="loading"></loadingcmp>
            </mt-loadmore>
        </section>
        <nodatac :text="nodatacobj.text"  :type="1" :nodataimg="nodatacobj.nodataimg" v-show="shownodata"></nodatac>
  </div>
</template>

<script>
import util from 'src/util/util.js'
import nodatac from 'src/components/nodatac'
import loadingcmp from 'components/loadingcmp'
import loadbottom from 'components/loadbottom'
import appConfigs from 'src/configs'
import rectip from 'components/recommendtip'
import { api_public_article } from 'src/model/api.js'

export default {
    name: 'homechild',
    props : [],
    data () {
        return {
            loading:false,
            bindid:'homechild',//滚动绑定页面
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
            lastlist:[],//最后一次的集合
            seeklist:[]//展示用的数组
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
        loadbottom,
        rectip
    },
    created(){

    },
    activated(){

    },
    methods : {
        //查询公共列表
        //callback在下拉刷新时用 moreupdown是否在没有更多的情况下执行了下拉刷新
        async get_public_article(params,callback,moreupdown){
            let showcomupdate = false;//是否展示还有更新 默认不展示
            try{
                let res = await api_public_article(params);
                util.closeloading();
                console.log('-----个人分类列表-----');
                console.log(res.result);
                this.loading = false;
                this.totalpage = res.totalpage;
                if(callback){
                    //处理下拉推荐
                    let _list = [];
                    _list = _list.concat(res.result);

                    if(moreupdown){
                        //当前页面有新推荐就刷新，没有就展示recomtip
                        let samenum = 0;
                        let resnum = res.result.length;
                        let lastnum = this.lastlist.length;

                        this.lastlist.forEach((item1)=> {
                            res.result.forEach((item2,index)=> {
                                if(item1._id == item2._id){
                                    samenum++;
                                }
                            })
                        });

                        if(samenum==resnum && resnum==lastnum && samenum==lastnum) showcomupdate = true;
                        //有不同的就刷新
                        if(!showcomupdate){
                            this.lastlist.forEach((item1)=> {
                                this.totallist.forEach((item2,index)=> {
                                    if(item1 == item2){
                                        this.totallist.splice(index,1);
                                    }
                                })
                            });
                            this.totallist = _list.concat(this.totallist);
                        }
                    }else{
                        this.totallist = _list.concat(this.totallist);
                    }
                }else{
                    this.totallist = this.totallist.concat(res.result);
                }
                this.seeklist = this.totallist;
                this.lastlist = res.result;
                if(res.result.length == 0){
                    this.shownodata = true;
                    this.nodatacobj.text = '暂无数据';
                }else{
                    this.shownodata = false;
                }
                callback?callback(showcomupdate):'';
            }catch (err) {
                this.seeklist = [];
                this.nodatacobj.text = '啊哦！网络请求失败了'
                this.shownodata = true;
                callback?callback():'';
            }

        },
        //下拉推荐
        loadTop() {
            if(this.pageNum<this.totalpage){
                this.pageNum++;
                this.get_public_article({ pageNum:this.pageNum, pageSize:this.maxlength },()=>{
                    util.vueEvent.$emit("recomtip",'推荐已更新');
                    this.$refs.loadmore.onTopLoaded();
                });
            }else{
                //下拉刷新时查询当前页面是否有新的内容，如果有就在数组尾部增加内容
                this.get_public_article({ pageNum:this.pageNum, pageSize:this.maxlength },(flag)=>{
                    this.$refs.loadmore.onTopLoaded();
                    if(flag){
                        util.vueEvent.$emit("recomtip",'没有更多推荐了');
                    }else{
                        util.vueEvent.$emit("recomtip",'推荐已更新');
                    }
                },true);
            }
        },
        //上拉推荐
        loadMore(){
            if(this.pageNum<this.totalpage){
                this.loading = true;
                this.pageNum++;
                this.get_public_article({ pageNum:this.pageNum, pageSize:this.maxlength });
            }else{
                this.showbottom = true;
            }
        },
        //跳转详情
        godetail(item){
            util.up_quantity(item._id);
            let url = '';
            if(item._urlinfo && item._urlinfo._id && item._urlinfo.readability == true){
                url = appConfigs.ssrurl+"/article/"+item._urlinfo._id;
            }else{
                url = item.url;
            }
            this.$router.push({name:'article',query:{'url':url}});
        }
    },
    mounted(){
        //刷新时就不跳转了只改变按钮样式
        util.vueEvent.$emit("homebar",'homechild');
        //每次都重新加载，也可以下拉刷新
        util.showloading();
        //查询列表
        this.get_public_article({ pageNum:1, pageSize:this.maxlength });
    }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import 'static/css/common_color.scss';
    @keyframes updownanimate{
        0%   {top: -5px}
        100% {top: 5px}
    }
    .homechild{
        height:90%;
        .loadmore{
            min-height: 100%;
        }
        .publictitle{
            width:100%;
            position: fixed;
            z-index: 1;
            >div{
                height: 3rem;
                text-align: center;
                line-height: 3rem;
                background-color:$toutiao_r;
                color:$wihte_c;
                img{
                    position: relative;
                    margin-right: 1rem;
                    width:1.3rem;
                    animation-iteration-count: infinite;
                    animation-duration:1s;
                    animation-direction:alternate;
                    animation-name:updownanimate;
                }
            }
        }
        .content{
            width:100%;
            height:100%;
            padding-top: 3rem;
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
            .timeshow{
                bottom: 1rem;
                font-size: 1.2rem;
                color:$grey_c;
                >span:nth-child(2){
                    margin-left:1rem;
                }
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
