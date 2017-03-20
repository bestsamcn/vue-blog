<style src="@/assets/css/common/footer.css" scoped></style>
<template>
    <div class="footer">
        <div class="webmap">
            <router-link :to="{name:'Home'}">Home</router-link>
            <router-link :to="{name:'Article'}">Article</router-link>
            <!-- <router-link :to="{name:'Category'}">Category</router-link> -->
            <router-link :to="{name:'About'}">About</router-link>
            <router-link :to="{name:'Search'}">Search</router-link>
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