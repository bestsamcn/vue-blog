<style src="../../assets/css/article/index.css" scoped></style>
<template>
    <div class="article">
        <Backtop></Backtop>
        <div class="main">
            <Articlelist @onLoadMore="getList(false)" :article-list="articleList" :is-more="isMore"></Articlelist>
        </div>
        <Footerbar class="margin-top-20"></Footerbar>
    </div>
</template>
<script>
    import Articlelist from './articleList.vue';
    import * as API from '@/api/index.js';
    import $$ from '@/utils/index.js';
    import { mapState, mapActions } from 'vuex';
    import Backtop from '@/components/common/backTop.vue';
    import Footerbar from '@/components/common/footer.vue';
    export default{
        name:'home',
        data:()=>{
		    return{
                articleList:[],
                pageIndex:1,
                pageSize:5,
                tag:'',
                category:'',
                isMore:true
		    }
		},
        components:{
            Articlelist,
            Footerbar:Footerbar,
            Backtop:Backtop
        },
        computed:{
            ...mapState({
                articleParams:state=>state.common.articleParams
            })
        },
        watch:{
            '$route':'getFromHome'
        },
		methods:{
            ...mapActions([
                'setArticleParams'
            ]),
		    getList(isRefresh){
                if(!this.isMore) return;
                var obj = {
                    pageIndex:this.pageIndex,
                    pageSize:this.pageSize,
                    tag:this.tag,
                    category:this.category
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
            },
            getFromHome(){
                if(this.articleParams.isFromHome && (this.articleParams.tag || this.articleParams.category)){
                    this.tag = this.articleParams.tag;
                    this.category = this.articleParams.category;
                    this.isMore = true;
                    this.pageIndex = 1;
                    this.setArticleParams({isFromHome:false, tag:'', category:''})
                    this.getList(true)
                }
            }
        },
        created(){
            if(this.articleParams.isFromHome && (this.articleParams.tag || this.articleParams.category)){
                this.tag = this.articleParams.tag;
                this.category = this.articleParams.category;
                this.isMore = true;
                this.pageIndex = 1;
                this.setArticleParams({isFromHome:false, tag:'', category:''})
            }
            this.getList(true);
        },
        mounted(){
        }

    }


</script>