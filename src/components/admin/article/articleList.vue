<style src="@/assets/css/admin/article/articleList.css" scoped></style>
<template>
    <div class="admin-article-list">
        <Etable :data="articleList" border style="width:100%;">
            <Etablecolumn prop="date" label="日期">
                <template scope="scope">
                    {{ scope.row.date | dateFormat('yyyy-MM-dd') }}
                </template>
            </Etablecolumn>
            <Etablecolumn prop="title" label="标题"></Etablecolumn>
            <Etablecolumn prop="author" label="作者" width="80"></Etablecolumn>
            <Etablecolumn prop="remask" label="摘要"></Etablecolumn>
            <Etablecolumn prop="tags" label="标签" width="250">
                <template scope="scope">
                    <Etag v-for="tag in scope.row.tags" :key="tag.id" class="margin-0-5">{{ tag }}</Etag>
                </template>
            </Etablecolumn>
            <Etablecolumn prop="category" label="归类"  width="180">
                <template scope="scope">
                    <Etag v-for="cate in scope.row.category" :key="cate.id" class="margin-0-5">{{ cate }}</Etag>
                </template>
            </Etablecolumn>
            <Etablecolumn fixed="right" label="操作" >
                <template scope="scope">
                    <Ebutton type="info" size="small">查看</Ebutton>
                    <Ebutton size="small">编辑</Ebutton>
                    <Ebutton type="danger" size="small">删除</Ebutton>
                  </template>
            </Etablecolumn>
        </Etable>
    </div>
</template>
<script>
    import { Table, TableColumn, Button, Tag } from 'element-ui';
    export default{
        name:'adminArticleList',
        data(){
            return{
                articleList:[
                    {
                        id:1,
                        date:1490166061472,
                        category:['javascript','html5'],
                        tags:['前端','效果','动画'],
                        title:'无缝轮播图效果',
                        author:'sam',
                        like:123,
                        remask:'教你如何使用原生js写一个无缝轮播图',
                        thumbnail:'XSJjxajsdo232.png',
                        picture:'lkasdflj23sfjas.png',
                        comments:[
                            {
                                id:1,
                                date:1490166061472,
                                ip:'192.168.0.1',
                                fromUser:'best',
                                parentComment:null,
                                content:'贱人就是矫情有木有。。。',
                            },
                            {
                                id:2,
                                date:1490166061472,
                                ip:'192.168.0.1',
                                fromUser:'lala',
                                parentComment:null,
                                content:'我向你飞，雨温柔的吹',
                            },
                            {
                                id:3,
                                date:1490166061472,
                                ip:'192.168.0.1',
                                fromUser:'lala',
                                parentComment:{
                                    id:2,
                                    date:1490166061472,
                                    ip:'192.168.0.1',
                                    fromUser:'lala',
                                    parentComment:null,
                                    content:'我向你飞，雨温柔的吹',
                                },
                                content:'我向你飞，雨温柔的吹',
                            }
                        ]
                    }
                ],
                operateWidth:0
            }
        },
        components:{
            Etable:Table,
            Etablecolumn:TableColumn,
            Ebutton:Button,
            Etag:Tag
        },
        created(){
            let type = "orientationchange" in window ? "orientationchange" : "resize";
            window.addEventListener(type, ()=>{
                let width = document.documentElement.clientWidth;
                if(width < 500){
                    this.operateWidth = 100;
                }else{
                    this.operateWidth = 220;
                }
            })
        }
    }
</script>