<style src="@/assets/css/article/comment.css"></style>
<template>
    <div class="comment">
        <div class="comment-form">
            <ul>
                <li>
                    <input type="text" v-model="name" placeholder="你的昵称">
                </li>
                <li>
                    <input type="text" v-model="email" placeholder="你的邮箱">
                </li>
                <li style="position:relative">
                    <span v-if="reply" id="reply-name">@{{reply.createLog.createName+': '}}</span>
                    <textarea placeholder="回复内容" @keyup.8="backSpace()" :style="{textIndent:replyOffsetWidth+'px'}" v-model="content" cols="30" rows="10">
                    </textarea>
                </li>
                <li>
                    <label>
                        <input type="checkbox" v-model="isSaveInfo">
                        <span class="icon-check-empty">记住评论信息</span>
                    </label>
                    <a href="javascript:;" class="face icon-github-alt">表情</a>
                    <button @click.stop="postClick()" class="sub-btn">提交</button>
                </li>
            </ul>
        </div>
        <div class="comment-list">
            <div class="comment-item" v-for="item in commentList" :key="item._id">
                <a :name="item._id"></a>
                <div class="favor">
                    <a href="javascript:;" @click="likeClick(1, item)" class="icon-sort-up up"></a>
                    <span>{{item.likeNum}}</span>
                    <a href="javascript:;" @click="likeClick(0, item)" class="icon-sort-down down"></a>
                </div>
                <div class="cont">
                    <h4 class="title text-left">
                        {{item.createLog.createName}}：
                    </h4>

                    <p v-if="!!item.parentComment" class="quote">@{{item.parentComment.createLog.createName}}：{{item.parentComment.content}}</p>
                    <p class="text text-left color-black margin-top-5">
                        {{item.content}}
                    </p>
                    <div class="operate text-left margin-top-10">
                        <a class="color-gray font-12 icon-time">{{item.createLog.createTime | dateDesc}}</a>
                        <a href="javascript:;" class="text-left color-gray font-12 icon-comment" @click="replyClick(item)">回复</a>
                    </div>
                </div>
            </div>
        </div>
        <p class="text-center margin-top-10 color-gray" v-if="!commentList.length">还没有评论，争做评论第一人...</p>
        <a href="javascript:;" v-if="isMore" @click="getList(false)" class="more-btn md-hide">More</a>
    </div>
</template>
<script>
    import * as API from '@/api/index.js';
    import $$ from '@/utils/index.js';
    import { mapActions } from 'vuex';
    export default{
        name:'comment',
        props:{
            article:{
                type:String,
                require:true
            }
        },
        data(){
            return{
                name:'',
                email:'',
                content:'',
                parentComment:'',
                isSaveInfo:false,
                pageIndex:1,
                pageSize:5,
                commentList:[],
                reply:null,
                isMore:true,
                replyOffsetWidth:0,
                backSpaceTimes:0
            }
        },
        watch:{
            '$route':'refreshList'
        },
        methods:{
            ...mapActions([
                'setToast'
            ]),
            postClick(){
                if(!this.name){
                    this.setToast('请先填写用户名');
                    return;
                }
                if(!this.email){
                    this.setToast('请先填写邮箱');
                    return;
                }
                var obj = {
                    article:this.article,
                    name:this.name,
                    email:this.email,
                    content:this.content,
                    parentComment:this.parentComment
                }
                if(!!this.reply){
                    obj.parentComment = this.reply._id;
                }
                API.addComment(obj).then(res=>{
                    this.isSaveInfo && this.saveInfo(this);
                    this.content = '';
                    this.parentComment = '';
                    this.reply = null;
                    this.commentList.unshift(res.data);
                    this.replyOffsetWidth = 0;
                });
            },
            refreshList(){
                this.pageIndex = 1;
                this.isMore = true;
                this.getList(true);
            },
            saveInfo(_this){
                if(!_this.name){
                    _this.setToast('请先填写用户名');
                    return;
                }
                if(!_this.email){
                    _this.setToast('请先填写邮箱');
                    return;
                }
                window.localStorage['__postName__'] = _this.name;
                window.localStorage['__email__'] = _this.email;
                window.localStorage['__isSaveInfo__'] = true;
                _this.isSaveInfo = true;
            },
            getList(isRefresh){
                if(!this.isMore) return;
                var obj = {
                    pageIndex:this.pageIndex,
                    pageSize:this.pageSize,
                    id:this.article
                }
                API.getCommentList(obj).then(res=>{
                    isRefresh ? (this.commentList = res.data) : (this.commentList = this.commentList.concat(res.data));
                    if(res.data.length < this.pageSize){
                        this.isMore = false;
                        return;
                    }
                    this.pageIndex++;
                    this.isMore = true;
                });
            },
            likeClick(isLike, item){
                if(!!$$.getCookie(item._id+'__setLikeComment__')){
                    return this.setToast('你已投票，明天再来吧');
                };
                var obj = {
                    id:item._id,
                    isLike:isLike
                }
                API.setCommentLike(obj).then(res=>{
                    !isLike && (item.likeNum --);
                    !!isLike && (item.likeNum ++);
                    $$.setCookie(item._id+'__setLikeComment__', true, 1);
                });
            },
            replyClick(item){
                // this.content = '@'+item.createLog.createName+': ';
                this.reply = item;
                setTimeout(()=>{
                    var replyName = document.getElementById('reply-name');
                    this.replyOffsetWidth = replyName.offsetWidth-10;
                });
            },
            backSpace(){
                if(this.content.replace(/^\s+|\s+$/,'').length == 0){
                    this.backSpaceTimes++;
                }else{
                    this.backSpaceTimes = 0;
                }
                if(this.backSpaceTimes >=3){
                    this.reply = null;
                    this.backSpaceTimes = 0;
                    this.replyOffsetWidth = 0;
                }
            }
        },
        created(){
            this.name = window.localStorage['__postName__'] || '';
            this.email = window.localStorage['__email__'] || '';
            this.isSaveInfo = window.localStorage['__isSaveInfo__'] || false;
            this.refreshList();
        },
        mounted(){
            this.name = window.localStorage['__postName__'] || '';
            this.email = window.localStorage['__email__'] || '';
            this.isSaveInfo = window.localStorage['__isSaveInfo__'] || false;
        }   
    }
</script>