<style src="../../assets/css/common/header.css" scoped></style>
<template>
    <div class="header">
        <div class="logo color-green">B<span class="color-black">est</span></div>
        <div class="nav-list">
        	<router-link :to="{name:'Home'}">Home</router-link>
        	<router-link :to="{name:'Article'}">Article</router-link>
        	<router-link :to="{name:'About'}">About</router-link>
        </div>
    </div>
</template>
<script>
    export default{
        name:'header'
    }
</script>