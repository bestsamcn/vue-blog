import Vue from 'vue'
import Router from 'vue-router'

//路由懒加载
//user
const Home = resolve=>require(['@/components/home/index.vue'], resolve);
const About = resolve=>require(['@/components/about/index.vue'], resolve);
const Article = resolve=>require(['../components/article/index.vue'], resolve);
const ArticleDetail = resolve=>require(['../components/article/detail.vue'], resolve);
const Search = resolve=>require(['../components/search/index.vue'], resolve);

//admin
const Admin = resolve=>require(['../components/admin/index.vue'], resolve);
const AdminCommon = resolve=>require(['../components/admin/common/index.vue'], resolve);
const Signin = resolve=>require(['../components/admin/signin.vue'], resolve);
const AdminHome = resolve=>require(['../components/admin/home/index.vue'], resolve);
const AdminArticle = resolve=>require(['../components/admin/article/index.vue'], resolve);
const AdminAddArticle = resolve=>require(['../components/admin/article/addArticle.vue'], resolve);
Vue.use(Router)

var routerMap = {
    mode: 'hash',
    base: __dirname,
    routes: [
        {
            path: '/',
            name: 'Home',
            title:'Home',
            component: Home
        },
        {
            path: '/search',
            name: 'Search',
            component: Search
        },
        {
            path: '/about',
            name: 'About',
            component: About
        },
        {
            path:'/article',
            name:'Article',
            component:Article
        },
        {
            path:'/article/detail',
            name:'ArticleDetail',
            component:ArticleDetail
        },
        {
            path:'/admin',
            component:Admin,
            children:[
                {
                    path:'signin',
                    name:'AdminSignin',
                    component:Signin
                },
                {
                    path:'home',
                    component:AdminCommon,
                    children:[
                        {
                            path:'article',
                            name:'AdminArticle',
                            component:AdminArticle
                        },
                        {
                            path:'/',
                            name:'AdminHome',
                            component:AdminHome
                        },
                        {
                            path:'addArticle',
                            name:'AdminAddArticle',
                            component:AdminAddArticle
                        }
                    ]
                }
            ]
        },
        {
            path:'*',
            redirect:'/'
        }
    ]
}
export default new Router(routerMap);