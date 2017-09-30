import Vue from 'vue';
import appConfigs from 'src/configs'
import util from 'src/util/util.js'

export default async(apiurl = '', params = {}, type = '', method = '') => {
	if(method == 'ajax'){
		return new Promise((resolve, reject) => {
				$.ajax({
						type: type,
						url: apiurl,
						dataType:'json',
						data: params,
						timeout:appConfigs.timeout,
						success(res){
							if(res.code == 200||res.code == 100000){
								resolve(res)
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
					url : apiurl + '&clientId=vistor_weixin',
					timeout:appConfigs.timeout,
					headers : {
						'Content-Type':'application/json;charset=utf-8'
					},
					withCredentials: true,
					crossDomain: true,
					body : type == 'POST' ? params: '',
					params: type == 'GET' ? params: '',
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
					reject(err)
			})
		});
	}	
}