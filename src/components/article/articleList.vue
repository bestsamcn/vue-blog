<style src="../../assets/css/article/articleList.css" scoped></style>
<template>
    <div class="article-list" >
        <div class="item" :class="{'has-right':!!item.poster && !isMobile}" @click="goUrl({name:'ArticleDetail', params:{id:item._id}})" v-for="item in articleList">
            <div class="left">
                <div class="title">
                    <h4 class="color-black">{{item.title}}</h4>
                    <div class="info margin-top-10">
                        
                        <span class="icon-comment">{{item.commentNum | transNum }} Comments</span>
                        <span class="icon-eye-open">{{item.readNum | transNum}} Views</span>
                        <span class="icon-tag">{{item.tag ? item.tag.name : 'null'}}</span>
                        <a href="javascript:;" class="icon-heart" :class="{'active':item.isLiked}">{{item.likeNum | transNum}}</a>
                    </div>
                </div>
                <p class="preview">
                    摘要: {{item.previewText | textEllipsis(50, true)}}
                </p>
                <div class="bottom">
                    <a href="javascript:;" class="more">{{item.category ? item.category.name :'我可能被删了'}}</a>
                    <a class="icon-calendar more no-border color-gray">{{item.createTime | dateFormat('yyyy-MM-dd')}}</a>
                    <a class="icon-edit more no-border color-gray"   v-if="!!item.lastEditTime">{{item.lastEditTime | dateFormat('yyyy-MM-dd')}}</a>
                </div>
            </div>
            <!-- <div class="right" v-if="!!item.poster && isMobile"> -->
            <div class="right" v-if="!!item.poster && !isMobile">
                <div class="img">
                    <img :src="`${CONFIG.POSTER_URL}/${item.poster}`" v-auto-size>
                </div>
            </div>
        </div>
        <div class="padding-20-0">
             <a v-if="(isShowMore && isMore)" @click="moreEvent()"  href="javascript:;" class="more-btn">More</a>
            <p class="text-center color-gray padding-20-0" v-if="(isShowMore && !isMore)">没有更多了</p>
        </div>
    </div>
</template>
<script>
    import $$ from '@/utils/index.js';
    import * as CONFIG from '@/api/config.js';
    import { mapState } from 'vuex';
    export default{
        name:'articleList',
        data(){
            return {
                pageIndex:4,
                total:8,
                CONFIG:CONFIG
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
            },
            isShowMore:{
                type:Boolean,
                default:true,
                require:false
            }
        },
        computed:{
            ...mapState({
                isMobile:state=>state.common.isMobile
            })
        },
        components:{
        },
        methods:{
            moreEvent(){
                this.$emit('onLoadMore')
            },
            goUrl(routerInfo){
                this.$router.push(routerInfo);
            }
        },
        created(){
        }

    }
</script>