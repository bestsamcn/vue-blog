<style src="@/assets/css/admin/article/articleComment.css"></style>
<template>
    <div class="article-commment">
        <div class="margin-bottom-20">
            <Ebutton type="info" size="small" @click="reset()">重置</Ebutton>
            <Einput placeholder="关键字" icon="search" style="width:initial" v-model="keyword" :on-icon-click="searchClick"></Einput>
        </div>
        <Etable border :data="commentList">
            <Etablecolumn prop="createLog.createTime" label="时间">
                <template scope="scope">
                    {{ scope.row.createLog.createTime | dateFormat('yyyy-MM-dd') }}
                </template>
            </Etablecolumn>
            <Etablecolumn prop="article.title" label="文章"></Etablecolumn>
            <Etablecolumn prop="createLog.createName" label="来自"></Etablecolumn>
            <Etablecolumn prop="content" label="内容">
                <template scope="scope">
                    {{ scope.row.content | textEllipsis(50, true)}}
                </template>
            </Etablecolumn>
            <Etablecolumn label="操作">
                <template scope="scope">
                    <Ebutton type="info" @click="goUrl(scope.row.article._id)">查看</Ebutton>
                    <Ebutton type="danger" @click="_delete(scope.row)">删除</Ebutton>
                </template>
            </Etablecolumn>
        </Etable>
        <div class="text-center margin-top-20">
            <Epagination @size-change="handleSizeChange" @current-change="getList" :current-page.sync="pageIndex" :page-size="pageSize" layout="prev, pager, next, jumper" :total="total">
            </Epagination>
        </div>
    </div>
</template>
<script>
    import { Table, TableColumn, Button, Tag, Pagination, Input } from 'element-ui';
    import { mapState } from 'vuex';
    import * as API from '@/api/index.js';
    export default{
        name:'articleComment',
        data(){
            return {
                commentList:[],
                pageIndex:1,
                pageSize:10,
                total:0,
                keyword:''

            }
        },
        components:{
            Etable:Table,
            Etablecolumn:TableColumn,
            Ebutton:Button,
            Etag:Tag,
            Einput:Input,
            Epagination:Pagination
        },
        computed:{
            ...mapState({
            })
        },
        methods:{
            getList(_pageIndex){
                _pageIndex = _pageIndex || this.pageIndex;
                var obj = {
                    pageIndex:_pageIndex,
                    pageSize:this.pageSize,
                    keyword:this.keyword
                }
                API.getCommentList(obj).then(res=>{
                    this.commentList = res.data;
                    this.total = res.total;
                });
            },
            goUrl(_id){
                this.$router.push({name:'ArticleDetail', params:{id:_id}});
            },
            _delete(item){
                API.delComment({id:item._id}).then(res=>{
                    this.commentList.splice(this.commentList.indexOf(item),1);
                });
            },
            searchClick(){
                this.pageIndex = 1;
                this.getList();
            },
            reset(){
                this.pageIndex = 1;
                this.keyword = '';
                this.getList();
            },
            handleSizeChange(){

            }
        },
        created(){
            
        },
        mounted(){
            this.getList();
        }

    }
</script>