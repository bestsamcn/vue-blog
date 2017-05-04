<style src="../../assets/css/article/detail.css" scoped></style>
<template>
    <div class="article-detail">
        <div class="main">
            <div class="title">
                <h4 class="color-black">{{ article.title }}</h4>
                <div class="info margin-top-10">
                    <span class="icon-calendar">{{article.createTime | dateFormat('yyyy-MM-dd')}}</span>
                    <span class="icon-map-marker">{{article.category.name}}</span>
                    <span class="icon-eye-open">{{article.readNum}} Views</span>
                    <a href="javascript:;" @click="linkClick()" class="icon-heart">{{article.likeNum}}</a>
                </div>
                <Tags class="margin-bottom-30"></Tags>
            </div>
            <div class="img">
                <img src="../../assets/img/article-1.jpg">
            </div>
            <p class="preview">
                导读：{{article.previewText}}
            </p>
            <div class="content markdown-body" v-html="article.content">
            </div>
            <div class="others">
                <a href="javascript:;" @click="goBack()" >返回</a>
                <a href="javascript:;" @click="goBack()" >前篇</a>
                <a href="javascript:;" @click="goBack()" >后篇</a>
                <a href="javascript:;" @click="goBack()" >点赞</a>
            </div>
            <Comment class="margin-top-30">
                
            </Comment>
        </div>
    </div>
</template>
<script>
    import simplemde from 'simplemde'
    import Comment from './comment.vue';
    import Tags from '../home/tags.vue';
    import * as API from '@/api/index.js';
    import '@/assets/css/common/github-markdown.css';
    import '@/assets/css/common/atom-one-dark.css';
    export default{
        name:'article-detail',
        data(){
            return{
                article:{},
                parseHtml:'',
                editor:null
            }
        },
        components:{
            Comment,
            Tags
        },
        watch:{
            '$route':'getDetail'
        },
        methods:{
            goBack(){
                this.$router.go(-1);
            },
            getDetail(){
                if(!this.$route.params.id) return;
                API.getArticleDetail({id:this.$route.params.id}).then(res=>{
                    console.log(res)
                    this.article = res.data;
                });
            }
        },
        created(){
            this.getDetail();
        },
        mounted(){
        }
    }
</script>