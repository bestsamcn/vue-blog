<style src="../../assets/css/common/header.css" scoped></style>
<template>
    <div class="header">
        <div class="logo color-green" @click="$router.push({name:'Home'})">B<span class="color-black font-20">est</span></div>
        <div class="nav-list sm-hide">
        	<router-link :to="{name:'Home'}" :class="{'active':routerName==='Home'}">首页</router-link>
            <router-link :to="{name:'Search'}" :class="{'active':routerName==='Search'}">搜索</router-link>
        	<!-- <router-link :to="{name:'Article'}" :class="{'active':routerName === 'Article' || routerName === 'ArticleDetail' }">文章</router-link> -->
            <router-link :to="{name:'About'}" :class="{'active':routerName==='About'}">关于</router-link>
        	<router-link :to="{name:'Message'}" :class="{'active':routerName==='Message'}">留言</router-link>
            <!-- <router-link :to="{name:'AdminSignin'}" :class="{'active':routerName==='AdminSignin'}">{{isLogin ? '管理' : '登录'}}</router-link> -->
        </div>
        <div class="menu-btn md-hide">
            <a href="javascript:;" @click="setToggleMenu()" class="icon-reorder" :class="{'on':iShowMenu}"></a>
        </div>
    </div>
</template>
<script>
    import { mapActions, mapState } from 'vuex';
    export default{
        name:'header',
        computed:{
            ...mapState({
                iShowMenu:state=>state.common.iShowMenu,
                routerName:state=>state.RouteModule.name,
                isLogin:state=>state.common.isLogin
            })
        },
        methods:{
            ...mapActions([
                'setToggleMenu'
            ]),
            say(){
                console.log(this.routerName)
            },
            emitEvent(){
                this.$emit('logoClick','logoclick');
            }
        }
    }
</script>