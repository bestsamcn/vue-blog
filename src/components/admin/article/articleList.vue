<style src="@/assets/css/admin/article/articleList.css" scoped></style>
<template>
    <div class="admin-article-list">
        <Etable :data="articleList" border style="width:100%;">
            <Etablecolumn prop="createTime" label="日期">
                <template scope="scope">
                    {{ scope.row.createTime | dateFormat('yyyy-MM-dd') }}
                </template>
            </Etablecolumn>
            <Etablecolumn prop="title" label="标题">
                <template scope="scope">
                    {{scope.row.title | textEllipsis(30,true)}}
                </template>
            </Etablecolumn>
            <Etablecolumn prop="creator" label="作者" width="80">
                <template scope="scope">
                    {{scope.row.creator || 'Best'}} 
                </template>
            </Etablecolumn>
            <Etablecolumn prop="previewText" label="摘要">
                <template scope="scope">
                    {{scope.row.previewText | textEllipsis(30,true)}}
                </template>
            </Etablecolumn>
            <Etablecolumn prop="tag" label="标签" width="250">
                <template scope="scope">
                    <Etag v-for="item in scope.row.tag" :key="item._id" class="margin-0-5">{{ item.name }}</Etag>
                </template>
            </Etablecolumn>
            <Etablecolumn prop="category" label="归类"  width="180">
                <template scope="scope">
                    <Etag v-for="item in scope.row.category" :key="item._id" class="margin-0-5">{{ item.name }}</Etag>
                </template>
            </Etablecolumn>
            <Etablecolumn fixed="right" label="操作" >
                <template scope="scope">
                    <Ebutton type="info" size="small">查看</Ebutton>
                    <Ebutton size="small">编辑</Ebutton>
                    <Ebutton type="danger" size="small">删除</Ebutton>
                  </template>
            </Etablecolumn>
        </Etable>
    </div>
</template>
<script>
    import { Table, TableColumn, Button, Tag } from 'element-ui';
    import * as API from '@/api/index.js';
    export default{
        name:'adminArticleList',
        data(){
            return{
                articleList:[],
                operateWidth:0,
                pageIndex:1,
                pageSize:10,
                isMore:true,
                total:0,
                keyword:''
            }
        },
        components:{
            Etable:Table,
            Etablecolumn:TableColumn,
            Ebutton:Button,
            Etag:Tag
        },
        methods:{
            getArticleList(){
                var that = this;
                if(!this.isMore) return;
                var obj = {
                    pageIndex:this.pageIndex,
                    pageSize:this.pageSize,
                    keyword:this.keyword
                }
                API.getArticleList(obj).then(res=>{
                    this.articleList = res.data;
                    if(res.data.length < this.pageSize){
                        this.isMore = false;
                    }
                });
            }
        },
        created(){
            let type = "orientationchange" in window ? "orientationchange" : "resize";
            window.addEventListener(type, ()=>{
                let width = document.documentElement.clientWidth;
                if(width < 500){
                    this.operateWidth = 100;
                }else{
                    this.operateWidth = 220;
                }
            })
        },
        mounted(){
            this.keyword='居中'
            this.getArticleList();
        }
    }
</script>