<style src="@/assets/css/admin/article/index.css" scoped></style>
<template>
    <div class="admin-article">
        <ArticleList></ArticleList>
    </div>
</template>
<script>
    import { Breadcrumb, BreadcrumbItem } from 'element-ui';
    import ArticleList from './articleList.vue';
    export default{
        name:'adminArticle',
        components:{
            Breadcrumb,
            BreadcrumbItem,
            ArticleList
        }
    }
</script>
