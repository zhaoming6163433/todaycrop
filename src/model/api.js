import appConfigs from 'src/configs'
import vueRequest from 'src/config/vueRequest'

/**
 * 获取访问页面的内容
 */

export const api_get_article = (params) => vueRequest(appConfigs.urlWebHttp + '/api/article/getArticle?', params, 'GET');


/**
 * 图灵机器人
 */

export const api_get_tuling_bot = (params) => vueRequest('http://www.tuling123.com/openapi/api?key='+appConfigs.botkey, params, 'GET','ajax');


/**
 * 用户是否登录
 */

export const api_user_islogin = (params) => vueRequest(appConfigs.urlWebHttp + '/api/login/user_islogin?', params, 'POST');


/**
 * 用户登录
 */

export const api_user_login = (params) => vueRequest(appConfigs.urlWebHttp + '/api/login/user_login?', params, 'POST');


/**
 * 用户注册
 */

export const api_user_register = (params) => vueRequest(appConfigs.urlWebHttp + '/api/login/user_register?', params, 'POST');


/**
 * 用户退出
 */

export const api_user_logout = (params) => vueRequest(appConfigs.urlWebHttp + '/api/login/user_logout?', params, 'POST');


/**
 * 新增网址
 */

export const api_add_website = (params) => vueRequest(appConfigs.urlWebHttp + '/api/article/add_website?', params, 'POST');


/**
 * 新增类别
 */

export const api_add_seekname = (params) => vueRequest(appConfigs.urlWebHttp + '/api/article/add_seekname?', params, 'POST');


/**
 * 删除类别
 */

export const api_del_seekname = (params) => vueRequest(appConfigs.urlWebHttp + '/api/article/del_seek?', params, 'POST');


/**
 * 当前用户分类
 */

export const api_get_seekinfo = (params) => vueRequest(appConfigs.urlWebHttp + '/api/article/getWebUrlInfo?', params, 'GET');


/**
 * 删除当前用户文章
*/

export const api_delWebUrlInfo = (params) => vueRequest(appConfigs.urlWebHttp + '/api/article/delWebUrlInfo?', params, 'POST');


/**
 * 查询当前类别
 */

export const api_get_seek = (params) => vueRequest(appConfigs.urlWebHttp + '/api/article/get_seek?', params, 'POST');


/**
 * 修改类别顺序
 */

export const api_update_seeksort = (params) => vueRequest(appConfigs.urlWebHttp + '/api/article/update_seeksort?', params, 'POST');
