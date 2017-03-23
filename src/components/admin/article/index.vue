<style src="@/assets/css/admin/article/index.css" scoped></style>
<template>
    <div class="admin-article">
        <div class="admin-map">
            <i class="icon-map-marker"></i>
            <Breadcrumb class="map-list" separator="/">
                <BreadcrumbItem>管理</BreadcrumbItem>
                <BreadcrumbItem>文章</BreadcrumbItem>
                <BreadcrumbItem>列表</BreadcrumbItem>
            </Breadcrumb>
        </div>
        <Articlelist></Articlelist>
    </div>
</template>
<script>
    import { Breadcrumb, BreadcrumbItem } from 'element-ui';
    import Articlelist from './articleList.vue';
    export default{
        name:'adminArticle',
        components:{
            Breadcrumb,
            BreadcrumbItem,
            Articlelist
        }
    }
</script>