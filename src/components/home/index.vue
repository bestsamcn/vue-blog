<style src="../../assets/css/home/index.css" scoped></style>
<template>
    <div class="home">
        <div class="main">
            <div class="wrapper">
                <div class="left-cont">
                    <Articlelist :article-list="[1,2,3,4]"></Articlelist>
                    <a href="javascript:;" @click="setToast('asdfas')" class="more-btn">更多</a>
                </div>
                <div class="right-bar sm-hide">
                    <Category>
                        <div slot="title" class="title color-black">
                            分类
                        </div>
                    </Category>
                    <Articlerank></Articlerank>
                    <Tags class="margin-top-30">
                        <div slot="title" class="title">
                            标签
                        </div>
                    </Tags>
                </div>
            </div>
        </div>
        <Footerbar class="margin-top-20"></Footerbar>
    </div>
    
</template>
<script>
    import { mapActions } from 'vuex';
    import Articlelist from '../article/articleList.vue';
    import Category from './Category.vue';
    import Footerbar from '@/components/common/footer.vue';
    import Articlerank from './articleRank.vue';
    import Tags from './tags.vue';
    export default{
        name:'home',
        data:()=>{
            return{
            }
        },
        methods:{
            ...mapActions([
                'setToast'
            ])
        },
        components:{
            Articlelist,
            Category,
            Articlerank,
            Tags,
            Footerbar
        }
    }

</script>