<style src="../../assets/css/article/index.css" scoped></style>
<template>
    <div class="article">
        <router-link :to="{name:'Home'}">Home</router-link>
        <router-link :to="{name:'ArticleDetail'}">ArticleDetail</router-link>
         {{msg}}
         <a @click="saythis()">非法所得</a>
    </div>
</template>
<script>
    export default{
        name:'home',
        data:()=>{
		    return{
		        msg:'asdfasdf'
		    }
		},
		methods:{
		    saythis(){
		        console.log(this.msg)
		    }
		}
    }


</script>