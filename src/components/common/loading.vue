<style src="../../assets/css/common/loading.css" scoped></style>
<template>
    <div class="loading">
        <transition name="loadMask">
            <div class="loadMask" v-show="isLoading"></div>
        </transition>
        <transition name="loadEffect">
            <div class="loadEffect" v-show="isLoading">
                <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> 
            </div> 
        </transition>
    </div>
</template>
<script>
    export default{
        name:'loading',
        props:{
            isLoading:Boolean,
            default:false
        }
    }
</script>