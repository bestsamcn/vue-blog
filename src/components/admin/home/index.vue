<style src="@/assets/css/admin/home/index.css" scoped></style>
<template>
    <div class="admin-home">
        <div class="preview">
            <div @click="goUrl({name:'AdminCount'})" class="prev-item bg-green">
                <h4>今天访问</h4>
                <p class="text-center color-white margin-top-20">{{accessTodayTotal}}</p>
            </div>
            <div  class="prev-item bg-red" @click="goUrl({name:'AdminArticleComment'})">
                <h4>今天评论</h4>
                <p class="text-center color-white margin-top-20">{{todayComment}}</p> 
            </div>
            <div @click="goUrl({name:'AdminMessage'})" class="prev-item bg-blue">
                <h4>未读消息</h4>
                <p class="text-center color-white margin-top-20">{{unreadMessageTotal}}</p>
            </div>
            
        </div>
    </div>
</template>
<script>
    import * as API from '@/api/index.js';
    import { mapActions, mapState } from 'vuex';
    export default{
        name:'adminHome',
        data(){
            return{
                todayComment:0,
                accessTodayTotal:0,
                unreadMessageTotal:0
            }
        },
        components:{
        },
        computed:{
            ...mapState({
                isLogin:state=>state.common.isLogin,
                token:state=>state.common.token
            })
        },
        methods:{
            goUrl(obj){
                this.$router.push(obj)
            }
        },
        mounted(){
            if(!this.token || !this.isLogin){
                this.goUrl({name:'AdminSignin'});
            }
        },
        created(){
            API.getPreviewTotal().then(res=>{
                this.todayComment = res.data.todayComment;
                this.accessTodayTotal = res.data.accessTodayTotal;
                this.unreadMessageTotal = res.data.unreadMessageTotal;
            });
        }
        
    }
</script>


