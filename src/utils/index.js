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

export default Tool;