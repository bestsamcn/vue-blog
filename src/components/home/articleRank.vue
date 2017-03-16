<style src="@/assets/css/home/articleRank.css" scoped></style>
<template>
    <div class="article-rank margin-top-30">
        <div class="tab-list">
            <a href="javascript:;" class="active">最火</a>
            <a href="javascript:;">最新</a>
            <a href="javascript:;">评论</a>
            <a href="javascript:;">标签</a>
        </div>
        <div class="tab-cont">
            <div class="popular">
                <a href="#" v-for="item in [1,2,3,4]">
                    <div class="img">
                        <img src="" alt="">
                    </div>
                    <div class="text">
                        <h4>关于this的指向问题关于this的指向问题</h4>
                        <p><i class="icon-calendar"></i>2017.02.03</p>
                    </div>
                </a>
            </div>
        </div>
    </div>
</template>
<script>
    export default{
        name:'article-rank'
    }
</script>