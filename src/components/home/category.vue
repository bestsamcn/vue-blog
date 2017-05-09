<style src="@/assets/css/home/category.css" scoped></style>
<template>
    <div class="moveup home-category">
        <slot name="title"></slot>
        <div class="cont">
            <a href="#" v-for="item in categorylist" :key="item._id">
                <span class="name">{{item.name}}</span>
                <span class="number">({{item.totalArticle || 0}})</span>
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