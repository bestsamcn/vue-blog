<style src="../../assets/css/search/index.css" scoped></style>
<template>
    <div class="search">
        <div class="wrapper">
            <div class="search-bar sm-100">
                <input type="search" placeholder="搜索" id="search-bar" onblur="this.placeholder='搜索'"  class="search-input">
                <i class="icon-search search-btn" @click="add()"></i>
                <transition-group class="tips-list" tag="ul" enter-active-class="animated zoomIn" leave-active-class="animated zoomOut">
                    <li v-for="item in list" :key="item">我是样板{{item}}</li>
                </transition-group>
            </div>
            <div class="margin-top-20">
                <Articlelist :article-list="[1,2,3,4]"></Articlelist>
            </div>
            <router-link :to="Article"></router-link>
        </div>
    </div>
</template>
<script>
    import Articlelist from '../article/articleList.vue';
    export default{
        name:'search',
        data(){
            return{
                list:[],
                next:1
            }
        },
        components:{
            Articlelist
        },
        methods:{
            add(){
                this.list.push(this.next);
                this.next++;
            }
        }

    }
</script>