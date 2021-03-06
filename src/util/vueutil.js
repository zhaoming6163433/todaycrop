import appConfigs from 'src/configs'

export default{
  install(Vue,options)
  {
  	//全局过滤器
  	Vue.filter("imghandle", function(imgsrc) {   //全局方法 Vue.filter() 注册一个自定义过滤器,必须放在Vue实例化前面
        if(imgsrc==null){
	    	imgsrc = '';
	    }
	    return imgsrc;
    });
    //保留两位小数
    Vue.filter("decimaltwo", function(val) {
	    return parseFloat(val).toFixed(2);
    });
    //处理时间 到日
    Vue.filter("timedatehandle", function(time) {
	    return time==''?'':new Date(time).Format("yyyy-MM-dd");
    });
    //处理时间 到秒
    Vue.filter("timeallhandle", function(time) {
	    return time==''?'':new Date(time).Format("yyyy-MM-dd hh:mm:ss");
    });
    //计算几天前
    Vue.filter("timeago", function([nowtime,publishTime]){
        var publishTime = publishTime/1000;
        var d_seconds,d_minutes,d_hours,d_days;
        var timeNow = parseInt(nowtime/1000);
        var d;
        var r;
        d = timeNow - publishTime;
        d_days = parseInt(d/86400);
        d_hours = parseInt(d/3600);
        if(d_hours>0){
            r = d - d_hours*3600;
            d_minutes = parseInt(r/60);
            d_seconds = parseInt(r);
            d_hours = d_hours - d_days*24;
        }else{
            d_minutes = parseInt(d/60);
            d_seconds = parseInt(d);
        }
        if(d_days>0){
            return d_days+"天前";
        }else if(d_days<=0 && d_hours>0){
            return d_hours+"小时前";
        }else if(d_hours<=0 && d_minutes>0){
            return d_minutes+"分钟前";
        }else if(d_minutes<=0 && d_seconds>=0 ){
            return "刚刚"
        }
    });
    //返回上一页
    Vue.prototype.goback = function(){
		this.$router.go(-1);
	}
	//加载错误图片处理
	Vue.prototype.loaderrimg = function(e){
		var type = e.currentTarget.attributes.type&&e.currentTarget.attributes.type.value;
		if(type == 'big'){
			e.target.src = appConfigs.assetsPublicPath+'/static/img/picturedefault.png';
		}else if(type == 'logogray'){
			e.target.src = appConfigs.assetsPublicPath+'/static/img/graylogo.png';
		}else {
			e.target.src = appConfigs.assetsPublicPath+'/static/img/picturedefault.png';
		}
	}
	//加载图片处理
	Vue.prototype.loadimg = function(e){
		var _dom = $(e.currentTarget),
			_outdom= _dom.parent(),
			outw = _outdom.width(),
			outh = _outdom.height(),
			w = _dom.width(),
			h = _dom.height(),
			outscale = outw/outh,
			inscale = w/h;
			//外框宽高比大于里面图片时，图片100%高度，否则100%宽度
			if(outscale>inscale){
				_dom.css('height','100%');
				_dom.css('width','auto');
			}else{
				var lasth = outw/inscale;
				var margintop = (outh-lasth)/2;
				_dom.css('width','100%');
				_dom.css('height','auto');
				_dom.css('margin-top',margintop+'px');
			}
    }
  }
}
