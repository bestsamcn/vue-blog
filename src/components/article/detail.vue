<style src="../../assets/css/article/detail.css" scoped></style>
<template>
    <div class="article-detail margin-top-20">
        <div class="main">
            <div class="title">
                <h4 class="color-black">css实现ie6以上文字高度未知垂直居中</h4>
                <div class="info margin-top-10">
                    <span class="icon-calendar">2017-02-02</span>
                    <span class="icon-comment">123 Comments</span>
                    <span class="icon-map-marker">FE JavaScript</span>
                    <span class="icon-eye-open">123 Views</span>
                    <a href="javascript:;" @click="linkClick()" class="icon-heart-empty">18</a>
                </div>
            </div>
            <div class="img">
                <img src="../../assets/img/article-1.jpg">
            </div>
            <p class="preview">
                摘要: Examples 关于 CSS 的未知高度水平垂直居中问题的未知高度水平垂直居中问题的未知高度水平垂直居中问题的未知高度水平垂直居中问题的未知高度水平垂直居中问题
            </p>
            <a href="javascript:;" @click="goBack()" class="more-btn">返回</a>
        </div>
    </div>
</template>
<script>
    export default{
        name:'article-detail',
        methods:{
            goBack(){
                this.$router.go(-1);
            }
        }
    }
</script>