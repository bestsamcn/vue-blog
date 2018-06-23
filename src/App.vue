<style src="./assets/css/common/base.css"></style>
<template>
    <div id="app">
        <Loading :is-loading="iShowLoading"></Loading>
        <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
        <Toast :msg="toastMsg" v-show="iShowToast"></Toast>
        </transition>
        
        <Navheader v-show="routerName && routerName.indexOf('Admin') == -1" @logoClick="onLogoClick($event)"></Navheader>
        <Notify v-if="routerName && !routerName.includes('Admin') && !!notify && !$$().getCookie(notify._id)"></Notify>
        <transition enter-active-class="animated bounceInLeft" leave-active-class="animated bounceOutLeft">
            <Menulist v-show="iShowMenu && isResizeToMobile"></Menulist>
        </transition>
        <!-- <transition :name="$router.app.pageTransition"> -->
        <!-- <transition :name="'fade'"> -->
            <keep-alive>
                <router-view :class="!!notify && !$$().getCookie(notify._id) ? 'router-view has-notify' : 'router-view'"></router-view>
            </keep-alive>
        <!-- </transition> -->
    </div>
</template>

<script>
import './assets/libs/animate.css/animate.min.css';
import './assets/libs/Font-Awesome-3.2.1/css/font-awesome.min.css';
import { mapState, mapActions } from 'vuex';
import Loading from './components/common/loading.vue';
import Navheader from './components/common/header.vue';
import Footerbar from '@/components/common/footer.vue';
import Menulist from './components/common/menu.vue';
import Toast from './components/common/toast.vue';
import Notify from './components/common/notify.vue';
import $$ from '@/utils/index.js';


export default {
    name: 'app',
    data(){
        return{
            isResizeToMobile:false
        }
    },
    components:{
        Loading,
        Menulist,
        Navheader,
        Toast,
        Footerbar,
        Notify
    },
    computed:{
        ...mapState({
            iShowLoading:state=>state.common.iShowLoading,
            iShowMenu:state=>state.common.iShowMenu,
            iShowToast:state=>state.common.iShowToast,
            notify:state=>state.common.notify,
            toastMsg:state=>state.common.toastMsg,
            routerName:state=>state.RouteModule.name
        })
    },
    methods:{
        ...mapActions([
            'setToast'
        ]),
        $$(){
            return $$;
        },
        onLogoClick(e){
            this.setToast(e);
        },
        onresizeWindow(){
            var cw = document.documentElement.clientWidth || document.body.clientWidth;
            if(cw >= 768){
                this.isResizeToMobile = false;
            }else{
                this.isResizeToMobile = true;
            }
        }
    },
    created(){
        window.addEventListener('resize', this.onresizeWindow);
        window.addEventListener('load', this.onresizeWindow);
    }
    
   
}
</script>

