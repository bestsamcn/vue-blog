<style src="@/assets/css/admin/common/index.css"></style>
<template>
    <div class="admin-common" :class="{'show-all':isHideSidebar}">
        <Topbar></Topbar>
        <Sidebar :class="{'hide':isHideSidebar}"></Sidebar>
        <div class="content">
            <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
                <div v-show="!isHideSidebar" class="mask" @click="setToggleSidebar()"></div>
            </transition>
            <transition name="fade">
                <keep-alive>
                     <router-view class="content-view"></router-view>
                 </keep-alive>
            </transition>
        </div>
    </div>
</template>
<script>
    import Sidebar from '@/components/admin/common/sidebar';
    import Topbar from '@/components/admin/common/topbar';
    import { mapState, mapActions } from 'vuex';
    export default{
        name:'adminCommon',
        components:{
            Sidebar,
            Topbar
        },
        methods:{
            ...mapActions([
                'setToggleSidebar'
            ])
        },
        computed:{
            ...mapState({
                isHideSidebar:state=>state.admin.isHideSidebar
            })
        },
        created(){
            this.setToggleSidebar(true)
        }
    }
</script>