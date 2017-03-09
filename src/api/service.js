import Vue from 'vue';
import store from '../store/index.js';
import Axios from 'axios';
import * as config from './config.js';

Axios.defaults.baseURL = 'http://120.77.83.242/api';
Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
Axios.defaults.withCredentials = true;
Axios.defaults.headers.cookie = 'NODESESSIONID=s%3AzbgJ3R5J-hvXdslTlBul3-9ugDrdDwB7.5FKtWoBM01wuvlmoRGaAkS2KIdIkq6m2CdZRqDxh5%2B8';

var _http = function(type, url, params){
    type = type || 'get';
    if (!url) throw new Error('请指定url');
    var obj = {};
    params = Object.prototype.toString.call(params) === '[object object]' ? params : {};
    if(type === 'get'){
        obj.methods = 'get';
        obj.url = url;
        obj.params = params;
    }else if(type === 'post'){
        obj.methods = 'post';
        obj.url = url;
        obj.data = params;
    }else{
        throw new Error('请指定请求方式');
    }
    var instance = Axios.create();
    //当创建实例的时候，拦截器放在default无效
    instance.interceptors.request.use(config=>{
        console.log(store)
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