<style src="@/assets/css/admin/tag/index.css" scoped></style>
<template>
    <div class="admin-tag">
        <div class="margin-top-0"></div>
        <Etable v-if="!!tagList.length" :data="tagList" border style="width:100%;">
            <Etableculume label="标签名" prop="name"></Etableculume>
            <Etableculume label="热度" prop="clickNum"></Etableculume>
            <Etableculume label="操作">
                <template scope="scope" class="text-right">
                    <Ebutton type="info" @click="showEditModal(true, scope.row)">编辑</Ebutton>
                    <Ebutton type="danger" @click="__delTag(scope.row._id)">删除</Ebutton>
                </template>
            </Etableculume>
        </Etable>
        <div class="margin-top-20 text-center">
            <Ebutton type="info" size="large" @click="showDialog(true)">添加</Ebutton>
        </div>
        <Edialog title="添加标签" v-model="isShowDialog" :modal="false">
            <Eform>
                <Eformitem label="标签名">
                    <Einput v-model="form.tagName" autoComplete="off"></Einput>
                </Eformitem>
            </Eform>
            <div class="text-right" slot="footer">
                <Ebutton type="warning" size="large" @click="showDialog(false)">取消</Ebutton>
                <Ebutton type="info" size="large" @click="__addTag()">确定</Ebutton>
            </div>
        </Edialog>
        <Edialog title="编辑标签" v-model="isEditModal" :modal="false">
            <Eform>
                <Eformitem label="标签名">
                    <Einput v-model="form.tag.name" autoComplete="off"></Einput>
                </Eformitem>
            </Eform>
            <div class="text-right" slot="footer">
                <Ebutton type="warning" size="large" @click="showEditModal(false)">取消</Ebutton>
                <Ebutton type="info" size="large" @click="__editTag()">更新</Ebutton>
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
                    tagName:'',
                    tag:{}
               }
            }
        },
        computed:{
            ...mapState({
                tagList:state=>state.admin.tagList
            })
        },
        methods:{
            ...mapActions([
                'delTag',
                'addTag',
                'editTag',
                'setToast',
                'getTagList'
            ]),
            showDialog(b){
                this.isShowDialog = !!b;
            },
            __addTag(){
                var that = this;
                if(!this.form.tagName){
                    this.setToast('标签名不能为空');
                    return;
                }
                this.addTag({name:this.form.tagName}).then((res)=>{
                    this.form.tagName = '';
                    this.isShowDialog = false;
                });
            },
            __delTag(_id){
                MessageBox.confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.delTag(_id)
                }).catch(()=>{});
            },
            showEditModal(isShow, item){
                this.isEditModal = isShow;
                if(isShow) this.form.tag = JSON.parse(JSON.stringify(item));
                if(!isShow) this.form.tag = {};
            },
            __editTag(){
                var that = this;
                if(!that.form.tag) return;
                this.editTag(that.form.tag).then(res=>{
                    this.isEditModal = false;
                });
            }
        },
        created(){
        },
        mounted(){

        }
    }
</script>
