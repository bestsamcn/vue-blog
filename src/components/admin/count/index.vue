<style src="@/assets/css/admin/count/index.css"></style>
<template>
	<div class="count">
		<div class="margin-bottom-20">

        <EradioGroup v-model="type" @change="getList()">
            <EradioButton label="3">今天</EradioButton>
            <EradioButton label="1">全部</EradioButton>
            <EradioButton label="2">昨天</EradioButton>
        </EradioGroup>
        <Einput placeholder="关键词" icon="search" style="width:initial" v-model="keyword" :on-icon-click="searchClick"></Einput>
        <Ebutton type="info" size="small" @click="reset()" class="padding-10">重置</Ebutton>
        </div>
        <Etable :data="countList" border>
            <Etablecolumn prop="accessip" label="ip地址"></Etablecolumn>
            <Etablecolumn prop="address" label="地址">
            	<template scope= "scope">
                    <Etag type="success">{{scope.row.address.country}}</Etag>
                    <Etag type="success">{{scope.row.address.province}}</Etag>
                    <Etag type="success">{{scope.row.address.city}}</Etag>
                    <Etag type="success">{{scope.row.address.district}}</Etag>
                </template>
            </Etablecolumn>
            <Etablecolumn prop="createTime" label="时间">
                <template scope="scope">
                    {{ scope.row.createTime | dateFormat('yyyy-MM-dd hh:mm:ss') }}
                </template>
            </Etablecolumn>
            <Etablecolumn prop="apiName" label="地址"></Etablecolumn>
            <Etablecolumn label="操作">
                <template scope="scope">
                    <Ebutton type="danger" size="small" @click="delCount(scope.row)">删除</Ebutton>
                </template>
            </Etablecolumn>
        </Etable>
        <div class="text-center margin-top-20">
            <Epagination @size-change="handleSizeChange"  @current-change="getList" :current-page.sync="pageIndex" :page-size="pageSize" layout="prev, pager, next, jumper" :total="total">
            </Epagination>
        </div>
	</div>
</template>
<script>
	import { Table, TableColumn, Button, Tag, Pagination, RadioGroup, RadioButton, Input } from 'element-ui';
	import * as API from '@/api/index.js';
	export default{
		name:'adminCount',
		data(){
			return{
				pageIndex:1,
				pageSize:5,
				total:0,
				keyword:'',
				type:3,
				countList:[]
			}
		},
		components:{
            Etable:Table,
            Etablecolumn:TableColumn,
            Ebutton:Button,
            Etag:Tag,
            Epagination:Pagination,
            EradioGroup:RadioGroup,
            EradioButton:RadioButton,
            Einput:Input
        },
		methods:{
			getList(_pageIndex){
                _pageIndex = _pageIndex || this.pageIndex;
				var obj = {
					pageIndex:_pageIndex,
					pageSize:this.pageSize,
					type:this.type,
					keyword:this.keyword
				}
				API.getAccessList(obj).then(res=>{
					this.countList = res.data;
					this.total = res.total;
				});
			},
			searchClick(){
				this.pageIndex = 1;
				this.getList();
			},
			delCount(item){
				if(!item._id || item._id.length !== 24) return;
                API.delAccess({id:item._id}).then(res=>{
                    this.countList.splice(this.countList.indexOf(item), 1);
                });
			},
            reset(){
                this.pageIndex=1;
                this.keyword='';
                this.type=3;
                this.getList();
            },
            handleSizeChange(){}
		},
		created(){
			this.getList()
		}
	}
</script>