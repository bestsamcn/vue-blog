<style src="../../assets/css/common/menu.css" scoped></style>
<template>
    <div class="menu">
        <a class="icon-bold" @click="goAndHideMenu('Home')" :class="{'active':routerName==='Home'}">首页</a>
        <a class="icon-paste" @click="goAndHideMenu('Article')" :class="{'active':routerName==='Article'}">文章</a>
        <a class="icon-leaf" @click="goAndHideMenu('About')" :class="{'active':routerName==='About'}">关于</a>
        <a class="icon-search" @click="goAndHideMenu('Search')" :class="{'active':routerName==='Search'}">搜索</a>
    </div>
</template>
<script>
    import { mapActions, mapState } from 'vuex';
    export default{
        name:'menu',
        computed:{
            ...mapState({
                routerName:state=>state.RouteModule.name
            })
        },
        methods:{
            ...mapActions([
                'setToggleMenu'
            ]),
            goAndHideMenu(routerName){
                this.setToggleMenu();
                this.$router.push({name:routerName})
            }
        }

    }
</script>
