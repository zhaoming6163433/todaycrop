import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

const state = {
    //存放登录信息 没有时就调用登录接口再一次判断
    userinfo:{
        username:'',
        userid:''
    },
    //个人分类
    myseek:{
        ishasdata:true,
        sel_type:'',
        _id:'',
        typelist:[]//分类列表
    },
    //分类列表信息
    seeklist:[]
}
const mutations = {
    SAVE_USER_INFO(state, obj) {
		state.userinfo = obj;
	},
    SAVE_MY_SEEK(state, obj){
        state.myseek.sel_type = obj.sel_type!=undefined?obj.sel_type:state.myseek.sel_type;
        state.myseek._id = obj._id!=undefined?obj._id:state.myseek._id;
        state.myseek.ishasdata = obj.ishasdata!=undefined?obj.ishasdata:state.myseek.ishasdata;
        state.myseek.typelist = obj.typelist!=undefined?obj.typelist:state.myseek.typelist;
    },
    SAVE_SEEK_LIST(state, arr) {
		state.seeklist = arr;
	}
}
const getters = {

}
const actions = {

}
export default new Vuex.Store({
	state,
	mutations,
	getters,
	actions
})
