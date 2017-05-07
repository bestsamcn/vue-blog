<style src="@/assets/css/admin/article/articleComment.css"></style>
<template>
    <div class="article-commment">
        <Etable border :data="commentList">
            <Etablecolumn prop="date" label="时间">
                <template scope="scope">
                    {{ scope.row.date | dateFormat('yyyy-MM-dd') }}
                </template>
            </Etablecolumn>
            <Etablecolumn prop="article" label="文章"></Etablecolumn>
            <Etablecolumn prop="anchor" label="锚点">
                <template scope="scope">
                    <router-link class="color-black" :to="{name:'ArticleDetail',params:{id:12313}}">锚点</router-link>
                </template>
            </Etablecolumn>
            <Etablecolumn prop="fromUser" label="来自"></Etablecolumn>
            <Etablecolumn prop="content" label="内容"></Etablecolumn>
            <Etablecolumn label="操作">
                <template scope="scope">
                    <Ebutton type="info">查看</Ebutton>
                    <Ebutton type="danger">删除</Ebutton>
                </template>
            </Etablecolumn>
        </Etable>
    </div>
</template>
<script>
    import { Table, TableColumn, Button, Tag } from 'element-ui';
    import { mapState } from 'vuex';
    export default{
        name:'articleComment',
        components:{
            Etable:Table,
            Etablecolumn:TableColumn,
            Ebutton:Button,
            Etag:Tag
        },
        computed:{
            ...mapState({
                commentList:state=>state.admin.commentList
            })
        }

    }
</script>