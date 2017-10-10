<template>
  <div class="topseek" v-show="myseek.ishasdata">
    <mt-navbar v-model="active">
        <div class="swiper-container">
            <div class="swiper-wrapper">
                <mt-tab-item class="swiper-slide" :key="index" :id="`tab-container${index}`" v-for="( item, index ) in typelist">
                    <div class="tab" @click="checktab(item)">
                        <div class="seektype">{{item.seekname}}</div>
                    </div>
                </mt-tab-item>
            </div>
        </div>
    </mt-navbar>
    <div class="updateseek" @click="goupdateseek()"><div class="minus"></div></div>
  </div>
</template>

<script>
import { api_get_seek } from 'src/model/api.js'
import { mapState, mapMutations } from 'vuex'
import util from 'src/util/util.js'
import appConfigs from 'src/configs'

export default {
    name: 'topseek',
    props : [],
    data () {
        return {
            active:'tab-container0',
            typelist:[{'seekname':'全部','type':'','_id':''}]
        }
    },
    computed:{
        ...mapState([
            'myseek',
            'userinfo'
        ])
    },
    activated(){
        util.initdata(this);
        this.getseek();
    },
    methods : {
        ...mapMutations({
            SAVE_MY_SEEK: 'SAVE_MY_SEEK'//个人分类
        }),
        //获取个人类别列表
        async getseek(){
            try{
                let res = await api_get_seek();
                this.typelist = this.typelist.concat(res.result);

                this.$nextTick(() => {
                    let swiper = new Swiper('.swiper-container', {
                        pagination: '.swiper-pagination',
                        slidesPerView: 5,
                        paginationClickable: false,
                        spaceBetween: 0
                    });
                    $('.topseek .swiper-wrapper').css('transform','translate3d(0px, 0px, 0px)');
                    //查询后如果有类别只切换样式和存类别 查询在topseek
                    let obj = this.$route.query.querytype&&JSON.parse(this.$route.query.querytype);
                    if(obj){
                        this.typelist.forEach((item, index) => {
                            if(item.type == obj.type){
                                this.active = 'tab-container'+index;
                            }
                        });
                    }
                });
            }catch (err) {

            }
        },
        //点击类别
        checktab(item){
            this.SAVE_MY_SEEK({'sel_type':item.type, '_id':item._id});
            util.vueEvent.$emit("refreshseek");
        },
        //修改类别
        goupdateseek(){
            if(this.userinfo._id){
                this.$router.push({'name':'updateseek'});
            }else{
                util.toastinfo('无法获取类别');
            }
        }
    },
    mounted(){

    }
}

</script>

<style lang="scss" scoped>
  @import 'static/css/common_color.scss';
    .topseek{
        border-bottom: 1px solid $bord_c;
        background-color:$wihte_c;
        position: fixed;
        z-index: 1;
        width: 100%;
        .updateseek{
            border-radius: 5rem;
            box-shadow: -3px 0px 3px $bord_c;
            background-color:$wihte_c;
            width: 4rem;
            height: 4rem;
            position: absolute;
            top: 0;
            right: 0;
            z-index: 1;
            .minus{
                position: absolute;
                top: 1rem;
                right: 2.5rem;
            }
            .minus:before{
                position: absolute;
                content: ' ';
                background:url('../../static/img/graytype.png');
                height: 2.6rem;
                width: 1.8rem;
                top: 0;
                background-size: 100%;
                background-repeat: no-repeat;
            }
        }
    }
    .mint-tab-item{
        flex:none;
    }
    .mint-navbar{
         margin-right: 4rem;
    }
    .mint-navbar .mint-tab-item.is-selected {
        border-bottom: 2px solid $toutiao_r;
        .tab>div {
            color: $toutiao_r!important;
        }
    }
    .tab >div{
        font-size:1.6rem;
        color:$black_c;
    }
    /*types滑动样式*/
    .seektype{

    }
    .swiper-container {
        width: 100%;
        height: 4rem;
        border-bottom: 1px solid $bord_c;
    }
    .swiperSlideActive{
        color:$toutiao_r!important;
    }
    .swiper-slide {
        color:$grey_c;
        font-size: 1rem;
        text-align: center;
        background: $wihte_c;
        box-sizing:border-box;
        border:1px solid $wihte_c;
        /* Center slide text vertically */
        display: flex;
        -webkit-box-pack: center;
        justify-content: center;
        align-items: center;
    }
</style>
