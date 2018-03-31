<style src="@/assets/css/home/articleRank.css" scoped></style>
<template>
    <div class="moveup article-rank margin-top-30">
        <div class="tab-list">
            <a href="javascript:;" :class="{'active':(activeIndex === 1)}" @click="navClick(1)">最新</a>
            <a href="javascript:;" :class="{'active':(activeIndex === 2)}" @click="navClick(2)">最火</a>
            <a href="javascript:;" :class="{'active':(activeIndex === 3)}" @click="navClick(3)">评论</a>
            <a href="javascript:;" :class="{'active':(activeIndex === 4)}" @click="navClick(4)">阅读</a>
        </div>
        <div class="tab-cont">
            <transition enter-active-class="animated bounceInRight" leave-active-class="animated bounceOutLeft">
            <div class="popular" v-show="activeIndex===1">
                <router-link :to="{name:'ArticleDetail', params:{id:item._id}}" v-if="latestList.length" v-for="item in latestList" :key="item._id">
                    <div class="img">
                        <div class="img-box">
                            <img v-if="!!item.poster" :src="`${CONFIG.POSTER_URL}/${item.poster}`">
                            <span v-if="!item.poster">{{item.title | textEllipsis(2,true)}}</span>
                        </div>
                    </div>
                    <div class="text">
                        <h4>{{item.title}}</h4>
                        <p><i class="icon-edit"></i>{{(item.lastEditTime ? item.lastEditTime : item.createTime) | dateFormat('yyyy-MM-dd')}}</p>
                    </div>
                </router-link>
            </div>
            </transition>
            <transition enter-active-class="animated bounceInRight" leave-active-class="animated bounceOutLeft">
            <div class="popular" v-show="activeIndex===2">
                <router-link :to="{name:'ArticleDetail', params:{id:item._id}}" v-if="hotList.length" v-for="item in hotList" :key="item._id">
                    <div class="img">
                        <div class="img-box">
                            <img v-if="!!item.poster" :src="`${CONFIG.POSTER_URL}/${item.poster}`">
                            <span v-if="!item.poster">{{item.title | textEllipsis(2,true)}}</span>
                        </div>
                    </div>
                    <div class="text">
                        <h4>{{item.title}}</h4>
                        <p><i class="icon-calendar"></i>{{item.createTime | dateFormat('yyyy-MM-dd')}}</p>
                    </div>
                </router-link>
            </div>
            </transition>
            <transition enter-active-class="animated bounceInRight" leave-active-class="animated bounceOutLeft">
            <div class="popular" v-show="activeIndex===3">
                <router-link :to="{name:'ArticleDetail', params:{id:item.article._id}}" v-if="commentList.length" v-for="item in commentList" :key="item._id">
                    <div class="img">
                        <div class="img-box name">
                            <span>{{item.createLog.createName | textEllipsis(3,true)}}</span>
                        </div>
                    </div>
                    <div class="text">
                        <h4>RE:{{item.parentComent ? item.parentComment.content : item.article.title}}</h4>
                        <p><i class="icon-calendar"></i>{{item.createTime | dateFormat('yyyy-MM-dd')}}</p>
                    </div>
                </router-link>
            </div>
            </transition>
            <transition enter-active-class="animated bounceInRight" leave-active-class="animated bounceOutLeft">
            <div class="popular" v-show="activeIndex===4">
                <router-link :to="{name:'ArticleDetail', params:{id:item._id}}" v-if="readNumList.length" v-for="item in readNumList" :key="item._id">
                    <div class="img">
                        <div class="img-box">
                            <img v-if="!!item.poster" :src="`${CONFIG.POSTER_URL}/${item.poster}`">
                            <span v-if="!item.poster">{{item.title | textEllipsis(2,true)}}</span>
                        </div>
                    </div>
                    <div class="text">
                        <h4>{{item.title}}</h4>
                        <p><i class="icon-calendar"></i>{{item.createTime | dateFormat('yyyy-MM-dd')}}</p>
                    </div>
                </router-link>
            </div>
            </transition>
        </div>
    </div>
</template>
<script>
    import * as API from '@/api/index.js';
    import * as CONFIG from '@/api/config.js';
    export default{
        // props:{
        //     latestList:{
        //         type:Array,
        //         require:false,
        //         default:[]
        //     }
        // },
        name:'article-rank',
        data(){
            return {
                activeIndex:1,
                pageIndex:1,
                pageSize:4,
                hotList:[],
                commentList:[],
                likestList:[],
                readNumList:[],
                latestList:[],
                CONFIG:CONFIG

            }
        },
        methods:{
            navClick(i){
                this.activeIndex = i;
            },
            getHotList(){
                var obj = {
                    type:1,
                    pageIndex:this.pageIndex,
                    pageSize:this.pageSize
                }
                API.getArticleList(obj).then(res=>{
                    this.hotList = res.data;
                });
            },
            getLatestComent(){
                var obj = {
                    pageIndex:this.pageIndex,
                    pageSize:this.pageSize
                }
                API.getCommentList(obj).then(res=>{
                    this.commentList = res.data;
                });
            },
            getReadNumAritlce(){
                var obj = {
                    type:2,
                    pageIndex:this.pageIndex,
                    pageSize:this.pageSize
                }
                API.getArticleList(obj).then(res=>{
                    this.readNumList = res.data;
                });
            },
            getLatestEditAritlce(){
                var obj = {
                    type:3,
                    pageIndex:this.pageIndex,
                    pageSize:this.pageSize
                }
                API.getArticleList(obj).then(res=>{
                    this.latestList = res.data;
                });
            }
        },
        created(){
            this.getHotList();
            this.getLatestComent();
            this.getReadNumAritlce();
            this.getLatestEditAritlce();
        }
    }
</script>
