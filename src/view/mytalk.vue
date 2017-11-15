<template>
    <div class="mytalk">
        <section class="talkc">
            <div slot="top" class="mint-loadmore-top"><img src="../../static/img/moreloading.gif" class="loadingimg" /></div>
            <mt-loadmore class="loadmore" :topDistance="50" :top-method="loadTop"  @top-status-change="handleTopChange" topLoadingText="" topPullText="" topDropText="" ref="loadmore">
                <ul>
                    <li :class="`talkli${content.who}`" v-for="(content,index) in talklist" :key="index">
                        <div class="name"><div><img v-if="content.who==0" src="../../static/img/user_def_head.png"/><img v-else src="../../static/img/xiaobing.png"/></div></div>
                        <div class="contental">
                            <div>{{content.text}}</div>
                            <div><a :href="content.url">{{content.url}}</a></div>
                        </div>
                    </li>
                </ul>
            </mt-loadmore>

        </section>
        <div class="fixedinput"><input type="search" maxlength="30" v-model="contentext" @keyup.enter="inputext"/></div>
    </div>
</template>

<script>
import { api_get_tuling_bot, api_user_islogin } from 'src/model/api.js'
import { mapState, mapMutations } from 'vuex'
import util from 'src/util/util.js'
import appConfigs from 'src/configs'

export default {
    name: 'mytalk',
    props : [],
    data () {
        return {
            num:1,//下拉次数默认1次了
            topStatus:'',//下拉状态
            userid:'',//用户id
            contentext:'',//输入内容
            talklist:[],//聊天数组
        }
    },
    activated(){
        //初始化num
        this.num = 1;
        //取缓存里面的数据
        if(localStorage.getItem("talklist")!=null&&localStorage.getItem("talklist")!='null'&&localStorage.getItem("talklist")!=''){  //取缓存
            let talklist = JSON.parse(localStorage.getItem("talklist"));
            this.talklist = talklist.slice(talklist.length-15);
        }
        this.$nextTick(() => {
            $('.talkc').scrollTop($('.talkc')[0].scrollHeight);
        });
        if(this.userinfo._id){
            this.userid = this.userinfo._id;
        }else{
            this.get_user_islogin();
        }
    },
    components: {

    },
    computed:{
        ...mapState([
            'userinfo'
        ])
    },
    methods : {
        ...mapMutations({
            SAVE_USER_INFO: 'SAVE_USER_INFO'//用户信息
        }),
        //图灵机器人
        async get_tuling_bot(params){
            try{
                let res = await api_get_tuling_bot(params);
                this.talklist.push({text:res.text,url:res.url,who:'1'});
                this.savelocalstorage({text:res.text,url:res.url,who:'1'});
                this.$nextTick(() => {
                    $('.talkc').scrollTop($('.talkc')[0].scrollHeight);
                });
            }catch (err) {

            }
        },
        //是否登录
        async get_user_islogin(){
            try{
                let res = await api_user_islogin();
                this.SAVE_USER_INFO(res.result);
                this.userid = res.result._id;
            }catch (err) {
                console.log(err)
                this.userid = '';
                this.SAVE_USER_INFO({});
            }
        },
        //输入内容
        inputext(){
            if(this.contentext.trim()!=''){
                this.talklist.push({text:this.contentext,url:'',who:'0'});
                this.savelocalstorage({text:this.contentext,url:'',who:'0'});
                this.$nextTick(() => {
                    $('.talkc').scrollTop($('.talkc')[0].scrollHeight);
                });
                this.get_tuling_bot({'info':this.contentext,'userid':this.userid});
                this.contentext = '';
            }
        },
        //存本地缓存
        savelocalstorage(item){
            if(window.localStorage){
                let lastspace = 1024 * 1024 * 5 - unescape(encodeURIComponent(JSON.stringify(localStorage))).length;
                if(lastspace>1000000){
                    try{
                        let talklist = [];
                        if(localStorage.getItem("talklist")!=null&&localStorage.getItem("talklist")!='null'&&localStorage.getItem("talklist")!=''){  //取缓存
                            talklist = JSON.parse(localStorage.getItem("talklist"));
                        }
                        talklist.push(item);
                        localStorage.setItem("talklist", JSON.stringify(talklist));
                    }catch(e){
                    }
                }else{
                    let talklist = [];
                    if(localStorage.getItem("talklist")!=null&&localStorage.getItem("talklist")!='null'&&localStorage.getItem("talklist")!=''){  //取缓存
                        talklist = JSON.parse(localStorage.getItem("talklist"));
                        //删除个10条 10条不够就不删除也不tm存了
                        if(talklist.length>10){
                            talklist.splice(0,10);
                            talklist.push(item);
                            localStorage.setItem("talklist", JSON.stringify(talklist));
                        }
                    }
                }
            }
        },
        //下拉读取本地缓存
        loadTop() {
            if(localStorage.getItem("talklist")!=null&&localStorage.getItem("talklist")!='null'&&localStorage.getItem("talklist")!=''){  //取缓存
                let talklist = JSON.parse(localStorage.getItem("talklist"));
                this.num++;
                let _num = (talklist.length-15*this.num)<0?0:(talklist.length-15*this.num);
                this.talklist = talklist.slice(_num);
                this.$refs.loadmore.onTopLoaded();
            }
        },
        //顶部状态
        handleTopChange(status) {
            this.topStatus = status;
        }
    },
    created(){

    },
    mounted(){
        //刷新时就不跳转了只改变按钮样式
        util.vueEvent.$emit("homebar",'mytalk');
        //初始进来问问说句话
        this.talklist.push({text:'你好老铁！我是问问，很高兴为您服务！',url:'',who:'1'});
    }
}

