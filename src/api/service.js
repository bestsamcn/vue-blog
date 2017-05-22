import store from '../store/index.js';
import Axios from 'axios';
import * as config from './config.js';
import MSG from './message.js';

Axios.defaults.baseURL = config.ROOT_API;
Axios.defaults.timeout = 10000;
Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
// Axios.defaults.headers.get['Content-Type'] = 'text/plain;charset=UTF-8';
Axios.defaults.withCredentials = true;
var _http = function(type, url, params, isToast){
    type = type || 'get';
    if (!url) throw new Error('请指定url');
    var obj = {};
    params = Object.prototype.toString.call(params) === '[object Object]' ? params : {};
    if(type === 'get'){
        obj.method = 'get';
        obj.url = url;
        obj.params = params;
    }else if(type === 'post'){
        obj.method = 'post';
        obj.url = url;
        obj.data = params;
    }else{
        throw new Error('请指定请求方式');
    }
    var instance = Axios.create();
    //当创建实例的时候，拦截器放在default无效
    instance.interceptors.request.use(config=>{
        //不能使用null，否则会将token的值变成'null'
        config.headers['x-access-token'] = store.state.common.token || '';
        store.dispatch('setShowLoading');
        return config;
    }, error=> {
        store.dispatch('setHideLoading');
        return Promise.reject(error);
    });
    instance.interceptors.response.use(response=> {
        store.dispatch('setHideLoading');
        return response;
    }, error=> {
        store.dispatch('setHideLoading');
        return Promise.reject(error);
    });

    var __promise = new Promise((resolve, reject)=>{
        instance.request(obj).then(res=>{
            if(res.status == 200 && res.data.retCode !==0){
                if(res.data.retCode === 10006 || res.data.retCode === 10003){
                    store.dispatch('delToken');
                }
                for(var i in MSG){
                    if(i == res.data.retCode){
                        isToast && store.dispatch('setToast', MSG[i]);
                        break;
                    }
                }
                return false;
            }
            return resolve(res.data);
        }, err=>{
            isToast && store.dispatch('setToast', '异常');
            console.log(err, '请求失败');
        }).catch(e=>{
            isToast && store.dispatch('setToast', '异常');
            console.log(e, '请求失败');
        });
    });
    return __promise;
}

export default _http;