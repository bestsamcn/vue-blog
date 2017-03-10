<style src="../../assets/css/home/index.css" scoped></style>
<template>
    <div class="home">
        <router-link :to="{name:'Blog'}">Blog</router-link>
        <router-link :to="{name:'About'}">About</router-link>
    </div>
</template>
<script>
    export default{
        name:'home',
        data:()=>{
            return{
            }
        }
    }

</script>