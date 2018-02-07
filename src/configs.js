/**
 * 配置编译环境和线上环境之间的切换
 *
 * urlWebHttp: 域名地址
 * toastime: toast时间
 *
 */
const toastime = 3000;
const timeout = 20000;
const filename = '/todaypocket';
const botkey = 'b5e54604d962464fb5544c73e659f494';
const accuracy = false;//是否开启精准定位 不开启定位失败就默认北京天安门

//服务器接口地址
let urlWebHttp = '';
//ssr地址
let ssrurl = '';
//图片拼接路径
let assetsPublicPath = '';
//运行环境
let plant = '';


//切换环境
if (process.env.NODE_ENV == 'development') {
    urlWebHttp = 'http://www.todaypocket.cn';//http://10.6.20.104:8081
    ssrurl = 'http://www.todaypocket.cn:5555';//http://47.52.227.158:5555
}else if (process.env.NODE_ENV == 'production') {
    //今日口袋提供的接口对外
    urlWebHttp = 'http://www.todaypocket.cn';
    //nuxt提供的接口
    ssrurl = 'http://www.todaypocket.cn:5555';
}
//配置相对路径
if(location.href.indexOf(filename)!=-1){
    console.log('路径1');
	assetsPublicPath = '.';
}else{
    console.log('路径2');
	assetsPublicPath = '../..';
}
//判断平台
if(navigator.userAgent.match(/MicroMessenger/igm)){
	plant = 'weixin';
}
//判断手机还是pc
function IsPC() {
    var userAgentInfo = navigator.userAgent;
    var Agents = ["Android", "iPhone",
                "SymbianOS", "Windows Phone",
                "iPad", "iPod"];
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
        }
    }
    return flag;
}
 
var isPC = IsPC();

export default{
	urlWebHttp,
	toastime,
	timeout,
	filename,
	accuracy,
	assetsPublicPath,
	plant,
    botkey,
    ssrurl,
    isPC
}
