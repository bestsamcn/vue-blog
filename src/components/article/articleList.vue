<style src="../../assets/css/article/articleList.css" scoped></style>
<template>
    <div class="article-list" >
        <div class="moveup item" @click="goUrl({name:'ArticleDetail', params:{id:item._id}})" v-for="item in articleList">
            <div class="img">
                <img src="../../assets/img/article-1.jpg">
            </div>
            <div class="title">
                <h4 class="color-black">{{item.title}}</h4>
                <div class="info margin-top-10">
                    <span class="icon-calendar">{{item.createTime | dateFormat('yyyy-MM-dd')}}</span>
                    <span class="icon-comment">{{item.commentNum || 0}} Comments</span>
                    <span class="icon-eye-open">{{item.readNum}} Views</span>
                    <span class="icon-tag">{{item.tag && item.tag.name}}</span>
                    <a href="javascript:;" class="icon-heart-empty">{{item.likeNum}}</a>
                </div>
            </div>
            <p class="preview">
                摘要: {{item.previewText}}
            </p>
            <a  class="more" @click="goUrl({name:'ArticleDetail', params:{id:item._id}})">Read More</a>
        </div>
        <a v-if="isMore" @click="moreEvent()"  href="javascript:;" class="more-btn">More</a>
        <!-- <a v-if="isMore"  href="javascript:;" class="more-btn md-hide">No More</a> -->
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
            moreEvent(){
                this.$emit('loadMore')
            },
            goUrl(routerInfo){
                this.$router.push(routerInfo);
            }
        }

    }
</script>