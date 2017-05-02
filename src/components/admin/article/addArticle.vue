<style src="@/assets/css/admin/article/addArticle.css"></style>
<template>
    <div class="add-article">
        <div class="info">
            <Eselect v-model="tagChooseList" :multiple-limit="3" size="large" multiple placeholder="标签列表">
                <Eoption v-for="tag in tagList" :label="tag.name" :value="tag._id" :key="tag._id"></Eoption>
            </Eselect>
            <Eselect v-model="cateChooseList" :multiple-limit="3" size="large" multiple placeholder="分类列表">
                <Eoption v-for="cate in categoryList" :label="cate.name" :value="cate._id" :key="cate._id"></Eoption>
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
            <Ebutton type="info" size="large" @click="postArticle()">提交</Ebutton>
            <Ebutton type="danger" size="large">清空</Ebutton>
            <Ebutton type="danger" size="large" @click="getParseContent()">查看</Ebutton>
        </div>
    </div>
</template>
<script>
    import { markdownEditor } from 'vue-simplemde'
    import { Select, Option, Button, Input } from 'element-ui';
    import { mapState, mapActions } from 'vuex';
    import * as API from '@/api/index.js';
    import 'github-markdown-css';
    import xss from 'xss';
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
            ...mapActions([
                'setToast'
            ]),
            getParseContent(){
                console.log(this.editor.markdown(this.highlightHtml))
            },
            postArticle(){
                if(!this.title){
                    return this.setToast('请添加标题');
                }
                if(!this.tagChooseList.length){
                    return this.setToast('请添加标签');
                }
                if(!this.cateChooseList.length){
                    return this.setToast('请添加分类');
                }
                if(!this.previewText){
                    return this.setToast('请添加导读');
                }
                if(!this.highlightHtml.replace(/^\s*|\s*$/,'')){
                    return this.setToast('请添加内容');
                }
                var that = this;
                var obj = {
                    title:that.title,
                    tag:that.tagChooseList.toString(),
                    category:that.cateChooseList.toString(),
                    previewText:that.previewText,
                    content:xss(that.editor.markdown(that.highlightHtml))
                }
                API.addArticle(obj).then(res=>{
                    this.title = '';
                    this.tagChooseList = [];
                    this.cateChooseList = [];
                    this.previewText = '';
                    this.highlightHtml = '';  
                });
            }
        },
        mounted(){
            this.editor = this.$refs.Markdowneditor.simplemde;
        }
    }
</script>