import appConfigs from 'src/configs'
import util from 'src/util/util.js'

//首页分类图标
const get_article = appConfigs.urlWebHttp + '/api/article/getArticle?';
//图灵机器人
const get_tuling_bot = 'http://www.tuling123.com/openapi/api?key='+appConfigs.botkey;

/**
 * 创建临时数据
 * reqtype 1:vueGet 2:vuePost 3:ajaxPost 4:ajaxGet
 */
let setpromise = (params,apiurl,reqtype) => {
  switch (reqtype) {
    case 1:
      return new Promise((resolve, reject) => {
        util.vueRequest({
              method : 'GET',
              url : apiurl,
              params : params,
              timeout:appConfigs.timeout,
              cb : function(res){
                resolve(res)
              },
              err : function(res){
                console.log(res);
                util.vueEvent.$emit("disloading");
                reject(res);
              }
            });
      });
      break;
    case 2:
      return new Promise((resolve, reject) => {
        util.vueRequest({
              method : 'POST',
              url : apiurl,
              body : params,
              timeout:appConfigs.timeout,
              cb : function(res){
                resolve(res)
              },
              err : function(res){
                console.log(res);
                util.vueEvent.$emit("disloading");
                reject(res);
              }
            });
      });
      break;
    case 3:
      
    break;
    case 4:
      return new Promise((resolve, reject) => {
        $.ajax({
            type: 'GET',
            url: apiurl,
            data: params,
            timeout:appConfigs.timeout,
            success(res){
              resolve(res)
            },
            error(){
              console.log(res);
              util.vueEvent.$emit("disloading");
              reject(res);
            }
        });
      });
    break;
  }
}

let get_article_fn =(params)=>{
	return setpromise(params,get_article,1);
}
let get_tuling_bot_fn =(params)=>{
  return setpromise(params,get_tuling_bot,4);
}

export default{
	//获取访问页面的内容
	get_article : get_article_fn,
  //图灵机器人
  get_tuling_bot : get_tuling_bot_fn
}
