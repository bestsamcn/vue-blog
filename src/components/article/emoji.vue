<style src="@/assets/css/article/emoji.css"></style>
<template>
	<div class="emoji">
		<a class="javascript:;" @click="selectFace(item)" v-for="item in emojiList">
			<img :src="`${FACE_URL}/${item}.png`">
		</a>
	</div>
</template>
<script>
	import { FACE_URL } from '@/api/config.js';
	export default{
		name:'emoji',
		data(){
			return{
				emojiList:[],
				FACE_URL:FACE_URL
			}
		},
		methods:{
			init(){
				for(var i=1; i<=48; i++){
					this.emojiList.push(i);
				}
			},
            selectFace(item){
                this.$emit('onFaceClick', item);
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
