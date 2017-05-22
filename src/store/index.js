// 生产环境注释下行代码
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

import common from './modules/common.js';
import admin from './modules/admin.js';
export default new Vuex.Store({
    modules:{
        common,
        admin
    }
});