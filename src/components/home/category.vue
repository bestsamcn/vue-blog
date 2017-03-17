<style src="@/assets/css/home/category.css" scoped></style>
<template>
    <div class="home-category">
        <slot name="title"></slot>
        <div class="cont">
            <div class="padding-right-10">
                <a href="#">
                    <span class="name">Javascript</span>
                    <span class="number">(123)</span>
                </a>
                <a href="#">
                    <span class="name">Css</span>
                    <span class="number">(123)</span>
                </a>
                <a href="#">
                    <span class="name">Html5</span>
                    <span class="number">(123)</span>
                </a>
                <a href="#">
                    <span class="name">Angular</span>
                    <span class="number">(123)</span>
                </a>
                <a href="#">
                    <span class="name">Vue</span>
                    <span class="number">(123)</span>
                </a>
            </div>
            <div class="padding-left-10">
                <a href="#">
                    <span class="name">Mongodb</span>
                    <span class="number">(123)</span>
                </a>
                <a href="#">
                    <span class="name">Redis</span>
                    <span class="number">(123)</span>
                </a>
                <a href="#">
                    <span class="name">Node</span>
                    <span class="number">(123)</span>
                </a>
                <a href="#">
                    <span class="name">Linux</span>
                    <span class="number">(123)</span>
                </a>
                <a href="#">
                    <span class="name">Ngnix</span>
                    <span class="number">(123)</span>
                </a>
            </div>
        </div>
    </div>
</template>
<script>
    export default{
        name:'home-category',
    }
</script>