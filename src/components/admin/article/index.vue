<style src="@/assets/css/admin/article/index.css" scoped></style>
<template>
    <div class="admin-article">
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