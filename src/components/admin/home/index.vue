<style src="@/assets/css/admin/home/index.css" scoped></style>
<template>
    <div class="admin-home">
        <div class="admin-map">
            <i class="icon-map-marker"></i>
            <Breadcrumb class="map-list" separator="/">
                <BreadcrumbItem>管理</BreadcrumbItem>
                <BreadcrumbItem>主页</BreadcrumbItem>
            </Breadcrumb>
        </div>
        <div class="preview">
            <div class="prev-item bg-green">
                <h4>访客总数</h4>
            </div>
            <div class="prev-item bg-red">
                <h4>今天访问</h4> 
            </div>
            <div class="prev-item bg-blue">
                <h4>在线人数</h4>
            </div>
        </div>
    </div>
</template>
<script>
    import { Breadcrumb, BreadcrumbItem } from 'element-ui';
    export default{
        name:'adminHome',
        components:{
            Breadcrumb,
            BreadcrumbItem
        }
    }
</script>