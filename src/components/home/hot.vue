<style src="@/assets/css/search/hot.css" scoped></style>
<template>
    <div class="hots">
        <slot name="title"></slot>
        <div class="cont">
            <div class="wrapper">
                <a class="hot-item" v-for="item in hotWordList" @click="hotClick(item.name)">
                    {{item.name}}
                </a>
            </div>
        </div>
    </div>
</template>
<script>
    import { mapState, mapActions } from 'vuex';
    export default{
        name:'hot',
        data(){
            return{}
        },
        computed:{
            ...mapState({
                hotWordList:state=>state.common.hotWordList
            })
        },
        methods:{
        	...mapActions([
        		'setHotWord'
        	]),
            hotClick(name){
            	var obj = {
            		isFromHotWord:true,
            		name:name
            	}
            	this.setHotWord(obj).then(()=>{
            		this.$router.push({name:'Search'})
            	});
            	
            }
        }
    }
</script>