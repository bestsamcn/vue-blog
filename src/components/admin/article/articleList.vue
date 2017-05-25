<style src="@/assets/css/admin/article/articleList.css" scoped></style>
<template>
    <div class="admin-article-list">
        <div class="margin-bottom-10">
            <!-- <EradioGroup v-model="type" @change="searchClick">
                <EradioButton label="0">全部</EradioButton>
                <EradioButton label="1">评论</EradioButton>
                <EradioButton label="2">浏览</EradioButton>
            </EradioGroup> -->
            <Ebutton type="info" size="small" @click="reset()">重置</Ebutton>
            <Einput placeholder="关键字" icon="search" style="width:initial" v-model="keyword" :on-icon-click="searchClick"></Einput>
        </div>
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
            <Etablecolumn prop="tag.name" label="标签" width="100">
            </Etablecolumn>
            <Etablecolumn prop="category.name" label="归类"  width="100">
            </Etablecolumn>
            <Etablecolumn label="操作" >
                <template scope="scope">
                    <Ebutton type="info" size="small" @click="goState('ArticleDetail', scope.row._id)">查看</Ebutton>
                    <Ebutton size="small" @click="goState('AdminEditArticle', scope.row._id)">编辑</Ebutton>
                    <Ebutton type="danger" size="small" @click="delArticle(scope.row)">删除</Ebutton>
                  </template>
            </Etablecolumn>
        </Etable>
        <div class="text-center margin-top-20">
            <Epagination @size-change="handleSizeChange" @current-change="getArticleList" :current-page.sync="pageIndex" :page-size="pageSize" layout="prev, pager, next, jumper" :total="total">
            </Epagination>
        </div>
    </div>
</template>
<script>
    import { Table, Select, Option, TableColumn, Button, Tag, RadioGroup, RadioButton, Pagination, Input, MessageBox } from 'element-ui';
    import * as API from '@/api/index.js';
    import Tags from '@/components/home/tags.vue';
    import { mapState, mapActions } from 'vuex';
    export default{
        name:'adminArticleList',
        data(){
            return{
                articleList:[],
                operateWidth:0,
                pageIndex:1,
                pageSize:5,
                isMore:true,
                total:0,
                keyword:'',
                type:0,
                tag:'',
                category:''
            }
        },
        components:{
            Etable:Table,
            Eselect:Select,
            Etablecolumn:TableColumn,
            Ebutton:Button,
            Etag:Tag,
            Eoption:Option,
            EradioGroup:RadioGroup,
            EradioButton:RadioButton,
            Epagination:Pagination,
            Einput:Input,
            Tags:Tags
        },
        computed:{
            ...mapState({
                isAddArticle:state=>state.admin.isAddArticle,
                tagList:state=>state.admin.tagList,
                categoryList:state=>state.admin.categoryList
            })
        },
        watch:{
            '$route':'refresh'
        },
        methods:{
            ...mapActions([
                'setArticleState'
            ]),
            getArticleList(_pageIndex){
                _pageIndex = _pageIndex || this.pageIndex;
                var that = this;
                var obj = {
                    pageIndex:_pageIndex,
                    pageSize:this.pageSize,
                    keyword:this.keyword
                }
                API.getArticleList(obj).then(res=>{
                    this.articleList = res.data;
                    this.total = res.total;
                });
            },
            delArticle(item){
                if(!item._id || item._id.length !== 24) return;
                MessageBox.confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    API.delArticle({id:item._id}).then(res=>{
                        this.articleList.splice(this.articleList.indexOf(item), 1);
                    })
                }).catch(()=>{});
            },
            goState(name, _id){
                if(!_id) return;
                this.$router.push({name:name, params:{id:_id}});
            },
            searchClick(){
                this.pageIndex = 1;
                this.getArticleList();
            },
            handleSizeChange(){

            },
            reset(){
                this.pageIndex = 1;
                this.keyword = '';
                this.getArticleList();
                this.setArticleState(false);
            },
            refresh(){
                if(this.isAddArticle){
                    this.pageIndex = 1;
                    this.keyword = '';
                    this.getArticleList();
                    this.setArticleState(false);
                }
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
            });
        },
        mounted(){
            this.getArticleList();
        }
    }
</script>