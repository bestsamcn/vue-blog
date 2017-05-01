<style src="../../assets/css/message/index.css"></style>
<template>
	<div class="message">
		<h2>CONTACT</h2>
		<div class="msg-form">
			<h4>Your Name</h4>
			<Einput type="text" v-model="form.name"></Einput>
			<h4>Your Email</h4>
			<Einput type="text" v-model="form.email"></Einput>
			<h4>Your Message</h4>
			<Einput type="textarea" resize="false" v-model="form.content"></Einput>
			<Ebutton class="button" type="info" @click="postMessage()">send</Ebutton>
		</div>
	</div>
</template>
<script>
	import { Input, Button } from 'element-ui';
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
			Einput:Input,
			Ebutton:Button
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