import appConfigs from 'src/configs'
import util from 'src/util/util.js'

//首页分类图标
const get_article = appConfigs.urlWebHttp + '/api/article/getArticle?';

/**
 * 创建临时数据
 */
let setpromise = (params,apiurl,reqtype) => {
  if(reqtype){//post方式
    return new Promise((resolve, reject) => {
      util.vueRequest({
            method : reqtype,
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
  }else{//get方式
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
  }
}

let get_article_fn =(params)=>{
	return setpromise(params,get_article);
}


export default{
	//获取访问页面的内容
	get_article : get_article_fn
}
