/**
 * 过滤器
 */

let Filter = {};
Filter.install = Vue=>{

    /**
     * 时间格式化
     * @param  {number} num 时间戳
     * @return {string} 指定的时间格式
     */
    Vue.filter('dateFormat', (date, format)=>{

        if (!arguments[0]) {
            return '暂无'
        }
        date = new Date(date);
        var map = {
            "M": date.getMonth() + 1, //月份
            "d": date.getDate(), //日
            "h": date.getHours(), //小时
            "m": date.getMinutes(), //分
            "s": date.getSeconds(), //秒
            "q": Math.floor((date.getMonth() + 3) / 3), //季度
            "S": date.getMilliseconds() //毫秒
        };
        format = format.replace(/([yMdhmsqS])+/g, function(all, t) {
            var v = map[t];
            if (v !== undefined) {
                if (all.length > 1) {
                    v = '0' + v;
                    v = v.substr(v.length - 2);
                }
                return v;
            } else if (t === 'y') {
                return (date.getFullYear() + '').substr(4 - all.length);
            }
            return all;
        });
        return format;
    });

    /**
     * 时间倒读
     * @param  {number} oldDate 时间戳
     * @return {string} 倒读
     */
    Vue.filter('dateDesc',oldDate=>{
        let now=new Date().getTime(),
            past =  !isNaN(oldDate) ? oldDate : new Date(oldDate).getTime(),
            diffValue = now - past,
            res='',
            s = 1000,
            m = 1000 * 60,
            h = m * 60,
            d = h * 24,
            hm = d * 15,
            mm = d * 30,
            y = mm * 12,
            _y = diffValue/y,
            _mm =diffValue/mm,
            _w =diffValue/(7*d),
            _d =diffValue/d,
            _h =diffValue/h,
            _m =diffValue/m,
            _s = diffValue/s;
        if(_y>=1) res=parseInt(_y) + '年前';
        else if(_mm>=1) res=parseInt(_mm) + '个月前';
        else if(_w>=1) res=parseInt(_w) + '周前';
        else if(_d>=1) res=parseInt(_d) +'天前';
        else if(_h>=1) res=parseInt(_h) +'小时前';
        else if(_m>=1) res=parseInt(_m) +'分钟前';
        else if(_s>=1) res=parseInt(_s) +'秒前';
        else res='刚刚';
        return res;
    });

    /**
     * 只显示指定字数，isPoint为真时，剩余以。。。代替,否则直接截取。
     */
    Vue.filter('textEllipsis', (str, len, isPoint)=>{
        isPoint = isPoint || false;
        if(!str) return;
        if(str.length <= len) return str;
        return (isPoint ? str.substring(0, len)+'...' : str.substring(0, len));
    });

    /**
     * 数字转换
     */
    Vue.filter('transNum', (num)=>{
        if(!num) return 0;
        if (num >= 10000) {
            num = Math.round(num / 10000 * 100) / 100 +' W';
        } else if(num>= 1000) {
            num = Math.round(num / 1000 * 100) / 100 +' K';
        } else {
            num = num;
        }
        return num;
    })
}

export default Filter;
