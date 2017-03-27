<style src="@/assets/css/admin/category/index.css" scoped></style>
<template>
    <div class="admin-category">
        <Etable border :data="cateList" border>
            <Etableculume label="类名" prop="label"></Etableculume>
            <Etableculume label="值" prop="value"></Etableculume>
            <Etableculume label="操作" fixed="right">
                <template scope="scope">
                    <Ebutton type="info">编辑</Ebutton>
                    <Ebutton type="danger">删除</Ebutton>
                </template>
            </Etableculume>
        </Etable>
        <div class="margin-top-20 text-center">
            <Ebutton type="info" size="large" @click="showDialog(true)">添加</Ebutton>
        </div>
        <Edialog title="添加分类" v-model="isShowDialog" :modal="false">
            <Eform>
                <Eformitem label="类名">
                    <Einput :v-model="form.cateName" autoComplete="off"></Einput>
                </Eformitem>
            </Eform>
            <div class="text-right" slot="footer">
                <Ebutton type="warning" size="large" @click="showDialog(false)">取消</Ebutton>
                <Ebutton type="info" size="large">确定</Ebutton>
            </div>
        </Edialog>
    </div>
</template>
<script>
    import { Table, TableColumn, Button, Dialog, Form, FormItem, Input, Tag } from 'element-ui';
    import { mapState } from 'vuex';
    export default{
        name:'adminCategory',
        components:{
            Etable:Table,
            Etableculume:TableColumn,
            Ebutton:Button,
            Edialog:Dialog,
            Eform:Form,
            Eformitem:FormItem,
            Einput:Input
        },
        data(){
            return{
                form:{
                    cateName:''
                },
                isShowDialog:false
            }
        },
        computed:{
            ...mapState({
                cateList:state=>state.admin.categoryList
            })
        },
        methods:{
            showDialog(b){
                this.isShowDialog = !!b;
            },
            addTag(){

            }
        }
    }
</script>