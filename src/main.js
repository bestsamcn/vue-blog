// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import store from './store/index.js'
import { sync } from 'vuex-router-sync'
import Filter from '@/utils/filter.js'
import Utils from '@/utils/index.js'
import VueSimplemde from 'vue-simplemde'

Vue.use(Vuex);
Vue.use(Filter);
Vue.use(VueSimplemde);
Vue.config.productionTip = false
sync(store, router, {
    moduleName: 'RouteModule'
})

//路由动画

store.dispatch('setMobile', Utils.isMobile());
store.dispatch('setToken', localStorage['token'] && JSON.parse(localStorage['token']).token);

//title
router.beforeEach((to, from, next)=>{
    document.title = to.meta.title;
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
})