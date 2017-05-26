<style src="@/assets/css/admin/tag/index.css" scoped></style>
<template>
    <div class="admin-tag">
        <div class="margin-top-0"></div>
        <Etable v-if="!!hotWordList.length" :data="hotWordList" border style="width:100%;">
            <Etableculume label="热词名" prop="name"></Etableculume>
            <Etableculume label="值" prop="hotCount"></Etableculume>
            <Etableculume label="时间" prop="createTime">
            	<template scope="scope">
            		{{ scope.row.createTime | dateFormat('yy-MM-dd hh:mm:ss')}}
            	</template>
            </Etableculume>
            <Etableculume label="操作">
                <template scope="scope" class="text-right">
                    <Ebutton type="info" @click="showEditModal(true, scope.row)">编辑</Ebutton>
                    <Ebutton type="danger" @click="__delHotWord(scope.row._id)">删除</Ebutton>
                </template>
            </Etableculume>
        </Etable>
        <div class="margin-top-20 text-center">
            <Ebutton type="info" size="large" @click="showDialog(true)">添加</Ebutton>
        </div>
        <Edialog title="添加热词" v-model="isShowDialog" :modal="false">
            <Eform>
                <Eformitem label="热词名">
                    <Einput v-model="form.hotWordName" autoComplete="off"></Einput>
                </Eformitem>
            </Eform>
            <div class="text-right" slot="footer">
                <Ebutton type="warning" size="large" @click="showDialog(false)">取消</Ebutton>
                <Ebutton type="info" size="large" @click="__addHotWord()">确定</Ebutton>
            </div>
        </Edialog>
        <Edialog title="编辑热词" v-model="isEditModal" :modal="false">
            <Eform>
                <Eformitem label="热词名">
                    <Einput v-model="form.hotWord.name" autoComplete="off"></Einput>
                </Eformitem>
            </Eform>
            <div class="text-right" slot="footer">
                <Ebutton type="warning" size="large" @click="showEditModal(false)">取消</Ebutton>
                <Ebutton type="info" size="large" @click="__editHotWord()">更新</Ebutton>
            </div>
        </Edialog>
    </div>
</template>
<script>
    import { Table, TableColumn, Button, Dialog, Form, FormItem, Input, Tag, MessageBox } from 'element-ui';
    import { mapState, mapActions } from 'vuex';
    export default{
        name:'adminHotWord',
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
                    hotWordName:'',
                    hotWord:{}
               }
            }
        },
        computed:{
            ...mapState({
                hotWordList:state=>state.common.hotWordList
            })
        },
        methods:{
            ...mapActions([
                'delHotWord',
                'addHotWord',
                'editHotWord',
                'setToast',
                'getHotWordList'
            ]),
            showDialog(b){
                this.isShowDialog = !!b;
            },
            __addHotWord(){
                var that = this;
                if(!this.form.hotWordName){
                    this.setToast('热词名不能为空');
                    return;
                }
                this.addHotWord({name:this.form.hotWordName}).then((res)=>{
                    this.form.hotWordName = '';
                    this.isShowDialog = false;
                });
            },
            __delHotWord(_id){
                MessageBox.confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.delHotWord(_id)
                }).catch(()=>{});
            },
            showEditModal(isShow, item){
                this.isEditModal = isShow;
                if(isShow) this.form.hotWord = JSON.parse(JSON.stringify(item));
                if(!isShow) this.form.hotWord = {};
            },
            __editHotWord(){
                var that = this;
                if(!that.form.hotWord) return;
                this.editHotWord(that.form.hotWord).then(res=>{
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