<style src="../../assets/css/article/detail.css" scoped></style>
<template>
    <div class="article-detail">
        <div class="main">
            <div class="title">
                <h4 class="color-black">css实现ie6以上文字高度未知垂直居中</h4>
                <div class="info margin-top-10">
                    <span class="icon-calendar">2017-02-02</span>
                    <span class="icon-map-marker">JavaScript</span>
                    <span class="icon-eye-open">123 Views</span>
                    <a href="javascript:;" @click="linkClick()" class="icon-heart">18</a>
                </div>
                <Tags class="margin-bottom-30"></Tags>
            </div>
            <div class="img">
                <img src="../../assets/img/article-1.jpg">
            </div>
            <p class="preview">
                摘要: Examples 关于 CSS 的未知高度水平垂直居中问题的未知高度水平垂直居中问题的未知高度水平垂直居中问题的未知高度水平垂直居中问题的未知高度水平垂直居中问题
            </p>
            <div class="others">
                <a href="javascript:;" @click="goBack()" >返回</a>
                <a href="javascript:;" @click="goBack()" >前篇</a>
                <a href="javascript:;" @click="goBack()" >后篇</a>
                <a href="javascript:;" @click="goBack()" >点赞</a>
            </div>
            <Comment class="margin-top-30"></Comment>
        </div>
    </div>
</template>
<script>
    import Comment from './comment.vue';
    import Tags from '../home/tags.vue';
    export default{
        name:'article-detail',
        data(){
            return{

            }
        },
        components:{
            Comment,
            Tags
        },
        methods:{
            goBack(){
                this.$router.go(-1);
            }
        }
    }
</script>