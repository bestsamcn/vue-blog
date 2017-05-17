<style src="@/assets/css/admin/common/index.css"></style>
<template>
    <div class="admin-common" :class="{'show-all':isHideSidebar}">
        <Topbar></Topbar>
        <Sidebar :class="{'hide':isHideSidebar}"></Sidebar>
        <div class="content">
            <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
                <div v-show="!isHideSidebar" class="mask" @click="setToggleSidebar()"></div>
            </transition>
            <div class="admin-map">
                <i class="icon-map-marker"></i>
                <Breadcrumb class="map-list" separator="/">
                    <BreadcrumbItem>管理</BreadcrumbItem>
                    <BreadcrumbItem v-if="routerName.indexOf('Article') !== -1">文章</BreadcrumbItem>
                    <BreadcrumbItem v-if="routerName !== 'AdminArticle' ">{{ title }}</BreadcrumbItem>
                </Breadcrumb>
            </div>
            <keep-alive>
                 <router-view class="content-view">
                 </router-view>
            </keep-alive>
            <!-- <div class="content-view">
                <slot name="component"></slot>
            </div> -->
        </div>
    </div>
</template>
<script>
    import Sidebar from '@/components/admin/common/sidebar';
    import Topbar from '@/components/admin/common/topbar';
    import { mapState, mapActions } from 'vuex';
    import $$ from '@/utils/index.js';
    import { Breadcrumb, BreadcrumbItem } from 'element-ui';
    export default{
        name:'adminCommon',
        components:{
            Sidebar,
            Topbar,
            Breadcrumb,
            BreadcrumbItem
        },
        methods:{
            ...mapActions([
                'setToggleSidebar'
            ])
        },
        computed:{
            ...mapState({
                isHideSidebar:state=>state.admin.isHideSidebar,
                title:state=>state.RouteModule.meta.title,
                routerName:state=>state.RouteModule.name
            })
        },
        created(){
            !$$.isMobile && this.setToggleSidebar(true);
            $$.isMobile && this.setToggleSidebar(false);
        }
    }
</script>