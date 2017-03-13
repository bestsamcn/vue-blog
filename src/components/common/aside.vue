<style src="../../assets/css/common/aside.css"></style>
<template>
    <div class="aside" v-show="isAside">
        <router-link :to="{name:'Home'}">首页</router-link>
        <router-link :to="{name:'Article'}">文章</router-link>
        <router-link :to="{name:'About'}">关于</router-link>
    </div>
</template>
<script>
    export default{
        name:'aside',
        props:{
            isAside:{
                default:false,
                require:true,
                type:Boolean
            }
        },
        data:()=>{
            return{

            }
        }
    }
</script>