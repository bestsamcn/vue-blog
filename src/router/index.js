import Vue from 'vue'
import Router from 'vue-router'

//路由懒加载
//user
// const Home = resolve=>require(['@/components/home/index.vue'], resolve);
// const About = resolve=>require(['@/components/about/index.vue'], resolve);
// const Article = resolve=>require(['../components/article/index.vue'], resolve);
// const ArticleDetail = resolve=>require(['../components/article/detail.vue'], resolve);
// const Search = resolve=>require(['../components/search/index.vue'], resolve);

import Home from '@/components/home/index.vue'
import About from '@/components/about/index.vue'
import Article from '@/components/article/index.vue'
import ArticleDetail from '@/components/article/detail.vue'
import Search from '@/components/search/index.vue'
import Message from '@/components/message/index.vue'

//admin
// const Admin = resolve=>require(['../components/admin/index.vue'], resolve);
// const AdminCommon = resolve=>require(['../components/admin/common/index.vue'], resolve);
// const Signin = resolve=>require(['../components/admin/signin.vue'], resolve);
// const AdminHome = resolve=>require(['../components/admin/home/index.vue'], resolve);
// const AdminArticle = resolve=>require(['../components/admin/article/index.vue'], resolve);
// const AdminAddArticle = resolve=>require(['../components/admin/article/addArticle.vue'], resolve);
// const AdminTag = resolve=>require(['../components/admin/tag/index.vue'], resolve);
// const AdminCate = resolve=>require(['../components/admin/category/index.vue'], resolve);
// const AdminMsg = resolve=>require(['../components/admin/message/index.vue'], resolve);
// const AdminComment = resolve=>require(['../components/admin/article/articleComment.vue'], resolve);
import Admin from '@/components/admin/index.vue'
import AdminCommon from '@/components/admin/common/index.vue'
import Signin from '@/components/admin/signin.vue'
import AdminHome from '@/components/admin/home/index.vue'
import AdminArticle from '@/components/admin/article/index.vue'
import AdminAddArticle from '@/components/admin/article/addArticle.vue'
import AdminTag from '@/components/admin/tag/index.vue'
import AdminCate from '@/components/admin/category/index.vue'
import AdminMsg from '@/components/admin/message/index.vue'
import AdminMsgDetail from '@/components/admin/message/detail.vue'
import AdminComment from '@/components/admin/article/articleComment.vue'

Vue.use(Router)

var routerMap = {
    mode: 'hash',
    base: __dirname,
    routes: [
        {
            path: '/',
            name: 'Home',
            meta:{
                title:'首页'
            },
            component: Home
        },
        {
            path: '/search',
            name: 'Search',
            meta:{
                title:'搜索'
            },
            component: Search
        },
        {
            path: '/about',
            name: 'About',
            meta:{
               title:'关于' 
            },
            component: About
        },
        {
            path:'/article',
            name:'Article',
            meta:{
                title:'文章'
            },
            component:Article
        },
        {
            path:'/article/detail',
            name:'ArticleDetail',
            meta:{
                title:'文章详情'
            },
            component:ArticleDetail
        },
        {
            path:'/message',
            name:'Message',
            meta:{
                title:'留言'
            },
            component:Message
        },
        {
            path:'/admin',
            component:Admin,
            children:[
                {
                    path:'signin',
                    name:'AdminSignin',
                    meta:{
                        title:'登录'
                    },
                    component:Signin
                },
                {
                    path:'home',
                    component:AdminCommon,
                    children:[
                        {
                            path:'/',
                            name:'AdminHome',
                            meta:{
                                title:'预览'
                            },
                            component:AdminHome
                        },
                        {
                            path:'article',
                            name:'AdminArticle',
                            meta:{
                               title:'文章'
                            },
                            component:AdminArticle
                        },
                        {
                            path:'addArticle',
                            name:'AdminAddArticle',
                            meta:{
                                title:'添加文章'
                            },
                            component:AdminAddArticle
                        },
                        {
                            path:'adminTag',
                            name:'AdminTag',
                            meta:{
                                title:'标签'
                            },
                            component:AdminTag
                        },
                        {
                            path:'adminCategory',
                            name:'AdminCategory',
                            meta:{
                                title:'分类'
                            },
                            component:AdminCate
                        },
                        {
                            path:'adminMessage',
                            name:'AdminMessage',
                            meta:{
                               title:'留言'
                            },
                            component:AdminMsg
                        },
                        {
                            path:'adminMessageDetail/:id',
                            name:'AdminMessageDetail',
                            meta:{
                               title:'留言详情'
                            },
                            component:AdminMsgDetail
                        },
                        {
                            path:'adminComment',
                            name:'AdminArticleComment',
                            meta:{
                               title:'评论' 
                            },
                            component:AdminComment
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