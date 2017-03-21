<style src="@/assets/css/admin/home/index.css"></style>
<template>
    <div class="admin-home">
        <Topbar></Topbar>
        <Sidebar></Sidebar>
    </div>
</template>
<script>
    import Sidebar from '@/components/admin/home/sidebar';
    import Topbar from '@/components/admin/home/topbar';
    export default{
        name:'adminHome',
        components:{
            Sidebar,
            Topbar
        }
    }
</script>