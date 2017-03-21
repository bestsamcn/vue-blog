<style src="@/assets/css/admin/home/index.css"></style>
<template>
    <div class="admin-home">
        <Topbar></Topbar>
        <Sidebar :class="{'hide':iShowSidebar}"></Sidebar>
    </div>
</template>
<script>
    import Sidebar from '@/components/admin/home/sidebar';
    import Topbar from '@/components/admin/home/topbar';
    import { mapState } from 'vuex';
    export default{
        name:'adminHome',
        components:{
            Sidebar,
            Topbar
        },
        computed:{
            ...mapState({
                iShowSidebar:state=>state.admin.iShowSidebar
            })
        }
    }
</script>