<style src="@/assets/css/home/category.css" scoped></style>
<template>
    <div class="moveup home-category">
        <slot name="title"></slot>
        <div class="cont">
            <a href="javascript:;" @click="cateClick(item._id.name)" v-for="item in categoryArticleGroup" :key="item._id && item._id._id">
                <span class="name">{{item._id && item._id.name}}</span>
                <span class="number">({{item.total || 0}})</span>
            </a>
        </div>
    </div>
</template>
<script>
    import { mapState, mapActions } from 'vuex';
    import * as API from '@/api/index.js';
    export default{
        name:'home-category',
        data(){
            return{
                categoryArticleGroup:[]
            }
        },
        computed:{
            ...mapState({
                categorylist:state=>state.admin.categoryList
            })
        },
        methods:{
            ...mapActions([
                'setArticleParams'
            ]),
            cateClick(name){
                var obj = {
                    category:name,
                    tag:'',
                    isFromHome:true
                }
                this.setArticleParams(obj).then(()=>{
                    this.$router.push({name:'Article'});
                });
            }
        },
        created(){
            API.getDiffArticle({type:1}).then(res=>{
                this.categoryArticleGroup = res.data;
            });
        }
    }
</script>
