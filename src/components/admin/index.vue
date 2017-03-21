<style src="../../assets/css/admin/index.css"></style>
<template>
    <div class="admin">
    <transition name="fade">
        <keep-alive>
            <router-view class="admin-view"></router-view>
        </keep-alive>
    </transition>
    </div>
</template>
<script>
    import 'element-ui/lib/theme/index.css';
    export default{
        name:'admin'
    }
</script>