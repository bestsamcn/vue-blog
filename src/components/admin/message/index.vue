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
            <Etablecolumn label="操作" fixed="right">
                <template scope="scope">
                    <Ebutton type="info" size="small" @click="getDetail(scope.row._id)">查看</Ebutton>
                    <Ebutton type="danger" size="small" @click="delMessage(scope.row._id)">删除</Ebutton>
                </template>
            </Etablecolumn>
        </Etable>
    </div>
</template>
<script>
    import { Table, TableColumn, Button, Tag } from 'element-ui';
    import { mapState } from 'vuex';
    import * as API from '@/api/index.js';
    export default{
        name:'adminMessage',
        data(){
            return{
                params:{
                    pageIndex:1,
                    pageSize:10,
                },
                total:0,
                messageList:[]
            }
        },
        components:{
            Etable:Table,
            Etablecolumn:TableColumn,
            Ebutton:Button,
            Etag:Tag
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
            getDetail(_id){
                this.$router.push({name:'AdminMessageDetail', params:{id:_id}})
            }
        },
        mounted(){
            var that = this;
            API.getMessageList(that.params).then(res=>{
                console.log(res)
                that.messageList = res.data;
                that.total = res.total;
            })
        }

    }
</script>