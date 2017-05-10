<style src="@/assets/css/admin/message/index.css" scoped></style>
<template>
    <div class="admin-message">
        <Etable :data="messageList" border>
            <Etablecolumn prop="name" label="姓名"></Etablecolumn>
            <Etablecolumn prop="email" label="邮箱"></Etablecolumn>
            <Etablecolumn prop="date" label="时间">
                <template scope="scope">
                    {{ scope.row.postTime | dateFormat('yyyy-MM-dd hh:mm:ss') }}
                </template>
            </Etablecolumn>
            <Etablecolumn prop="content" label="信息"></Etablecolumn>
            <Etablecolumn prop="isRead" label="已读">
                <template scope= "scope">
                    <Etag :type="scope.row.isRead ? 'success' :'gray'">{{scope.row.isRead ? '是' : '否'}}</Etag>
                </template>
            </Etablecolumn>
            <Etablecolumn label="操作" fixed="right">
                <template scope="scope">
                    <Ebutton type="info" size="small" @click="getDetail(scope.row)">查看</Ebutton>
                    <Ebutton type="danger" size="small" @click="delMessage(scope.row._id)">删除</Ebutton>
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
    import { Table, TableColumn, Button, Tag, Pagination } from 'element-ui';
    import { mapState } from 'vuex';
    import * as API from '@/api/index.js';
    export default{
        name:'adminMessage',
        data(){
            return{
                pageIndex:1,
                pageSize:10,
                total:0,
                messageList:[]
            }
        },
        components:{
            Etable:Table,
            Etablecolumn:TableColumn,
            Ebutton:Button,
            Etag:Tag,
            Epagination:Pagination
        },
        computed:{
            ...mapState({
            })
        },
        methods:{
            delMessage(_id){
                var that = this;
                API.delMessage({id:_id}).then(res=>{
                    for(var i=0; i< that.messageList.length; i++){
                        if(that.messageList[i]._id == _id){
                            that.messageList.splice(i, 1);
                            break;
                        }
                    }
                });  
            },
            getDetail(item){
                item.isRead = true;
                this.$router.push({name:'AdminMessageDetail', params:{id:item._id}})
            },
            getList(_pageIndex){
                _pageIndex = _pageIndex || this.pageIndex;
                var obj = {
                    pageIndex:_pageIndex,
                    pageSize:this.pageSize
                }
                API.getMessageList(obj).then(res=>{
                    this.messageList = res.data;
                    this.total = res.total;
                });
            },
            handleSizeChange(){}
        },
        mounted(){
            // this.getList();
        },
        created(){
            this.getList();
        }

    }
</script>