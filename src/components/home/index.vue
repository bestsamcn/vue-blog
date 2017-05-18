<style src="../../assets/css/home/index.css" scoped></style>
<template>
    <div class="home">
        <div class="main">
            <div class="wrapper">
                <div class="left-cont">
                    <Articlelist :is-show-more="false" :is-more="false" :article-list="articleList"></Articlelist>
                    <router-link v-if="isMore" :to="{name:'Article'}" class="more-btn">更多</router-link>
                    <p class="text-center color-gray padding-bottom-20" v-if="!isMore">没有更多了</p>
                </div>
                <div class="right-bar sm-hide">
                    <Category>
                        <div slot="title" class="title color-black">
                            分类
                        </div>
                    </Category>
                    <Articlerank :latest-list="articleList"></Articlerank>
                    <Tags :is-show-reset="false" :is-disabled="true" class="margin-top-30">
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
    import { mapActions } from 'vuex';
    import Articlelist from '../article/articleList.vue';
    import Category from './Category.vue';
    import Footerbar from '@/components/common/footer.vue';
    import Articlerank from './articleRank.vue';
    import Tags from './tags.vue';
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
            ])
        },
        components:{
            Articlelist,
            Category,
            Articlerank,
            Tags,
            Footerbar
        },
        mounted(){
            API.getArticleList({pageSize:this.pageSize, pageIndex:this.pageIndex}).then(res=>{
                res.data.map(item=>{
                    if($$.getCookie(item._id)){
                        return item.isLiked = true;
                    }else{
                        return item.isLiked = false;
                    }
                });
                if(res.data.length < this.pageSize) this.isMore = false;
                this.articleList = res.data;
            })
        }
    }

</script>