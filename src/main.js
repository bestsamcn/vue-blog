// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// 生产环境注释下行代码
import Vue from 'vue'
// 生产环境注释下行代码
import Vuex from 'vuex'
import App from './App'
import router from './router'
import store from './store/index.js'
import {
    sync
} from 'vuex-router-sync'
import Filter from '@/utils/filter.js'
import Utils from '@/utils/index.js'
import VueSimplemde from 'vue-simplemde'
import Directive from '@/utils/directive.js'

Vue.use(Vuex);
Vue.use(Filter);
Vue.use(Directive);
Vue.use(VueSimplemde);
Vue.config.productionTip = false
sync(store, router, {
    moduleName: 'RouteModule'
});
window.clientHeight = document.documentElement.clientHeight;
store.state.common.clientHeight=clientHeight

//路由动画
store.dispatch('setMobile', Utils.isMobile());
//全局数据初始化
store.dispatch('setToken', localStorage['__bestToken__'] && JSON.parse(localStorage['__bestToken__']).token);
store.dispatch('getTagList');
store.dispatch('getCategoryList');
store.dispatch('getHotWordList');
//title
// router.afterEach((to, from, next)=>{
//     document.title = to.meta.title;
//     next();
// });
//路由权限
router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.auth)) {
        if (!store.state.common.isLogin) {
            return next({
                path: '/admin/signin',
                query: {
                    redirect: to.fullPath
                }
            });
        }
    }else{
        if (to.path.indexOf('signin') !== -1 && store.state.common.isLogin) {
            return next({
                path: '/admin'
            });
        }
    }
    next();
});


new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: {
        App
    }
});