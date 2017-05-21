<style src="../../assets/css/message/index.css"></style>
<template>
	<div class="message">
		<h2 class="color-black">CONTACT</h2>
		<div class="msg-form">
			<h4 class="color-black">Name</h4>
			<input type="text" v-model="form.name"></input>
			<h4 class="color-black">Email</h4>
			<input type="text" v-model="form.email"></input>
			<h4 class="color-black">Message</h4>
			<textarea type="textarea" resize="false" v-model="form.content"></textarea>
			<button class="button con-share-alt" type="info" @click="postMessage()">发送</button>
		</div>
	</div>
</template>
<script>
	import { mapActions } from 'vuex';
	import xss from 'xss';
	import * as API from '@/api/index.js';
	export default{
		name:'message',
		data(){
			return{
				form:{
					name:'',
					email:'',
					content:''
				}
			}
		},
		components:{
			
		},
		methods:{
			...mapActions([
				'setToast'
			]),
			postMessage(){
				if(!this.form.name){
					return this.setToast('昵称不能为空');
				}
				if(!this.form.email){
					return this.setToast('邮箱不能为空');
				}
				if(!this.form.content){
					return this.setToast('留言不能为空');
				}
				this.form.content = xss(this.form.content);
				API.addMessage(this.form).then(res=>{
					this.form.name = '';
					this.form.email = '';
					this.form.content = '';
				});
			}
		}
	}
</script>