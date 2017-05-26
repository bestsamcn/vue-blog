<style src="../../assets/css/about/index.css" scoped></style>
<template>
    <div class="about">
        <div class="main">
            <div class="info-box">
                <div class="bg">
                    <Clock></Clock>
                </div>
                <div class="avatar">
                    <img src="../../assets/img/avatar.png">
                </div>
                <div class="describe">
                    <div class="name color-black font-20">
                        BestSamCN
                    </div>
                    <div class="intr color-gray font-14 margin-top-5">
                        一条有梦想的咸鱼
                    </div>
                </div>
                <div class="footer">
                    <a href="https://github.com/bestsamcn" class="icon-github"></a>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import Clock from './clock.vue';
    export default{
        name:'about',
        components:{
            Clock
        }
    }
</script>