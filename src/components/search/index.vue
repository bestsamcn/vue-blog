<style src="../../assets/css/search/index.css" scoped></style>
<template>
    <div class="search">
        <div class="wrapper">
            <div class="search-bar sm-100">
                <input type="search" placeholder="搜索" v-model="keywords" id="search-bar" class="search-input">
                <i class="icon-search search-btn" @click="add()"></i>
                <transition-group class="tips-list" tag="ul" enter-active-class="animated zoomIn" leave-active-class="animated zoomOut">
                    <li v-show="isDirty" v-for="item in list" :key="item">我是样板{{item}}</li>
                </transition-group>
            </div>
            <Tags></Tags>
            <div class="margin-top-20">
                <Articlelist :article-list="[1,2,3,4]"></Articlelist>
            </div>
            <router-link :to="{name:'Article'}"></router-link>
        </div>
    </div>
</template>
<script>
    import Articlelist from '../article/articleList.vue';
    import Tags from '../home/tags.vue';
    export default{
        name:'search',
        data(){
            return{
                list:[1,2,3,4],
                next:1,
                keywords:'',
                isDirty:false
            }
        },
        components:{
            Articlelist,
            Tags
        },
        watch:{
            keywords:'watchKeywords'
        },
        methods:{
            watchKeywords(){
                let t = null;
                if(!this.keywords){
                    this.keywords = '';
                    this.isDirty = false;
                    return;
                };
                t && clearTimeout(t);
                t = setTimeout(()=>{
                    this.isDirty = true;
                },500);
            },
            add(){
                this.list.push(this.next);
                this.next++;
            }
        }

    }
</script>