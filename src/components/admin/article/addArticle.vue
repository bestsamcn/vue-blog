<style src="@/assets/css/admin/article/addArticle.css"></style>
<template>
    <div class="add-article">
        <div class="info">
            <Eselect v-model="tagChooseList" :multiple-limit="3" size="large" multiple placeholder="标签列表">
                <Eoption v-for="tag in tagList" :label="tag.name" :value="tag._id" :key="tag.value"></Eoption>
            </Eselect>
            <Eselect v-model="cateChooseList" :multiple-limit="3" size="large" multiple placeholder="分类列表">
                <Eoption v-for="cate in categoryList" :label="cate.label" :value="cate.label" :key="cate.value"></Eoption>
            </Eselect>
        </div>
        <div class="margin-top-20">
            <Einput v-model="title" placeholder="请输入标题"></Einput>
        </div>
        <div class="margin-top-20">
            <Einput v-model="previewText" placeholder="请输入导读"></Einput>
        </div>
        <div class="highlight">
            <Markdowneditor :class="{'editor': 1}" ref="Markdowneditor" preview-class="markdown-body" :configs="configs" v-model="highlightHtml"></Markdowneditor>
        </div>
        <div class="btn text-right margin-top-20">
            <Ebutton type="info" size="large">提交</Ebutton>
            <Ebutton type="danger" size="large">清空</Ebutton>
            <Ebutton type="danger" size="large" @click="getParseContent()">查看</Ebutton>
        </div>
    </div>
</template>
<script>
    import { markdownEditor } from 'vue-simplemde'
    import { Select, Option, Button, Input } from 'element-ui';
    import { mapState } from 'vuex';
    import 'github-markdown-css';
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
                title:'',
                previewText:'',
                tagChooseList:[],
                cateChooseList:[],
                isEditorFullscreen:false,
                editor:null
            }
        },
        components:{
            Markdowneditor:markdownEditor,
            Eselect:Select,
            Eoption:Option,
            Ebutton:Button,
            Einput:Input
        },
        computed:{
            ...mapState({
                tagList:state=>state.admin.tagList,
                categoryList:state=>state.admin.categoryList
            }),
            isFullscreen(){
                return this.editor.isFullscreenActive();
            }
        },
        methods:{
            getParseContent(){
                console.log(this.editor.markdown(this.highlightHtml))
            }
        },
        mounted(){
            this.editor = this.$refs.Markdowneditor.simplemde;
        }
    }
</script>