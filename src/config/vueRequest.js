import Vue from 'vue';
import appConfigs from 'src/configs'
import util from 'src/util/util.js'

export default async(apiurl = '', params = {}, type = 'GET', method = '') => {
    //100000	文本类 200000	链接类 302000	新闻类 308000	菜谱类 313000（儿童版）	儿歌类 314000（儿童版）	诗词类
    var tulingarry = [100000,200000,302000,308000,313000,314000];
    type = type.toUpperCase();
	if(method == 'ajax'){
		return new Promise((resolve, reject) => {
				$.ajax({
						type: type,
						url: apiurl,
						dataType:'json',
						data: params,
						timeout:appConfigs.timeout,
						success(res){
							if(res.code == 200 || tulingarry.indexOf(res.code)!=-1){
                                if(res.code == 1000){
                                    util.closeloading();
                                    reject(res);
                                }else{
                                    resolve(res)
                                }
							}else{
								util.closeloading();
								reject(res);
							}
						},
						error(err){
							console.log(err);
							util.closeloading();
							reject(err);
						}
				});
		});
	}else{
		return new Promise((resolve, reject) => {
			Vue.http({
					method : type || 'GET',
					url : apiurl + '&clientId=""',
					timeout:appConfigs.timeout,
					headers : {
						'Content-Type':'application/json;charset=utf-8'
					},
					withCredentials: true,
					crossDomain: true,
					body : type == 'POST' ? params: '',
					params: type == 'GET' ? params: ''
			}).then(res => {
					if(res.body.code == 200){
						resolve(res.body)
					}else{
						util.closeloading();
						reject(res.body)
					}
			}).catch(err => {
					util.closeloading();
					console.log(err);
					reject(err.body)
			})
		});
	}
}
