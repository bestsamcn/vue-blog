import Vue from 'vue';
import store from '../store/index.js';
import Axios from 'axios';
import * as config from './config.js';

Axios.defaults.baseURL = config.ROOT_API;
Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
Axios.defaults.withCredentials = true;
var _http = function(type, url, params){
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
    return instance.request(obj);
}
export default _http;