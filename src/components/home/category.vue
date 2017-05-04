<style src="@/assets/css/home/category.css" scoped></style>
<template>
    <div class="moveup home-category">
        <slot name="title"></slot>
        <div class="cont">
            <a href="#">
                <span class="name">Javascript</span>
                <span class="number">(123)</span>
            </a>
            <a href="#">
                <span class="name">Css</span>
                <span class="number">(123)</span>
            </a>
            <a href="#">
                <span class="name">Html5</span>
                <span class="number">(123)</span>
            </a>
            <a href="#">
                <span class="name">Angular</span>
                <span class="number">(123)</span>
            </a>
            <a href="#">
                <span class="name">Vue</span>
                <span class="number">(123)</span>
            </a>
        </div>
    </div>
</template>
<script>
    import { mapState } from 'vuex';
    export default{
        name:'home-category',
        computed:{
            ...mapState({
                categorylist:state=>state.admin.categoryList
            })
        }
    }
</script>