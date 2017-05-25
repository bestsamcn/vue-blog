/**
 * 工具库
 */

let Tool = {};

Tool.isMobile = function(){
    var b = false;
    var sUserAgent = navigator.userAgent.toLowerCase();
    var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
    var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
    var bIsMidp = sUserAgent.match(/midp/i) == "midp";
    var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
    var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
    var bIsAndroid = sUserAgent.match(/android/i) == "android";
    var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
    var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
    if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
        b = true;
    }
    return b;
}
/**
 * 设置cookie
 * @param {string} k 键名 
 * @param {string} v 值
 * @param {number} d 天数
 */
Tool.setCookie = function(k, v, d){
    var expire = '';
    if(d){
        var date = new Date();
        date.setTime(date.getTime()+d * 24 * 60 * 60 * 1000);
        expire = ';expires=' + date.toUTCString();
    }
    document.cookie = k +'='+ v + expire;
}

/**
* 获取cookie
* @param {string} k 键名
* @return {v} 键值 
*/
Tool.getCookie = function(k){
    //一旦检测到分号，即停止
    var arr = document.cookie.match(new RegExp(k + '=([^;]*)'));
    return arr ? arr[1] : '';
}

/**
* 清除cookie
* @param {string} k 键名
*/
Tool.clearCookie = function(k){
    window.setCookie(k, '', -1);
}
/**
 * 获取css样式值
 * @param  {dom} element 
 * @param  {string} attr    属性名
 * @return {string}         
 */
Tool.getStyle = function(element,attr){
    return getComputedStyle(element, false)[attr];
}

/**
 * 运动函数
 * @param  {dom}   obj  
 * @param  {obj}   json 运动参数
 * @param  {function} fn   回调
 */
Tool.moveStart = function(obj,json,fn){
    var that = this;
    clearInterval(obj.timer);
    obj.timer = setInterval(function() {
        var bStop = true;
        var icur = 0;
        icur = parseInt(that.getStyle(obj, 'top'));
        var iSpeed = (json['top'] - icur) / 8;
        // alert('iSpeed'+iSpeed)
        iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
        if (icur != json['top']) {
            bStop = false;
        }
        obj.style['top'] = icur + iSpeed + 'px';
        if (bStop) {
            clearInterval(obj.timer);
            fn && fn();
        }
    }, 30);
}
export default Tool;