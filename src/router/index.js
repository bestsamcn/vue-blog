// 生产环境注释下行代码
import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store/index.js'


//路由懒加载
// const Home = resolve=>{require(['@/components/home/index.vue'], resolve)};
const Home = resolve => {
    store.dispatch('setShowLoading');
    require(['@/components/home/index.vue'], component => {
        store.dispatch('setHideLoading');
        resolve(component)
    })
};
// const About = resolve=>{require(['@/components/about/index.vue'], resolve)};
const About = resolve => {
    store.dispatch('setShowLoading');
    require(['@/components/about/index.vue'], component => {
        store.dispatch('setHideLoading');
        resolve(component)
    })
};
// const Article = resolve=>{require(['@/components/article/index.vue'], resolve)};
const Article = resolve => {
    store.dispatch('setShowLoading');
    require(['@/components/article/index.vue'], component => {
        store.dispatch('setHideLoading');
        resolve(component)
    })
};
// const ArticleDetail = resolve=>{require(['@/components/article/detail.vue'], resolve)};
const ArticleDetail = resolve => {
    store.dispatch('setShowLoading');
    require(['@/components/article/detail.vue'], component => {
        store.dispatch('setHideLoading');
        resolve(component)
    })
};

// const Search = resolve=>{require(['@/components/search/index.vue'], resolve)};
const Search = resolve => {
    store.dispatch('setShowLoading');
    require(['@/components/search/index.vue'], component => {
        store.dispatch('setHideLoading');
        resolve(component)
    })
};
// const Message = resolve=>{require(['@/components/message/index.vue'], resolve)};
const Message = resolve => {
    store.dispatch('setShowLoading');
    require(['@/components/message/index.vue'], component => {
        store.dispatch('setHideLoading');
        resolve(component)
    })
};

//admin
// const Admin = resolve=>{require(['@/components/admin/index.vue'], resolve)};
const Admin = resolve => {
    store.dispatch('setShowLoading');
    require(['@/components/admin/index.vue'], component => {
        store.dispatch('setHideLoading');
        resolve(component)
    })
};
// const AdminCommon = resolve=>{require(['@/components/admin/common/index.vue'], resolve)};
const AdminCommon = resolve => {
    store.dispatch('setShowLoading');
    require(['@/components/admin/common/index.vue'], component => {
        store.dispatch('setHideLoading');
        resolve(component)
    })
};
// const Signin = resolve=>{require(['@/components/admin/signin.vue'], resolve)};
const Signin = resolve => {
    store.dispatch('setShowLoading');
    require(['@/components/admin/signin.vue'], component => {
        store.dispatch('setHideLoading');
        resolve(component)
    })
};
// const AdminHome = resolve=>{require(['@/components/admin/home/index.vue], resolve)};
const AdminHome = resolve => {
    store.dispatch('setShowLoading');
    require(['@/components/admin/home/index.vue'], component => {
        store.dispatch('setHideLoading');
        resolve(component)
    })
};
// const AdminArticle = resolve=>{require(['@/components/admin/article/index.vue'], resolve)};
const AdminArticle = resolve => {
    store.dispatch('setShowLoading');
    require(['@/components/admin/article/index.vue'], component => {
        store.dispatch('setHideLoading');
        resolve(component)
    })
};
// const AdminAddArticle = resolve=>{require(['@/components/admin/article/addArticle.vue'], resolve)};
const AdminAddArticle = resolve => {
    store.dispatch('setShowLoading');
    require(['@/components/admin/article/addArticle.vue'], component => {
        store.dispatch('setHideLoading');
        resolve(component)
    })
};
// const AdminEditArticle = resolve=>{require(['@/components/admin/article/editArticle.vue'], resolve)};
const AdminEditArticle = resolve => {
    store.dispatch('setShowLoading');
    require(['@/components/admin/article/editArticle.vue'], component => {
        store.dispatch('setHideLoading');
        resolve(component)
    })
};
// const AdminTag = resolve=>{require(['@/components/admin/tag/index.vue'], resolve)};
const AdminTag = resolve => {
    store.dispatch('setShowLoading');
    require(['@/components/admin/tag/index.vue'], component => {
        store.dispatch('setHideLoading');
        resolve(component)
    })
};
// const AdminCate = resolve=>{require(['@/components/admin/category/index.vue'], resolve)};
const AdminCate = resolve => {
    store.dispatch('setShowLoading');
    require(['@/components/admin/category/index.vue'], component => {
        store.dispatch('setHideLoading');
        resolve(component)
    })
};

