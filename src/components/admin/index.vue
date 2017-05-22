<style src="../../assets/css/admin/index.css"></style>
<template>
    <div class="admin" :style="{'height':clientHeight+'px'}">
        <!-- <transition name="fade"> -->
            <keep-alive>
                <router-view class="admin-view"></router-view>
            </keep-alive>
        <!-- </transition> -->
    </div>
</template>
<script>
    import 'element-ui/lib/theme/index.css';
    import { mapState } from 'vuex';
    export default{
        name:'admin',
        computed:{
            ...mapState({
                clientHeight:state=>state.common.clientHeight
            })
        },
        watch:{
            // '$route'(to, from){
            //     this.$router.push({name:'AdminHome'})
            // }
        }
    }
</script>
