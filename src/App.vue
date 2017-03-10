<style src="./assets/css/common/base.css"></style>
<template>
    <div id="app">
        <Loading :is-loading="iShowLoading"></Loading>
        <transition :name="$router.app.pageTransition">
            <router-view class="router-view"></router-view>
        </transition>
    </div>
</template>

<script>
import './assets/libs/animate.css/animate.min.css';
import { mapState } from 'vuex';
import Loading from './components/common/loading.vue';

export default {
    name: 'app',
    data(){
        return{
        }
    },
    components:{
        Loading
    },
    computed:{
        ...mapState({
            iShowLoading:state=>state.common.iShowLoading
        })
    }
    
   
}
</script>

