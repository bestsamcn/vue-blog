<style src=""></style>
<template>
	<div class="emoji">
		<span v-for="item in emojiList">
			{{item}}
		</span>
	</div>
</template>
<script>
	import Emoji from '@/assets/emoji/index.js';
	export default{
		name:'emoji',
		id:'emoji',
		data(){
			return{
				emojiList:['\ud83d\ude04', '\ud83d\ude03']
			}
		},
		methods:{
			init(){
				Emoji.emoji(this.$el.firstElementChild)
			}
		},
		create(){
			this.init()
		},
		mounted(){
			this.init()
		}

	}
</script>