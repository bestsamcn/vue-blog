<style src="@/assets/css/home/tags.css" scoped></style>
<template>
    <div class="moveup tags">
        <slot name="title"></slot>
        <div class="cont">
            <div class="wrapper">
                <a href="javascript:;" class="tag-item" @click="tagClick(item._id && item._id.name)" v-for="item in tagArticleGroup" :key="item._id && item._id._id">
                    <span>{{item._id && item._id.name}}</span>
                </a>
            </div>
        </div>
    </div>
</template>
<script>
    import { mapState, mapActions } from 'vuex';
    import * as API from '@/api/index.js'
    export default{
        name:'tags',
        data(){
            return{
                tagArticleGroup:[]
            }
        },
        computed:{
            ...mapState({
                tagList:state=>state.admin.tagList
            })
        },
        methods:{
            ...mapActions([
                'setArticleParams'
            ]),
            tagClick(name){
                var obj = {
                    category:'',
                    tag:name,
                    isFromHome:true
                }
                this.setArticleParams(obj).then(()=>{
                    this.$router.push({name:'Article'});
                });
            }
        },
        created(){
            API.getDiffArticle({type:2}).then(res=>{
                this.tagArticleGroup = res.data;
            });
        }
    }
</script>
