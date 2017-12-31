import Vue from 'vue';
import appConfigs from 'src/configs'
import {
    api_up_quantity
} from 'src/model/api.js'

let getevent = () => {
    var Event = new Vue();
    return Event;
}
let clicksound = () => {
    var click = new Howl({
        urls: [appConfigs.assetsPublicPath + '/static/audio/click.ogg', appConfigs.assetsPublicPath + '/static/audio/click.m4a'],
        volume: 1
    });
    return click;
}
const vueEvent = getevent();
const vuesount = clicksound();

const utils = {
    vueEvent: vueEvent,
    vuesount: vuesount,
    async up_quantity(id) {
        let res = await api_up_quantity({
            '_id': id
        });
    },
    //打电话
    realcall(e) {
        window.location.href = "tel:" + e.name;
    },
    //处理空
    handlenull(item) {
        $.each(item, function (key, val) {
            if (val == null) {
                item[key] = '';
            }
        });
    },
    //获取地址参数
    getUrlParam(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
        var r = window.location.search.substr(1).match(reg); //匹配目标参数
        if (r != null) return r[2];
        return null; //返回参数值
    },
    getGeolocation(callback) {
        var _this = this;
        var currentposition = {};
        //获取当前位置
        var geolocation = new BMap.Geolocation();
        geolocation.getCurrentPosition(function (r) {
            if (this.getStatus() == BMAP_STATUS_SUCCESS) {
                currentposition.lng = r.point.lng;
                currentposition.lat = r.point.lat;
                callback(currentposition);
            } else {
                callback(false);
            }
        }, {
            enableHighAccuracy: true
        });
    },
    //获取七天日期
    getSevenDate(date, lasttime) {
        var lastarr = lasttime.split(':');
        var lasth = parseInt(lastarr[0]);
        var lastm = parseInt(lastarr[1]);
        var thirtyagoh = '';
        var thirtyagom = '';
        var _arr = [];
        //提前半小时就从明天开始
        if (lastm >= 30) {
            thirtyagoh = lasth;
            thirtyagom = lastm - 30;
        } else {
            thirtyagoh = lasth - 1;
            thirtyagom = lastm + 30;
        }
        if (parseInt(date.Format('hh')) > thirtyagoh) {
            date.setDate(date.getDate() + 1);
        }
        if (parseInt(date.Format('hh')) == thirtyagoh) {
            if (parseInt(date.Format('mm')) > thirtyagom) {
                date.setDate(date.getDate() + 1);
            }
        }

        for (var i = 0; i < 7; i++) {
            var date2 = new Date(date);
            date2.setDate(date.getDate() + i);
            var time2 = (date2.getMonth() + 1) + "月" + date2.getDate() + "日";
            _arr.push(time2);
        }
        return _arr;
    },
    //缓存到cookie
    handleCookieGet(c_name) {
        if (document.cookie.length > 0) {
            var c_start = document.cookie.indexOf(c_name + "=");
            if (c_start != -1) {
                c_start = c_start + c_name.length + 1;
                var c_end = document.cookie.indexOf(";", c_start);
                if (c_end == -1) c_end = document.cookie.length;
                var result = unescape(document.cookie.substring(c_start, c_end));
                if (result) {
                    return JSON.parse(result);
                } else {
                    return {};
                }
            }
        }
        return "";
    },
    handleCookieSet(c_name, value, expiredays) {
        var value = JSON.stringify(value);
        var exdate = new Date();
        exdate.setDate(exdate.getDate() + expiredays);
        document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString()) + "; path=/";
    },
    //禁止默认滚动条滚动，用于弹出窗
    forbidscroll() {
        document.getElementById("todaycrop").style.overflow = "hidden";
    },
    allscroll() {
        document.getElementById("todaycrop").style.overflow = "";
    },
    //提示底部toast
    toastinfo(msg) {
        $('.mint-toast').remove();
        Vue.$toast({
            message: msg,
            className: 'fadeInUp animated',
            position: 'bottom',
            duration: appConfigs.toastime
        });
        setTimeout(() => {
            let left = (-$('.mint-toast').width() / 2) + 'px';
            $('.mint-toast').css('margin-left', left);
        }, 10);

    },
    //菊花loading
    showloading() {
        Vue.$indicator.open();
    },
    closeloading() {
        Vue.$indicator.close();
    },
    //初始化当前页面data
    initdata(_this) {
        Object.assign(_this.$data, _this.$options.data());
    }
}
export default utils
