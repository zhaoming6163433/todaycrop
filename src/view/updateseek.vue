<template>
    <div class="updateseek">
        <div class="mychannel">
            <span>我的频道</span>
            <a class="closebtn"></a>
        </div>
        <div class="upbtn">
            <span>拖拽可以排序</span>
            <span>{{uptext}}</span>
        </div>
        <ul id="sortypelist">
            <li v-for="( item, index ) in typelist" :key="index" :typesort="`${item.sort}`">
                <div>{{item.seekname}}</div>
            </li>
        </ul>
    </div>
</template>

<script>
    import { mapState,mapMutations } from 'vuex'
    import util from 'src/util/util.js'
    import { api_get_seek } from 'src/model/api.js'
    import Sortable from '../../static/js/sortable.js'
    import appConfigs from 'src/configs'

    export default {
        name: 'updateseek',
        props: [],
        data() {
            return {
                uptext:'编辑',
                typelist: []
            }
        },
        components: {},
        created() {

        },
        computed: {

        },
        activated() {
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
                        let byId = document.getElementById('sortypelist')
                        Sortable.create(byId, {
                            group: "words",
                            animation: 150,
                            onAdd: function(evt) {},
                            onUpdate: function(evt) {},
                            onRemove: function(evt) {},
                            onStart: function(evt) {},
                            onEnd: function(evt) {}
                        });
                    });
                } catch (err) {

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
            margin-top: 2rem;
            display: flex;
            justify-content: flex-start;
            flex-wrap: wrap;
            min-width: 320px;
        }
        ul>li {
            width: 23%;
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
    }
</style>
