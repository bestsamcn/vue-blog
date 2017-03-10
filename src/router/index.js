import Vue from 'vue'
import Router from 'vue-router'

//路由懒加载
const Hello = resolve=>require(['@/components/Hello.vue'], resolve);
const Home = resolve=>require(['@/components/home/index.vue'], resolve);
const Blog = resolve=>require(['@/components/blog/index.vue'], resolve);
const About = resolve=>require(['@/components/about/index.vue'], resolve);
Vue.use(Router)

export default new Router({
    mode: 'history',
    base: __dirname,
	routes: [
        {
    		path: '/',
    		name: 'Hello',
    		component: Hello
    	},
        {
            path:'/home',
            name:'Home',
            component:Home,
        },
        {
            path:'/home/blog',
            name:'Blog',
            component:Blog
        },
        {
            path:'/home/about',
            name:'About',
            component:About
        }
    ]
});