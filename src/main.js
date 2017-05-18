// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
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

Vue.use(Vuex);
Vue.use(Filter);
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
                path: '/admin/sigin',
                query: {
                    redirect: to.fullPath
                }
            });
        }
    }else{
        if (to.path.indexOf('signin') !== -1 && store.state.common.isLogin) {
            return next({
                path: '/admin/home/index'
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