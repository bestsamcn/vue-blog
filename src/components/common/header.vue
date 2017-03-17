<style src="../../assets/css/common/header.css" scoped></style>
<template>
    <div class="header">
        <div class="logo color-green">B<span class="color-black font-20">est</span></div>
        <div class="nav-list sm-hide">
        	<router-link :to="{name:'Home'}" :class="{'active':routerName==='Home'}">Home</router-link>
        	<router-link :to="{name:'Article'}" :class="{'active':routerName==='Article'}">Article</router-link>
            <router-link :to="{name:'About'}" :class="{'active':routerName==='About'}">About</router-link>
        	<router-link :to="{name:'Search'}" :class="{'active':routerName==='Search'}">Search</router-link>
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
                routerName:state=>state.RouteModule.name
            })
        },
        methods:{
            ...mapActions([
                'setToggleMenu'
            ]),
            say(){
                console.log(this.routerName)
            }
        }
    }
</script>