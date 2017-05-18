<style src="../../assets/css/article/index.css" scoped></style>
<template>
    <div class="article">
        <div class="main">
            <Articlelist @onLoadMore="getList(false)" :article-list="articleList" :is-more="isMore"></Articlelist>
        </div>
        <Footerbar class="margin-top-20"></Footerbar>
    </div>
</template>
<script>
    import Articlelist from './articleList.vue';
    import * as API from '@/api/index.js';
    import $$ from '@/utils/index.js'
    import Footerbar from '@/components/common/footer.vue';
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
        components:{
            Articlelist,
            Footerbar:Footerbar
        },
        watch:{
            // '$route':'getList(true)'
        },
		methods:{
		    getList(isRefresh){
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
                    if(res.data.length < this.pageSize){
                        this.isMore = false;
                    }else{
                        this.pageIndex++;
                        this.isMore = true;
                    }
                });
		    },
            refreshList(){
                this.pageIndex = 1;
                this.isMore = true;
                this.getList(true);
            }
        },
        created(){
            this.getList(false);
        },
        mounted(){
        }

    }


</script>