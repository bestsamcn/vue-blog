// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import store from './store/index.js'
import { sync } from 'vuex-router-sync'

Vue.use(Vuex);
Vue.config.productionTip = false
sync(store, router, {
    moduleName: 'RouteModule'
})

//路由动画
router.beforeEach((to, from, next) => {
    let direction = 'fadeInRight'
    const toDepth = to.path.split('/').length
    const fromDepth = from.path.split('/').length
    direction = toDepth >= fromDepth ? 'fadeInRight' : 'fadeInLeft'
    router.app.pageTransition = direction
    next()
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