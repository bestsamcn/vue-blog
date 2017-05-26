<style src="@/assets/css/common/footer.css" scoped></style>
<template>
    <div class="footer">
        <div class="webmap">
            <router-link :to="{name:'Home'}">首页</router-link>
            <router-link :to="{name:'Search'}">搜索</router-link>
            <!-- <router-link :to="{name:'Article'}">文章</router-link> -->
            <!-- <router-link :to="{name:'Category'}">Category</router-link> -->
            <router-link :to="{name:'About'}">关于</router-link>
            <router-link :to="{name:'Message'}">留言</router-link>
        </div>
        <div class="copyright">
            copyright@2017 bestsamcn
        </div>
    </div>
</template>
<script>
    export default{
        name:'footer'
    }
</script>