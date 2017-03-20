<style src="../../assets/css/admin/index.css"></style>
<template>
    <div class="admin">
    <transition :name="'fade'">
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
    </transition>
    </div>
</template>
<script>
    export default{
        name:'admin'
    }
</script>