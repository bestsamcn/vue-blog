// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import store from './store/index.js'
import { sync } from 'vuex-router-sync'
import Filter from '@/utils/filter.js'

Vue.use(Vuex);
Vue.use(Filter);
Vue.config.productionTip = false
sync(store, router, {
    moduleName: 'RouteModule'
})

//路由动画
router.beforeEach((to, from, next) => {
    let direction = 'fadeInRight'
    const toDepth = to.path.split('/').length
    const fromDepth = from.path.split('/').length
    direction = toDepth > fromDepth ? 'fadeInRight' : 'fadeInLeft';
    toDepth == fromDepth &&  (direction = 'fade');
    router.app.pageTransition = direction
    next()
});

//title
router.afterEach((to, from, next)=>{
    document.title = to.name;
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