import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

const state = {
	//添加地址
	collecturl:{
		showcollecturl:false,//展示地址收藏
		website:''//地址
	},
	//添加分类
	createseek:{
		showseekname:false,
		seekname:''
	}
	
}
const mutations = {
	SHOW_COLLECT_URL(state, obj) {
		state.collecturl.showcollecturl = obj.flag;
		state.collecturl.website = obj.website;
	},
	SHOW_SEEK_NAME(state, obj) {
		state.createseek.showseekname = obj.flag;
		state.createseek.seekname = obj.seekname;
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