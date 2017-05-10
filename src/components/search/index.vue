<style src="../../assets/css/search/index.css" scoped></style>
<template>
    <div class="search">
        <div class="wrapper">
            <div class="moveup search-bar sm-100">
                <input type="search" placeholder="搜索" v-model="keyword" @keydown.enter="keywordEnter()" id="search-bar" class="search-input">
                <i class="icon-search search-btn" @click="add()"></i>
                <!-- <transition-group class="tips-list" tag="ul" enter-active-class="animated zoomIn" leave-active-class="animated zoomOut">
                    <li v-show="isDirty" v-for="item in list" :key="item">我是样板{{item}}</li>
                </transition-group>
 -->            </div>
            <Tags @onTagClick="tagClick" @onResetClick="resetTag()"></Tags>
            <div class="margin-top-20">
                <Articlelist @onLoadMore="getSearchList(false)" :is-more="isMore" :article-list="articleList"></Articlelist>
            </div>
            <router-link :to="{name:'Article'}"></router-link>
        </div>
    </div>
</template>
<script>
    import Articlelist from '../article/articleList.vue';
    import Tags from '../home/tags.vue';
    import * as API from '@/api/index.js';
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
            Tags
        },
        watch:{
            // keyword:'watchkeyword'
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
                    if(res.data.length < this.pageSize){
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
            }
        },
        created(){
            this.getSearchList(true);
        }

    }
</script>