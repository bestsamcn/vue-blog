<style src="../../assets/css/article/index.css" scoped></style>
<template>
    <div class="article">
        <div class="main">
            <Articlelist :article-list="[1,2,3,4,5,6]" :is-more="true"></Articlelist>
        </div>
    </div>
</template>
<script>
    import Articlelist from './articleList.vue';
    export default{
        name:'home',
        data:()=>{
		    return{
		        msg:'asdfasdf'
		    }
		},
        components:{
            Articlelist
        },
		methods:{
		    saythis(){
		        console.log(this.msg)
		    }
		}
    }


</script>