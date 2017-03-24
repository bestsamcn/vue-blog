<style src="@/assets/css/admin/article/addArticle.css" scoped></style>
<template>
    <div class="add-article">
        <div class="info">
            <Eselect v-model="tagChooseList" :multiple-limit="3" size="large" multiple placeholder="标签列表">
                <Eoption v-for="tag in tagList" :label="tag.label" :value="tag.label" :key="tag.value"></Eoption>
            </Eselect>
            <Eselect v-model="cateChooseList" :multiple-limit="3" size="large" multiple placeholder="分类列表">
                <Eoption v-for="cate in categoryList" :label="cate.label" :value="cate.label" :key="cate.value"></Eoption>
            </Eselect>
        </div>
        
        <div class="highlight">
            <Markdowneditor class="editor"  :configs="configs" v-model="highlightHtml"></Markdowneditor>
        </div>
        <div class="btn text-right margin-top-20">
            <Ebutton type="info" size="large">提交</Ebutton>
            <Ebutton type="danger" size="large">清空</Ebutton>
        </div>
    </div>
</template>
<script>
    import { markdownEditor } from 'vue-simplemde'
    import SimpleMDE from 'simplemde';
    import { Select, Option, Button } from 'element-ui';
    import { mapState } from 'vuex';
    import 'github-markdown-css'
    export default{
        name:'addArticle',
        data(){
            return{
                highlightHtml:'',
                configs: {
                    status: false, // 禁用底部状态栏
                    initialValue: '', // 设置初始值
                    renderingConfig: {
                        codeSyntaxHighlighting: true, // 开启代码高亮
                        highlightingTheme: 'atom-one-dark' 
                    }
                },
                tagChooseList:[],
                cateChooseList:[]
            }
        },
        components:{
            Markdowneditor:markdownEditor,
            Eselect:Select,
            Eoption:Option,
            Ebutton:Button
        },
        computed:{
            ...mapState({
                tagList:state=>state.admin.tagList,
                categoryList:state=>state.admin.categoryList
            })
        },
        methods:{

        },
        mouted(){
            this.simplemde.togglePreview()
        }
    }
</script>