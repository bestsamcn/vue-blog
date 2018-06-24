<style src="../../assets/css/common/notify.css" scoped></style>
<template>
	<div v-if="!!notify" class="notify">
		<p>
			<i class="icon-bullhorn"></i>
			{{notify.content}}
			<a @click="()=>close(notify._id)"><i class="icon-remove"></i></a>
		</p>
	</div>
</template>
<script>
	import { mapState, mapMutations } from 'vuex';
	import $$ from '@/utils/index.js';
	export default{
		name:'notify',
		data(){
			return{
				message:'',
				isVisible:false
			}
		},
		computed:{
            ...mapState({
                notify:state=>state.common.notify
            })
        },
		methods:{
			...mapMutations([
				'removeNotify'
			]),
			close(_id){
				$$.setCookie(_id, 1, 10);
				this.removeNotify();
			}
		}
	}
</script>