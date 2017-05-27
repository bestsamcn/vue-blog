<style src="../../assets/css/search/index.css" scoped></style>
<template>
    <div class="search">
        <Backtop></Backtop>
        <div class="wrapper">
            <div class="moveup search-bar sm-100">
                <form style="width:100%" novalidate action="javascript:;">
                    <input type="search" name="search" placeholder="搜索" v-model="keyword" @keydown.enter="keywordEnter()" id="search-bar" class="search-input">
                </form>
                <i class="icon-search search-btn" @click="add()"></i>
                <!-- <transition-group class="tips-list" tag="ul" enter-active-class="animated zoomIn" leave-active-class="animated zoomOut">
                    <li v-show="isDirty" v-for="item in list" :key="item">我是样板{{item}}</li>
                </transition-group>
 -->            </div>
            <!-- <Tags @onTagClick="tagClick" :is-disabled="false" @onResetClick="resetTag"></Tags> -->
            <div class="margin-top-20">
                <Articlelist @onLoadMore="getSearchList(false)" class="padding-0 border-top-1" :is-more="isMore" :article-list="articleList"></Articlelist>
            </div>
            <router-link :to="{name:'Article'}"></router-link>
        </div>
        <Footerbar class="margin-top-20"></Footerbar>
    </div>
</template>
<script>
    import Articlelist from '../article/articleList.vue';
    import Tags from '../home/tags.vue';
    import { mapState } from 'vuex';
    import Backtop from '@/components/common/backTop.vue';
    import * as API from '@/api/index.js';
    import Footerbar from '@/components/common/footer.vue';
    export default{
        name:'search',
        data(){
            return{
                list:[1,2,3,4],
                articleList:[],
                next:1,
                keyword:'',
                isDirty:false,
                pageIndex:1,
                pageSize:5,
                tag:'',
                category:'',
                isMore:true
            }
        },
        components:{
            Articlelist,
            Tags,
            Footerbar,
            Backtop
        },
        computed:{
            ...mapState({
                hotWord:state=>state.common.hotWord
            })
        },
        watch:{
            '$route':'findByHotWord'
        },
        methods:{
            watchkeyword(){
                let t = null;
                var that = this;
                if(!this.keyword){
                    this.keyword = '';
                    this.isDirty = false;
                    return;
                };
                t && clearTimeout(t);
                t = setTimeout(()=>{
                    var obj = {
                        keyword:that.keyword,
                        pageIndex:1,
                        pageSize:5
                    };
                    this.isDirty = true;
                },500);
            },
            add(){
                this.list.push(this.next);
                this.next++;
            },
            getSearchList(isRefresh){
                if(!this.isMore) return;
                var obj = {
                    pageIndex:this.pageIndex,
                    pageSize:this.pageSize,
                    tag:this.tag,
                    category:this.category,
                    keyword:this.keyword
                }
                API.getArticleList(obj).then(res=>{
                    isRefresh ? (this.articleList = res.data) : (this.articleList = this.articleList.concat(res.data));
                    if(this.pageIndex * this.pageSize >= res.total){
                        this.isMore = false;
                    }else{
                        this.pageIndex++;
                        this.isMore = true;
                    }
                });
            },
            tagClick(tag_id){
                this.pageIndex = 1;
                this.tag = tag_id;
                this.isMore = true;
                this.getSearchList(true);
            },
            keywordEnter(){
                this.pageIndex = 1;
                this.isMore = true;
                this.getSearchList(true);
            },
            resetTag(){
                this.pageIndex = 1;
                this.isMore = true;
                this.tag = '';
                this.keyword = '';
                this.getSearchList(true);
            },
            findByHotWord(){
                if(this.$route.name !== 'Search') return;
                if(this.hotWord.isFromHotWord && this.hotWord.name){
                    this.keyword = this.hotWord.name;
                    this.isMore = true;
                    this.pageIndex= 1;
                    this.getSearchList(true);
                }
            }
        },
        created(){
            if(this.hotWord && this.hotWord.isFromHotWord && this.hotWord.name){
                this.keyword = this.hotWord.name;
            }
            this.getSearchList(true);
        }

    }
</script>