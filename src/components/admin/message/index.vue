<style src="@/assets/css/admin/message/index.css" scoped></style>
<template>
    <div class="admin-message">
        <Etable :data="msgList" border>
            <Etablecolumn prop="id" label="id"></Etablecolumn>
            <Etablecolumn prop="name" label="姓名"></Etablecolumn>
            <Etablecolumn prop="email" label="邮箱"></Etablecolumn>
            <Etablecolumn prop="date" label="时间">
                <template scope="scope">
                    {{ scope.row.date | dateFormat('yyyy-MM-dd hh:mm:ss') }}
                </template>
            </Etablecolumn>
            <Etablecolumn prop="text" label="信息"></Etablecolumn>
            <Etablecolumn label="操作" fixed="right">
                <template scope="scope">
                    <Ebutton type="info" size="small">查看</Ebutton>
                    <Ebutton type="danger" size="small">删除</Ebutton>
                </template>
            </Etablecolumn>
        </Etable>
    </div>
</template>
<script>
    import { Table, TableColumn, Button, Tag } from 'element-ui';
    import { mapState } from 'vuex';
    export default{
        name:'adminMessage',
        components:{
            Etable:Table,
            Etablecolumn:TableColumn,
            Ebutton:Button,
            Etag:Tag
        },
        computed:{
            ...mapState({
                msgList:state=>state.admin.messageList
            })
            
        }

    }
</script>