<template>
    <div class="updateseek">
        <div class="mychannel">
            <span>我的频道</span>
            <a class="closebtn" @click="gomyseek"></a>
        </div>
        <div class="upbtn">
            <span>{{upleftext}}</span>
            <span @click="updateseek">{{uprighttext}}</span>
        </div>
        <ul id="sortypelist" class="sortypelist">
            <li :class="`animated ${animate}`" :_id="`${item._id}`" v-for="( item, index ) in typelist" :key="index" :typesort="`${item.sort}`" @click="deletegoseek(item)">
                <div class="delete_c" v-show="showdelete"><img src="../../static/img/delete_c.png"/></div>
                <div>{{item.seekname}}</div>
            </li>
        </ul>
    </div>
</template>

<script>
    import { mapState,mapMutations } from 'vuex'
    import util from 'src/util/util.js'
    import { api_get_seek, api_del_seekname, api_update_seeksort } from 'src/model/api.js'
    import Sortable from '../../static/js/sortable.js'
    import appConfigs from 'src/configs'

    export default {
        name: 'updateseek',
        props: [],
        data() {
            return {
                animate:'',
                sortplug:'',
                showdelete:false,//是否展示删除按钮
                upleftext:'点击进入频道',
                uprighttext:'编辑',
                typelist: []
            }
        },
        components: {},
        created() {

        },
        computed: {

        },
        activated() {
            util.initdata(this);
            this.getseek();
        },
        methods: {
            //获取个人类别列表
            async getseek() {
                try {
                    let res = await api_get_seek();
                    this.typelist = res.result;
                    console.log(this.typelist)
                    this.$nextTick(() => {

                    });
                } catch (err) {

                }
            },
            //删除类别
            async delseek(params) {
                try{
                    let res = await api_del_seekname(params);
                    this.typelist.forEach((item)=> {
                        if(item._id == params._id){
                            this.typelist.pop(item);
                        }
                    });
                } catch (err){
                    util.toastinfo('删除失败');
                }
            },
            //修改顺序
            async update_seeksort(params){
                try{
                    let res = await api_update_seeksort(params);
                    console.log(res)
                } catch (err){
                    util.toastinfo('编辑顺序失败');
                }
            },
            //启动拖拽
            start_drag(){
                let byId = document.getElementById('sortypelist')
                this.sortplug = Sortable.create(byId, {
                    group: "words",
                    animation: 150,
                    onAdd: function(evt) {},
                    onUpdate: function(evt) {},
                    onRemove: function(evt) {},
                    onStart: function(evt) {},
                    onEnd: function(evt) {}
                });
            },
            //编辑
            updateseek(){
                if(this.uprighttext == '编辑'){
                    this.showdelete = true;
                    this.uprighttext = '完成';
                    this.upleftext = '拖拽可以排序';
                    this.animate = 'pulse';
                    this.start_drag();
                    setTimeout(()=>{
                        this.animate = '';
                    },1000);
                }else{
                    this.showdelete = false;
                    this.uprighttext = '编辑';
                    this.upleftext = '点击进入频道';
                    this.animate = '';
                    this.sortplug.destroy();

                    let arr = this.getsort();
                    //完成时调用修改顺序
                    this.update_seeksort({'updatearry':arr});
                }
            },
            //获取调整后的顺序
            getsort(){
                let _arr = [];
                $('#sortypelist').find('li').forEach((item)=>{
                    let _id = $(item).attr('_id');
                    let obj = {'_id':_id};
                    _arr.push(obj);
                });
                return _arr;
            },
            //返回
            gomyseek(){
                this.$router.go(-1);
            },
            //删除频道和进入频道
            deletegoseek(item){
                if(this.showdelete){
                    this.$messagebox.confirm('确定要删除此类别？','').then(() => {
                        this.delseek({'_id':item._id});
                    },() => {

                    });
                }else{
                    this.$router.push({name:'myseek',query:{'querytype':JSON.stringify(item)}});
                }
            }
        },
        mounted() {

        }
    }
</script>

<style lang="scss" scoped>
    @import 'static/css/common_color.scss';
    .sortable-ghost {
        opacity: .2;
    }

    .updateseek {
        .upbtn{
            margin-top: 3rem;
            margin-left: 1rem;
            margin-right: 1rem;
            display: flex;
            height: 2rem;
            line-height: 2rem;
            justify-content: space-between;
            >span:nth-child(1){
                font-size:1.2rem;
                color:$grey_c;
            }
            >span:nth-child(2){
                font-size: 1.4rem;
                border: 1px solid red;
                color: red;
                width: 4rem;
                height: 1.8rem;
                line-height: 1.8rem;
                text-align: center;
                border-radius: 2rem;
            }
        }
        .mychannel{
            >span{
                font-size:1.6rem;
                position: relative;
                left: 1rem;
                top: 1.4rem;
            }
        }
        ul {
            display: flex;
            justify-content: flex-start;
            flex-wrap: wrap;
            min-width: 320px;
        }
        ul>li {
            width: 23%;
            position: relative;
            margin-left: 1.5%;
            min-width: 5.2rem;
            font-size: 1.4rem;
            text-align: center;
            display: inline-block;
            margin-top: 2rem;
            >div {
                background-color: $bottom_c;
                border: 1px solid #ededed;
                width: 80%;
                height: 3rem;
                line-height: 3rem;
                border-radius: 3px;
                margin: 0 auto;
            }
        }
        .sortypelist{
            .delete_c{
                width: 1.7rem;
                height: 1.7rem;
                position: absolute;
                right: 0;
                top: -0.5rem;
                background-color: rgba(0,0,0,0);
                border: none;
                line-height: 0;
            }
        }
    }
</style>
