import Vue from 'vue';
import Axios from 'axios';
import * as config from './config.js';

Axios.defaults.baseURL = config.ROOT_API;
Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
Axios.defaults.withCredentials = true;
Axios.defaults.headers.cookie = 'NODESESSIONID=s%3AzbgJ3R5J-hvXdslTlBul3-9ugDrdDwB7.5FKtWoBM01wuvlmoRGaAkS2KIdIkq6m2CdZRqDxh5%2B8'
Axios.interceptors.request.use(config=>{
    return config;
}, error=> {
    return Promise.reject(error);
});

Axios.interceptors.response.use(response=> {
    return response;
}, error=> {
    return Promise.reject(error);
});
var _http = (type, url, params) => {
	type = type || 'get';
	if (!url) throw new Error('请指定url');
	var http = Axios.create();
    var obj = {};
    if(type === 'get'){
        obj.methods = 'get';
        obj.url = url;
        obj.params = params;
    }else{
        obj.methods = 'post';
        obj.url = url;
        obj.data = params
    }
    return Axios.create().request(obj);
}
export default _http;