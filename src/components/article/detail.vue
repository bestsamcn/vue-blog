<style src="../../assets/css/article/detail.css"></style>
<template>
    <div class="article-detail">
        <Backtop></Backtop>
        <div class="main">
            <div class="title">
                <h4 class="color-black">{{ article.title }}</h4>
                <div class="info margin-top-10">
                    <span class="icon-calendar">{{article.createTime | dateFormat('yyyy-MM-dd')}}</span>
                    <span class="icon-map-marker">{{article.category && article.category.name}}</span>
                    <span class="icon-eye-open">{{article.readNum | transNum}} Views</span>
                    <span class="icon-tag">{{article.tag && article.tag.name}}</span>
                    <span class="icon-edit" v-if="!!article.lastEditTime && !isMobile">{{article.lastEditTime | dateFormat('yyyy-MM-dd hh:mm:ss')}}</span>
                    <a href="javascript:;" @click="likeClick()" class="icon-heart" :class="{'active':isLiked}">{{article.likeNum | transNum}}</a>
                </div>
            </div>
            <div class="img">
                <img v-if="false" src="../../assets/img/article-1.jpg">
            </div>
            <p class="preview">
                {{article.previewText}}
            </p>
            <div class="content markdown-body" v-html="article.content">
            </div>
            <div class="others">
                <a href="javascript:;" @click="goBack()" >返回</a>
                <router-link v-if="prevID" :to="{name:'ArticleDetail', params:{id:prevID}}">前篇</router-link>
                <router-link v-if="nextID" :to="{name:'ArticleDetail', params:{id:nextID}}">后篇</router-link>
                <a href="javascript:;" @click="likeClick()" :class="{'is-liked':isLiked}">点赞</a>
            </div>
            <Comment class="margin-top-30" :article="$route.params.id">
            </Comment>
        </div>
        <Footerbar class="margin-top-20"></Footerbar>
    </div>
</template>
<script>
    import simplemde from 'simplemde'
    import Comment from './comment.vue';
    import Tags from '../home/tags.vue';
    import * as API from '@/api/index.js';
    import '@/assets/css/common/github-markdown.css';
    import '@/assets/css/common/atom-one-dark.css';
    import $$ from '@/utils/index.js';
    import Footerbar from '@/components/common/footer.vue';
    import Backtop from '@/components/common/backTop.vue';
    import { mapActions, mapState } from 'vuex';
    export default{
        name:'article-detail',
        data(){
            return{
                article:{},
                parseHtml:'',
                editor:null,
                prevID:'',
                nextID:'',
                isLiked:false,
                type:1
            }
        },
        components:{
            Comment,
            Tags,
            Footerbar,
            Backtop
        },
        computed:{
            ...mapState({
                isMobile:state=>state.common.isMobile
            })
        },
        watch:{
            '$route':'getDetail'
        },
        methods:{
            ...mapActions([
                'setToast'
            ]),
            goBack(){
                this.$router.go(-1);
            },
            getDetail(){
                if(!this.$route.params.id) return;
                this.isLiked = false;
                API.getArticleDetail({id:this.$route.params.id, type:this.type}).then(res=>{
                    this.article = res.data.curr;
                    this.prevID = res.data.prev && res.data.prev._id || '';
                    this.nextID = res.data.next && res.data.next._id || '';
                    if($$.getCookie(this.article._id)){
                        this.isLiked = true;
                    }
                });
            },
            likeClick(){
                if($$.getCookie(this.article._id)){
                    this.setToast('已经点赞过啦');
                    return;
                }
                API.likeArticle({id:this.article._id}).then(res=>{
                    $$.setCookie(this.article._id, true, 7);
                    this.isLiked = true;
                    this.article.likeNum = this.article.likeNum+1;
                });
            }
        },
        created(){
            this.getDetail();
        },
        mounted(){
            // this.$nextTick(()=>{
            //     this.getDetail();
            // })
        }
    }
</script>