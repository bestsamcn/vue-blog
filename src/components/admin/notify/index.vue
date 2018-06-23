<style src="@/assets/css/admin/tag/index.css" scoped></style>
<template>
    <div class="admin-tag">
        <div class="margin-bottom-20">
            <Ebutton type="info" class="rbtn" size="small" @click="reset()">重置</Ebutton>
            <EradioGroup v-model="isActive" @change="getNotifyList()">
                <EradioButton :label="false">非激活</EradioButton>
                <EradioButton :label="true">激活</EradioButton>
                <EradioButton label="all">全部</EradioButton>
            </EradioGroup>
            <Einput placeholder="关键字" icon="search" style="width:initial" v-model="keyword" :on-icon-click="getNotifyList.bind(this, 1)"></Einput>
            <Ebutton type="info" size="large" @click="showDialog(true)">添加</Ebutton>
        </div>
        <Etable v-if="!!notifyList.length" :data="notifyList" border style="width:100%;">
            <Etableculume label="通告内容" prop="content"></Etableculume>
            <Etableculume label="是否激活" prop="isActive">
                <template scope= "scope">
                    <Etag :type="scope.row.isActive ? 'success' : ''">{{scope.row.isActive ? '是' : '否'}}</Etag>
                </template>
            </Etableculume>
            <Etableculume label="创建时间" prop="createTime">
            	<template scope="scope">
            		{{ scope.row.createTime | dateFormat('yy-MM-dd hh:mm:ss')}}
            	</template>
            </Etableculume>
            <Etableculume label="超时时间" prop="expireTime">
                <template scope="scope">
                    {{ scope.row.expireTime | dateFormat('yy-MM-dd hh:mm:ss')}}
                </template>
            </Etableculume>
            <Etableculume label="操作">
                <template scope="scope" class="text-right">
                    <Ebutton type="info" @click="showEditModal(true, scope.row)">编辑</Ebutton>
                    <Ebutton type="danger" @click="__delNotify(scope.row)">删除</Ebutton>
                </template>
            </Etableculume>
        </Etable>
        <div class="text-center margin-top-20">
            <Epagination @size-change="handleSizeChange" @current-change="getNotifyList" :current-page.sync="pageIndex" :page-size="pageSize" layout="prev, pager, next, jumper" :total="total">
            </Epagination>
        </div>
        <Edialog title="添加通告" v-model="isShowDialog" :modal="false" top="20%">
            <Eform>
                <Eformitem label="通告内容">
                    <Einput v-model="form.content" type="textarea" placeholder="通告内容" autoComplete="off"></Einput>
                </Eformitem>
                <Eformitem label="超时设置">
                    <Edatepicker v-model="form.expireTime" placeholder="超时设置" type="datetime" autoComplete="off"></Edatepicker>
                </Eformitem>
                <Eformitem label="是否激活">
                    <Echeckbox v-model="form.isActive" autoComplete="off"></Echeckbox>
                </Eformitem>
            </Eform>
            <div class="text-right" slot="footer">
                <Ebutton type="warning" size="large" @click="showDialog(false)">取消</Ebutton>
                <Ebutton type="info" size="large" @click="__addNotify()">确定</Ebutton>
            </div>
        </Edialog>
        <Edialog title="编辑通告" v-model="isEditModal" :modal="false" top="20%">
            <Eform>
                <Eformitem label="通告内容">
                    <Einput v-model="form.content" type="textarea" placeholder="通告内容" autoComplete="off"></Einput>
                </Eformitem>
                <Eformitem label="超时设置">
                    <Edatepicker v-model="form.expireTime" placeholder="超时设置" type="datetime" autoComplete="off"></Edatepicker>
                </Eformitem>
                <Eformitem label="是否激活">
                    <Echeckbox v-model="form.isActive" autoComplete="off"></Echeckbox>
                </Eformitem>
            </Eform>
            <div class="text-right" slot="footer">
                <Ebutton type="warning" size="large" @click="showEditModal(false)">取消</Ebutton>
                <Ebutton type="info" size="large" @click="__editNotify()">更新</Ebutton>
            </div>
        </Edialog>
    </div>
