<style src="../../assets/css/home/index.css" scoped></style>
<template>
    <div class="home">
        <Backtop></Backtop>
        <div class="main">
            <Hot v-if="isMobile"></Hot>
            <div class="wrapper">
                <div class="left-cont">
                    <Articlelist :is-show-more="true" :is-more="isMore" @onLoadMore="getArticleList" :article-list="articleList"></Articlelist>
                </div>
                <div v-if="!isMobile" class="right-bar sm-hide" v-sidebar-scroll ref="sidebar">
                    <Category>
                        <div slot="title" class="title color-black">
                            分类
                        </div>
                    </Category>
                    <Articlerank :latest-list="articleList"></Articlerank>
                    <Tags class="margin-top-30">
                        <div slot="title" class="title">
                            标签
                        </div>
                    </Tags>
                </div>
            </div>
        </div>
        <Footerbar class="margin-top-20"></Footerbar>
    </div>
</template>
<script>
    import { mapActions, mapState } from 'vuex';
    import Articlelist from '../article/articleList.vue';
    import Category from './Category.vue';
    import Footerbar from '@/components/common/footer.vue';
    import Articlerank from './articleRank.vue';
    import Tags from './tags.vue';
    import Backtop from '@/components/common/backTop.vue';
    import Hot from './hot.vue'
    import * as API from '@/api/index.js';
    import $$ from '@/utils/index.js';
    export default{
        name:'home',
        data:()=>{
            return{
                articleList:[],
                pageIndex:1,
                pageSize:5,
                isMore:true
            }
        },
        methods:{
            ...mapActions([
                'setToast'
            ]),
            getArticleList(isRefresh){
                if(!this.isMore) return;
                var obj = {
                    pageIndex:this.pageIndex,
                    pageSize:this.pageSize
                }
                API.getArticleList(obj).then(res=>{
                    res.data.map(item=>{
                        if($$.getCookie(item._id)){
                            return item.isLiked = true;
                        }else{
                            return item.isLiked = false;
                        }
                    });
                    isRefresh ? (this.articleList = res.data ) : (this.articleList = this.articleList.concat(res.data));
                    if(this.pageIndex * this.pageSize >= res.total){
                        this.isMore = false;
                    }else{
                        this.pageIndex++;
                        this.isMore = true;
                    }
                });
            }
        },
        components:{
            Articlelist,
            Category,
            Articlerank,
            Tags,
            Footerbar,
            Hot,
            Backtop
        },
        computed:{
            ...mapState({
                isMobile:state=>state.common.isMobile
            })
        },
        mounted(){
            this.getArticleList(true);
        }
    }

</script>