const AdminHotWord = resolve => {
    store.dispatch('setShowLoading');
    require(['@/components/admin/hot/index.vue'], component => {
        store.dispatch('setHideLoading');
        resolve(component)
    })
};

// const AdminMsg = resolve=>{require(['@/components/admin/message/index.vue'], resolve)};
const AdminMsg = resolve => {
    store.dispatch('setShowLoading');
    require(['@/components/admin/message/index.vue'], component => {
        store.dispatch('setHideLoading');
        resolve(component)
    })
};
// const AdminMsgDetail = resolve=>{require(['@/components/admin/message/detail.vue'], resolve)};
const AdminMsgDetail = resolve => {
    store.dispatch('setShowLoading');
    require(['@/components/admin/message/detail.vue'], component => {
        store.dispatch('setHideLoading');
        resolve(component)
    })
};
// const AdminComment = resolve=>{require(['@/components/admin/article/articleComment.vue'], resolve)};
const AdminComment = resolve => {
    store.dispatch('setShowLoading');
    require(['@/components/admin/article/articleComment.vue'], component => {
        store.dispatch('setHideLoading');
        resolve(component)
    })
};
// const AdminCount = resolve=>{require(['@/components/admin/count/index.vue'], resolve)};
const AdminCount = resolve => {
    store.dispatch('setShowLoading');
    require(['@/components/admin/count/index.vue'], component => {
        store.dispatch('setHideLoading');
        resolve(component)
    })
};


Vue.use(VueRouter)

var routerMap = {
    mode: 'history',
    base: __dirname,
    routes: [{
        path: '/',
        name: 'Home',
        meta: {
            title: '首页'
        },
        component: Home
    }, {
        path: '/search',
        name: 'Search',
        meta: {
            title: '搜索'
        },
        component: Search
    }, {
        path: '/about',
        name: 'About',
        meta: {
            title: '关于'
        },
        component: About
    }, {
        path: '/article',
        name: 'Article',
        meta: {
            title: '文章'
        },
        component: Article
    }, {
        path: '/article/detail/:id',
        name: 'ArticleDetail',
        meta: {
            title: '文章详情'
        },
        component: ArticleDetail
    }, {
        path: '/message',
        name: 'Message',
        meta: {
            title: '留言'
        },
        component: Message
    }, {
        path: '/admin',
        component: Admin,
        children: [{
            path: 'signin',
            name: 'AdminSignin',
            meta: {
                title: '登录'
            },
            component: Signin
        }, {
            path: '/admin',
            component: AdminCommon,
            children: [{
                path: '/admin',
                name: 'AdminHome',
                meta: {
                    title: '预览',
                    auth: true
                },
                component: AdminHome
            }, {
                path: '/admin/article',
                name: 'AdminArticle',
                meta: {
                    title: '文章',
                    auth: true
                },
                component: AdminArticle
            }, {
                path: '/admin/addArticle',
                name: 'AdminAddArticle',
                meta: {
                    title: '添加文章',
                    auth: true
                },
                component: AdminAddArticle
            }, {
                path: '/admin/editArticle/:id',
                name: 'AdminEditArticle',
                meta: {
                    title: '编辑文章',
                    auth: true
                },
                component: AdminEditArticle
            }, {
                path: '/admin/adminTag',
                name: 'AdminTag',
                meta: {
                    title: '标签',
                    auth: true
                },
                component: AdminTag
            }, {
                path: '/admin/adminCategory',
                name: 'AdminCategory',
                meta: {
                    title: '分类',
                    auth: true
                },
                component: AdminCate
            }, {
                path: '/admin/adminHotWord',
                name: 'AdminHotWord',
                meta: {
                    title: '热词',
                    auth: true
                },
                component: AdminHotWord
            }, {
                path: '/admin/adminMessage',
                name: 'AdminMessage',
                meta: {
                    title: '留言',
                    auth: true
                },
                component: AdminMsg
            }, {
                path: '/admin/adminMessageDetail/:id',
                name: 'AdminMessageDetail',
                meta: {
                    title: '留言详情',
                    auth: true
                },
                component: AdminMsgDetail
            }, {
                path: '/admin/adminCount',
                name: 'AdminCount',
                meta: {
                    title: '访问记录',
                    auth: true
                },
                component: AdminCount
            }, {
                path: '/admin/adminComment',
                name: 'AdminArticleComment',
                meta: {
                    title: '评论',
                    auth: true
                },
                component: AdminComment
            }]
        }]
    }, {
        path: '*',
        redirect: '/'
    }],
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return {
                x: 0,
                y: 0
            }
        }
    }
}
export default new VueRouter(routerMap);
