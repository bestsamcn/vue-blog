<style src="@/assets/css/admin/message/index.css"></style>
<template>
	<div class="admin-message">
		<div class="info color-blue">
			<div class="block">昵称：<span>{{message.name}}</span></div>
			<div class="block">邮箱：<span>{{message.email}}</span></div>
			<div class="block">时间：<span>{{message.postTime}}</span></div>
		</div>
		<p class="margin-top-20 message-content">{{message.content}}</p>
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
				if(this.$route.name !== 'AdminMessageDetail') return;
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