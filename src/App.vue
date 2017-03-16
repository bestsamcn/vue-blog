<style src="./assets/css/common/base.css"></style>
<template>
    <div id="app">
        <Loading :is-loading="iShowLoading"></Loading>
        <Navheader></Navheader>
        <transition enter-active-class="animated bounceInLeft" leave-active-class="animated bounceOutLeft">
            <Menulist v-show="iShowMenu"></Menulist>
        </transition>
        <transition :name="$router.app.pageTransition">
            <router-view class="router-view"></router-view>
        </transition>
    </div>
</template>

<script>
import './assets/libs/animate.css/animate.min.css';
import './assets/libs/Font-Awesome-3.2.1/css/font-awesome.min.css';
import './assets/libs/lodash/dist/lodash.min.js';
import { mapState } from 'vuex';
import Loading from './components/common/loading.vue';
import Navheader from './components/common/header.vue';
import Menulist from './components/common/menu.vue';

export default {
    name: 'app',
    data(){
        return{
        }
    },
    components:{
        Loading,
        Menulist,
        Navheader
    },
    computed:{
        ...mapState({
            iShowLoading:state=>state.common.iShowLoading,
            iShowMenu:state=>state.common.iShowMenu
        })
    }
    
   
}
</script>

