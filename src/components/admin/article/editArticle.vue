<style src="@/assets/css/admin/article/addArticle.css"></style>
<template>
    <div class="add-article">
        <div class="info">
            <Eselect v-model="tagChoose"  size="large"  placeholder="标签列表">
                <Eoption v-for="tag in tagList" :label="tag.name" :value="tag._id" :key="tag._id"></Eoption>
            </Eselect>
            <Eselect v-model="cateChoose"  size="large"  placeholder="分类列表">
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
    import '@/assets/css/common/github-markdown.css';
    import xss from 'xss';
    export default{
        name:'editArticle',
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
                tagChoose:'',
                cateChoose:'',
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
        watch:{
            '$route':'getArticle'
        },
        created(){
            this.getArticle();
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
                if(!this.tagChoose){
                    return this.setToast('请添加标签');
                }
                if(!this.cateChoose){
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
                    id:this.$route.params.id,
                    title:that.title,
                    tag:that.tagChoose,
                    category:that.cateChoose,
                    previewText:that.previewText,
                    // content:that.highlightHtml
                    content:that.editor.markdown(that.highlightHtml)
                }
                API.editArticle(obj).then(res=>{
                    this.title = '';
                    this.tagChoose = '';
                    this.cateChoose = '';
                    this.previewText = '';
                    this.highlightHtml = ''; 
                    this.$router.push({name:'AdminArticle'});
                });
            },
            getArticle(){
                if(!this.$route.params.id){
                    this.$router.push({name:'AdminArticle'});
                    return;
                }
                API.getArticleDetail({id:this.$route.params.id}).then(res=>{
                    this.title = res.data.title;
                    this.tagChoose = res.data.tag._id;
                    this.cateChoose = res.data.category._id;
                    this.previewText = res.data.previewText;
                    this.highlightHtml = res.data.content;
                });
            }
        },
        mounted(){
            this.editor = this.$refs.Markdowneditor.simplemde;
        }
    }
</script>