<style src="../../assets/css/home/index.css" scoped></style>
<template>
    <div class="home">
        <div class="main">
            <div class="left-cont">
                <Articlelist></Articlelist>
            </div>
            <div class="right-bar sm-hide">
        </div>
        </div>
        
    </div>
</template>
<script>
    import Articlelist from '../article/articleList.vue';
    export default{
        name:'home',
        data:()=>{
            return{
            }
        },
        components:{
            Articlelist
        }
    }

</script>