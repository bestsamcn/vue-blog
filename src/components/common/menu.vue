<style src="../../assets/css/common/menu.css"></style>
<template>
    <div class="menu">
        <a @click="goAndHideMenu('Home')">首页</a>
        <a @click="goAndHideMenu('Article')">文章</a>
        <a @click="goAndHideMenu('About')">关于</a>
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
