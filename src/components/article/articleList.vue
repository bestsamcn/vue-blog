<style src="../../assets/css/article/articleList.css" scoped></style>
<template>
    <div class="article-list" >
        <div class="moveup item" @click="goUrl({name:'ArticleDetail'})" v-for="item in articleList">
            <div class="img">
                <img src="../../assets/img/article-1.jpg">
            </div>
            <div class="title">
                <h4 class="color-black">css实现ie6以上文字高度未知垂直居中</h4>
                <div class="info margin-top-10">
                    <span class="icon-calendar">2017-02-02</span>
                    <span class="icon-comment">123 Comments</span>
                    <span class="icon-eye-open">123 Views</span>
                    <a href="javascript:;" @click="linkClick()" class="icon-heart-empty">18</a>
                </div>
            </div>
            <p class="preview">
                摘要: Examples 关于 CSS 的未知高度水平垂直居中问题的未知高度水平垂直居中问题的未知高度水平垂直居中问题的未知高度水平垂直居中问题的未知高度水平垂直居中问题
            </p>
            <a  class="more" @click="goUrl({name:'ArticleDetail'})">Read More</a>
        </div>
        <!-- <a v-if="isMore"  href="javascript:;" class="more-btn md-hide">More</a> -->
        <a v-if="isMore"  href="javascript:;" class="more-btn md-hide">No More</a>
    </div>
</template>
<script>
    import Page from './page.vue';
    export default{
        name:'articleList',
        data(){
            return {
                pageIndex:4,
                total:8
            }
        },
        props:{
            articleList:{
                type:Array,
                default:[],
                require:false 
            },
            isMore:{
                type:Boolean,
                default:false,
                require:false
            }
        },
        components:{
            Page
        },
        methods:{
            onPageClick(pageIndex){
                this.pageIndex = pageIndex;
            },
            goUrl(routerInfo){
                this.$router.push(routerInfo);
            }
        }

    }
</script>