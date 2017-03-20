<style src="@/assets/css/home/tags.css" scoped></style>
<template>
    <div class="moveup tags">
        <slot name="title"></slot>
        <div class="cont">
            <div class="wrapper">
                <a href="#">学习</a>
                <a href="#">工作</a>
                <a href="#">游戏</a>
                <a href="#">思考</a>
                <a href="#">吐槽</a>
                <a href="#">不好意思</a>
                <a href="#">我是辣鸡</a>
                <a href="#">一起飞</a>
                <a href="#">好好学习</a>
                <a href="#">牛逼</a>
            </div>
        </div>
    </div>
</template>
<script>
    export default{
        name:'tags'
    }
</script>