/**
 * 配置编译环境和线上环境之间的切换
 *
 * urlWebHttp: 域名地址
 * toastime: toast时间
 *
 */
const toastime = 3000;
const timeout = 10000;
const filename = '/todaycrop';
const botkey = 'b5e54604d962464fb5544c73e659f494';
const accuracy = false;//是否开启精准定位 不开启定位失败就默认北京天安门

let urlWebHttp = '';
let assetsPublicPath = '';
let plant = '';


//切换环境
if (process.env.NODE_ENV == 'development') {
	urlWebHttp = 'http://10.6.20.34:8081';
}else if (process.env.NODE_ENV == 'production') {
	urlWebHttp = 'http://192.168.1.101:8081';
}
//配置相对路径
if(location.href.indexOf(filename)!=-1){
	assetsPublicPath = '.';
}else{
	assetsPublicPath = '../..';
}
//判断平台
if(navigator.userAgent.match(/MicroMessenger/igm)){
	plant = 'weixin';
}


export default{
	urlWebHttp,
	toastime,
	timeout,
	filename,
	accuracy,
	assetsPublicPath,
	plant,
	botkey
}
