<style src="@/assets/css/admin/home/index.css" scoped></style>
<template>
    <div class="admin-home">
        <div class="preview">
            <div @click="goUrl({name:'AdminCount'})" class="prev-item bg-green">
                <h4>访问总数</h4>
                <p class="text-center color-white margin-top-20">{{accessTotal}}</p>
            </div>
            <div  class="prev-item bg-red">
                <h4>昨天访问</h4>
                <p class="text-center color-white margin-top-20">{{accessYestodayTotal}}</p> 
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
    export default{
        name:'adminHome',
        data(){
            return{
                accessTotal:0,
                accessYestodayTotal:0,
                unreadMessageTotal:0
            }
        },
        components:{
        },
        methods:{
            goUrl(obj){
                this.$router.push(obj)
            }
        },
        created(){
            API.getPreviewTotal().then(res=>{
                this.accessTotal = res.data.accessTotal;
                this.accessYestodayTotal = res.data.accessYestodayTotal;
                this.unreadMessageTotal = res.data.unreadMessageTotal;
            });
        }
        
    }
</script>


