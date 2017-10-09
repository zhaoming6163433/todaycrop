import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

const state = {
    //存放登录信息 没有时就调用登录接口再一次判断
    userinfo:{
        username:'',
        userid:''
    },
	//添加地址
	collecturl:{
		showcollecturl:false,//展示地址收藏
		website:''//地址
	},
	//添加分类
	createseek:{
		showseekname:false,
		seekname:''
    },
    //个人分类
    myseek:{
        ishasdata:true,
        sel_type:'',
        _id:''
    }
}
const mutations = {
    SAVE_USER_INFO(state, obj) {
		state.userinfo = obj;
	},
	SHOW_COLLECT_URL(state, obj) {
		state.collecturl.showcollecturl = obj.flag;
		state.collecturl.website = obj.website;
	},
	SHOW_SEEK_NAME(state, obj) {
		state.createseek.showseekname = obj.flag;
		state.createseek.seekname = obj.seekname;
    },
    SAVE_MY_SEEK(state, obj){
        state.myseek.sel_type = obj.sel_type!=undefined?obj.sel_type:state.myseek.sel_type;
        state.myseek._id = obj._id!=undefined?obj._id:state.myseek._id;
        state.myseek.ishasdata = obj.ishasdata!=undefined?obj.ishasdata:state.myseek.ishasdata;
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
