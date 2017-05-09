<style src="@/assets/css/home/articleRank.css" scoped></style>
<template>
    <div class="moveup article-rank margin-top-30">
        <div class="tab-list">
            <a href="javascript:;" :class="{'active':(activeIndex === 1)}" @click="navClick(1)">最火</a>
            <a href="javascript:;" :class="{'active':(activeIndex === 2)}" @click="navClick(2)">最新</a>
            <a href="javascript:;" :class="{'active':(activeIndex === 3)}" @click="navClick(3)">评论</a>
            <a href="javascript:;" :class="{'active':(activeIndex === 4)}" @click="navClick(4)">标签</a>
        </div>
        <div class="tab-cont">
            <transition enter-active-class="animated bounceInRight" leave-active-class="animated bounceOutLeft">  
            <div class="popular" v-show="activeIndex===1">
                <a href="#" v-for="item in hotList" :key="item._id">
                    <div class="img">
                        <div class="img-box">
                            <img src="../../assets/img/article-1.jpg">
                        </div>
                    </div>
                    <div class="text">
                        <h4>{{item.title}}</h4>
                        <p><i class="icon-calendar"></i>{{item.createTime | dateFormat('yyyy-MM-dd')}}</p>
                    </div>
                </a>
            </div>
            </transition> 
            <transition enter-active-class="animated bounceInRight" leave-active-class="animated bounceOutLeft"> 
            <div class="popular" v-show="activeIndex===2">
                <a href="#" v-for="item in latestList" :key="item._id">
                    <div class="img">
                        <div class="img-box">
                            <img src="../../assets/img/article-1.jpg">
                        </div>
                    </div>
                    <div class="text">
                        <h4>{{item.title}}</h4>
                        <p><i class="icon-calendar"></i>{{item.createTime | dateFormat('yyyy-MM-dd')}}</p>
                    </div>
                </a>
            </div>
            </transition>
            <transition enter-active-class="animated bounceInRight" leave-active-class="animated bounceOutLeft"> 
            <div class="popular" v-show="activeIndex===3">
                <a href="#" v-for="item in commentList" :key="item._id">
                    <div class="img">
                        <div class="img-box name">
                            <span>{{item.createLog.createName | textEllipsis(3,true)}}</span>
                        </div>
                    </div>
                    <div class="text">
                        <h4>RE:{{item.parentComent ? item.parentComment.content : item.article.title}}</h4>
                        <p><i class="icon-calendar"></i>{{item.createTime | dateFormat('yyyy-MM-dd')}}</p>
                    </div>
                </a>
            </div>
            </transition>  
            <transition enter-active-class="animated bounceInRight" leave-active-class="animated bounceOutLeft"> 
            <div class="popular" v-show="activeIndex===4">
                <a href="#" v-for="item in [1,2,3,4]">
                    <div class="img">
                        <img src="" alt="">
                    </div>
                    <div class="text">
                        <h4>关于this的指向问题关于th搜索is的指向问题</h4>
                        <p><i class="icon-calendar"></i>2017.02.03</p>
                    </div>
                </a>
            </div>
            </transition>  
        </div>
    </div>
</template>
<script>
    import * as API from '@/api/index.js';
    export default{
        props:{
            latestList:{
                type:Array,
                require:false,
                default:[]
            }
        },
        name:'article-rank',
        data(){
            return {
                activeIndex:1,
                pageIndex:1,
                pageSize:4,
                hotList:[],
                commentList:[],
                likestList:[]
            }
        },
        methods:{
            navClick(i){
                this.activeIndex = i;
            },
            getHotList(type){
                var obj = {
                    type:1
                }
                API.getArticleList(obj).then(res=>{
                    this.hotList = res.data;
                }); 
            },
            getLatestComent(){
                var obj = {
                    pageIndex:1,
                    pageSize:4
                }
                API.getCommentList(obj).then(res=>{
                    this.commentList = res.data;
                });
            }
        },
        created(){
            this.getHotList(1);
            this.getLatestComent();
        }
    }
</script>