<style src="../../assets/css/common/menu.css" scoped></style>
<template>
    <div class="menu">
        <a class="icon-bold" @click="goAndHideMenu('Home')">首页</a>
        <a class="icon-paste" @click="goAndHideMenu('Article')">文章</a>
        <a class="icon-leaf" @click="goAndHideMenu('About')">关于</a>
        <a class="icon-search" @click="goAndHideMenu('Search')">搜索</a>
    </div>
</template>
<script>
    import { mapActions } from 'vuex';
    export default{
        name:'menu',
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
