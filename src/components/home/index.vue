<style src="../../assets/css/home/index.css" scoped></style>
<template>
    <div class="home">
        <div class="main">
            <div class="wrapper">
                <div class="left-cont">
                    <Articlelist :article-list="[1,2,3,4]"></Articlelist>
                </div>
                <div class="right-bar sm-hide">
                    <Category></Category>
                    <Articlerank></Articlerank>
                    <Tags></Tags>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import Articlelist from '../article/articleList.vue';
    import Category from './Category.vue';
    import Articlerank from './articleRank.vue';
    import Tags from './tags.vue';
    export default{
        name:'home',
        data:()=>{
            return{
            }
        },
        components:{
            Articlelist,
            Category,
            Articlerank,
            Tags
        }
    }

</script>