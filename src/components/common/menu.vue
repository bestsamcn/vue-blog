<style src="../../assets/css/common/menu.css" scoped></style>
<template>
    <div class="menu">
        <a class="icon-bold" @click="goAndHideMenu('Home')" :class="{'active':routerName==='Home'}">首页</a>
        <a class="icon-search" @click="goAndHideMenu('Search')" :class="{'active':routerName==='Search'}">搜索</a>
        <!-- <a class="icon-paste" @click="goAndHideMenu('Article')" :class="{'active':routerName === 'Article' || routerName === 'ArticleDetail' }">文章</a> -->
        <!-- <a class="icon-th-list" @click="goAndHideMenu('Category')" :class="{'active':routerName==='Category'}">分类</a> -->
        <a class="icon-leaf" @click="goAndHideMenu('About')" :class="{'active':routerName==='About'}">关于</a>
        <a class="icon-comment" @click="goAndHideMenu('Message')" :class="{'active':routerName==='Message'}">留言</a>
        <a class="icon-user" @click="goAndHideMenu('AdminSignin')" :class="{'active':routerName==='AdminSignin'}">{{isLogin ? '管理' :'登录'}}</a>
    </div>
</template>
<script>
    import { mapActions, mapState } from 'vuex';
    export default{
        name:'menu',
        computed:{
            ...mapState({
                routerName:state=>state.RouteModule.name,
                isLogin:state=>state.common.isLogin
            })
        },
        methods:{
            ...mapActions([
                'setToggleMenu'
            ]),
            goAndHideMenu(routerName){
                this.setToggleMenu();
                if(this.isLogin && routerName == 'AdminSignin'){
                    return this.$router.push({name:'AdminHome'});
                }
                this.$router.push({name:routerName})
            }
        }
    }
</script>
