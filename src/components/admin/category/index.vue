<style src="@/assets/css/admin/tag/index.css" scoped></style>
<template>
    <div class="admin-tag">
        <div class="margin-top-0"></div>
        <Etable v-if="!!categoryList.length" :data="categoryList" border>
            <Etableculume label="分类名" prop="name"></Etableculume>
            <Etableculume label="热度" prop="clickNum"></Etableculume>
            <Etableculume label="操作">
                <template scope="scope" class="text-right">
                    <Ebutton type="info" @click="showEditModal(true, scope.row)">编辑</Ebutton>
                    <Ebutton type="danger" @click="__delCategory(scope.row._id)">删除</Ebutton>
                </template>
            </Etableculume>
        </Etable>
        <div class="margin-top-20 text-center">
            <Ebutton type="info" size="large" @click="showDialog(true)">添加</Ebutton>
        </div>
        <Edialog title="添加分类" v-model="isShowDialog" :modal="false">
            <Eform>
                <Eformitem label="分类名">
                    <Einput v-model="form.categoryName" autoComplete="off"></Einput>
                </Eformitem>
            </Eform>
            <div class="text-right" slot="footer">
                <Ebutton type="warning" size="large" @click="showDialog(false)">取消</Ebutton>
                <Ebutton type="info" size="large" @click="__addCategory()">确定</Ebutton>
            </div>
        </Edialog>
        <Edialog title="编辑分类" v-model="isEditModal" :modal="false">
            <Eform>
                <Eformitem label="分类名">
                    <Einput v-model="form.category.name" autoComplete="off"></Einput>
                </Eformitem>
            </Eform>
            <div class="text-right" slot="footer">
                <Ebutton type="warning" size="large" @click="showEditModal(false)">取消</Ebutton>
                <Ebutton type="info" size="large" @click="__editCategory()">更新</Ebutton>
            </div>
        </Edialog>
    </div>
</template>
<script>
    import { Table, TableColumn, Button, Dialog, Form, FormItem, Input, Tag, MessageBox } from 'element-ui';
    import { mapState, mapActions } from 'vuex';
    export default{
        name:'adminTag',
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
               isShowDialog:false,
               isEditModal:false,
               form:{
                    categoryName:'',
                    category:{}
               }
            }
        },
        computed:{
            ...mapState({
                categoryList:state=>state.admin.categoryList
            })
        },
        methods:{
            ...mapActions([
                'delCategory',
                'addCategory',
                'editCategory',
                'setToast'
            ]),
            showDialog(b){
                this.isShowDialog = !!b;
            },
            __delCategory(_id){
                MessageBox.confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.delCategory(_id)
                }).catch(()=>{});
            },
            __addCategory(){
                var that = this;
                if(!this.form.categoryName){
                    this.setToast('分类名不能为空');
                    return;
                }
                this.addCategory({name:this.form.categoryName}).then((res)=>{
                    this.form.categoryName = '';
                    this.isShowDialog = false;
                });
            },
            showEditModal(isShow, item){
                this.isEditModal = isShow;
                if(isShow) this.form.category = JSON.parse(JSON.stringify(item));
                if(!isShow) this.form.category = {};
            },
            __editCategory(){
                var that = this;
                if(!that.form.category) return;
                this.editCategory(that.form.category).then(res=>{
                    this.isEditModal = false;
                });
            }
        },
        created(){

        }
    }
</script>
