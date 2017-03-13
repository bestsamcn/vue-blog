import Vue from 'vue'
import Router from 'vue-router'

//路由懒加载
const Home = resolve=>require(['@/components/home/index.vue'], resolve);
const About = resolve=>require(['@/components/about/index.vue'], resolve);
const Article = resolve=>require(['../components/article/index.vue'], resolve);
const ArticleDetail = resolve=>require(['../components/article/detail.vue'], resolve);
Vue.use(Router)

export default new Router({
    mode: 'history',
    base: __dirname,
	routes: [
        {
    		path: '/',
    		name: 'Home',
    		component: Home
    	},
        {
            path: '/about',
            name: 'About',
            component: About
        },
        {
            path:'/acticle',
            name:'Article',
            component:Article
        },
        {
            path:'/acticle/detail',
            name:'ArticleDetail',
            component:ArticleDetail
        }
    ]
});