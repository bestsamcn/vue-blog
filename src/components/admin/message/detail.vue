<style src=""></style>
<template>
	<div class="admin-message">
		<div class="info color-blue">
			<span>昵称：{{message.name}}</span>
			<span>邮箱：{{message.email}}</span>
			<span>时间：{{message.postTime}}</span>
		</div>
		<p class="margin-top-20">{{message.content}}</p>
	</div>
</template>
<script>
	import * as API from '@/api/index.js';
	export default{
		name:'adminMessageDetail',
		data(){
			return{
				message:{}
			}
		},
		created(){
			this.getDetail();
		},
		methods:{
			getDetail(){
				var that = this;
				API.getMessageDetail({id:that.$route.params.id}).then(res=>{
					that.message = res.data;
				});
			}
		},
		watch:{
			'$route':'getDetail'
		}
	}
</script>