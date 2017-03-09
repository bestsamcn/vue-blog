<style src="./assets/css/common/base.css"></style>
<template>
    <div id="app">
        <Loading :is-loading="iShowLoading"></Loading>
        <router-view></router-view>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import Loading from './components/common/loading.vue';

export default {
    name: 'app',
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

