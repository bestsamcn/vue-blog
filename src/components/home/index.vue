<style src="../../assets/css/home/index.css" scoped></style>
<template>
    <div class="home">
        <div class="main">
            <div class="wrapper">
                <div class="left-cont">
                    <Articlelist :article-list="articleList"></Articlelist>
                    <router-link :to="{name:'Article'}" class="more-btn">更多</router-link>
                </div>
                <div class="right-bar sm-hide">
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
    import { mapActions } from 'vuex';
    import Articlelist from '../article/articleList.vue';
    import Category from './Category.vue';
    import Footerbar from '@/components/common/footer.vue';
    import Articlerank from './articleRank.vue';
    import Tags from './tags.vue';
    import * as API from '@/api/index.js';
    export default{
        name:'home',
        data:()=>{
            return{
                articleList:[]
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
            API.getArticleList({pageSize:5, pageIndex:1}).then(res=>{
                this.articleList = res.data;
            })
        }
    }

</script>