<style src="@/assets/css/home/tags.css" scoped></style>
<template>
    <div class="moveup tags">
        <slot name="title"></slot>
        <div class="cont">
            <div class="wrapper">
                <a href="#" v-for="item in tagList">{{item.name}}</a>
            </div>
        </div>
    </div>
</template>
<script>
    import { mapState } from 'vuex';
    export default{
        name:'tags',
        computed:{
            ...mapState({
                tagList:state=>state.admin.tagList
            })
            
        }
    }
</script>