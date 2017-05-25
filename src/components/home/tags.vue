<style src="@/assets/css/home/tags.css" scoped></style>
<template>
    <div class="moveup tags">
        <slot name="title"></slot>
        <div class="cont">
            <div class="wrapper">
                <a href="javascript:;" class="tag-item" @click="tagClick(item.name)" v-for="item in tagList">
                    <span>{{item.name}}</span>
                </a>
            </div>
        </div>
    </div>
</template>
<script>
    import { mapState, mapActions } from 'vuex';
    export default{
        name:'tags',
        data(){
            return{
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
        }
    }
</script>