</script>
<style lang="scss" scoped>
 
.mytalk{
    bottom: 55px;
    height: auto;
    .talkc{
        background-color:$bottom_c;
        position: absolute;
        width: 100%;
        top: 0;
        bottom: 40px;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
        .loadingimg{
            width: 1.8rem;
            position: absolute;
            top: 15px;
        }
        ul{
            background-color:$bottom_c;
        }
        ul>li{
            margin-top: 1rem;
            position: relative;
            list-style-type:none;
            display: inline-block;
            width:100%;
            a{
                width: 100%;
                word-wrap: break-word;
                color:$yellow_c;
            }
        }
        .talkli0{
            .name{
                position: relative;
                height:3rem;
                width:100%;
                >div{
                    width: 3rem;
                    height: 3rem;
                    border-radius: 100%;
                    position: absolute;
                    right: 1rem;
                    background-color: $wihte_c;
                    overflow: hidden;
                }
            }
            .contental{
                background-color:$toutiao_r;
                display: inline-block;
                float: right;
                border-radius: 5px;
                padding: 1rem;
                position: relative;
                top: -3rem;
                right: 18%;
                color: $yellow_c;
                max-width: 58%;
            }
        }
        .talkli1{
            .name{
                position: relative;
                height:3rem;
                width:100%;
                display:inline-block;
                >div{
                    width: 3rem;
                    height: 3rem;
                    border-radius: 100%;
                    position: absolute;
                    left: 1rem;
                    background-color: $wihte_c;
                    overflow: hidden;
                }
            }
            .contental{
                background-color:$toutiao_r;
                display: inline-block;
                left: 18%;
                float: left;
                border-radius: 5px;
                padding: 1rem;
                position: relative;
                top: -3rem;
                color: $yellow_c;
                max-width: 58%;
            }
        }
    }
    .fixedinput{
        position:absolute;
        bottom:0;
        width:100%;
        height: 4rem;
        background-color:$nav_tabbar;
        border-top:1px solid $bord_c;
        input{
            outline: none;
            border: none;
            width: 80%;
            left: 10%;
            top: 0.6rem;
            text-indent: 1rem;
            font-size: 1.6rem;
            height: 2.5rem;
            position: relative;
            background-color:$nav_tabbar;
            border-bottom:1px solid $inputborder_c;
        }

    }
}
</style>