</template>
<script>
    import { Table, TableColumn, Button, Dialog, Form, FormItem, Input, Tag, MessageBox, DatePicker, Checkbox, Pagination, RadioGroup, RadioButton } from 'element-ui';
    import { mapState, mapActions } from 'vuex';
    import * as API from '@/api/index.js';
    export default{
        name:'adminNotify',
        components:{
            Etable:Table,
            Etableculume:TableColumn,
            Ebutton:Button,
            Edialog:Dialog,
            Eform:Form,
            Eformitem:FormItem,
            Einput:Input,
            Echeckbox:Checkbox,
            Epagination:Pagination,
            Edatepicker:DatePicker,
            Etag:Tag,
            EradioGroup:RadioGroup,
            EradioButton:RadioButton
        },
        data(){
            return{
               isShowDialog:false,
               isEditModal:false,
               notifyList:[],
               total:0,
               pageIndex:1,
               pageSize:5,
               isActive:'all',
               keyword:'',
               form:{
                    content:'',
                    expireTime:'',
                    id:'',
                    isActive:false
               }
            }
        },
        computed:{
            ...mapState({
            })
        },
        methods:{
            ...mapActions([
                'setToast'
            ]),
            showDialog(b){
                this.isShowDialog = !!b;
            },
            __addNotify(){
                var that = this;
                if(!this.form.content){
                    this.setToast('通告内容不能为空');
                    return;
                }
                if(!this.form.expireTime){
                    this.setToast('请选择超时时间');
                    return;
                }
                API.addNotify({...this.form, expireTime:new Date(this.form.expireTime).getTime()}).then((res)=>{
                    this.form.content = '';
                    this.form.expireTime = '';
                    this.form.isActive = false;
                    this.isShowDialog = false;
                    this.notifyList.unshift(res.data);
                });
            },
            __delNotify(item){
                MessageBox.confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    API.delNotify({id:item._id}).then(res=>{
                        this.notifyList.splice(this.notifyList.indexOf(item), 1);
                    })
                }).catch(()=>{});
            },
            showEditModal(isShow, item){
                this.isEditModal = isShow;
                if(isShow) {
                    let _item = JSON.parse(JSON.stringify(item));
                    this.form.content = _item.content;
                    this.form.expireTime = _item.expireTime;
                    this.form.isActive = _item.isActive;
                    this.form.id = _item._id;
                }
                if(!isShow) this.form.hotWord = {};
            },
            handleSizeChange(){

            },
            getNotifyList(_pageIndex){
                _pageIndex = _pageIndex || this.pageIndex;
                var that = this;
                var obj = {
                    pageIndex:_pageIndex,
                    pageSize:this.pageSize,
                    keyword:this.keyword
                }
                if(this.isActive != 'all') obj.isActive = this.isActive;
                API.getNotifyList(obj).then(res=>{
                    this.notifyList = res.data;
                    this.total = res.total;
                });
            },
            reset(){
                this.pageIndex = 1;
                this.keyword = '';
                this.isActive = 'all';
                this.getNotifyList();
            },
            __editNotify(){
                var that = this;
                if(!this.form.id){
                    this.setToast('无此记录');
                    return;
                }
                if(!this.form.content){
                    this.setToast('通告内容不能为空');
                    return;
                }
                if(!this.form.expireTime){
                    this.setToast('请选择超时时间');
                    return;
                }
                API.editNotify({...this.form, expireTime:new Date(this.form.expireTime).getTime()}).then(res=>{
                    let _index = -1;
                    this.notifyList.map((item, index)=>{
                        if(item._id == this.form.id) _index = index;
                        
                    });
                    if(_index != -1){
                        let obj = this.notifyList[_index];
                        obj.content = this.form.content;
                        obj.isActive = this.form.isActive;
                        obj.expireTime = this.form.expireTime;
                        this.notifyList.splice(_index, 1, obj);
                    } 
                    this.isEditModal = false;
                });
            }
        },
        created(){

        },
        mounted(){
            this.getNotifyList();
        }
    }
</script>