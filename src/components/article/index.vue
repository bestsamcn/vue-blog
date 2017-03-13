<style src="../../assets/css/article/index.css" scoped></style>
<template>
    <div class="article">
        <router-link :to="{name:'Home'}">Home</router-link>
        <router-link :to="{name:'ArticleDetail'}">ArticleDetail</router-link>
    </div>
</template>
<script>
    export default{
        name:'home'
    }
</script>