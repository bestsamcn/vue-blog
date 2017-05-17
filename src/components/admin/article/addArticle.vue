<style src="@/assets/css/admin/article/addArticle.css"></style>
<template>
    <div class="add-article">
        <div class="info">
            <Eselect v-model="tagChooseList"  size="large"  placeholder="标签列表">
                <Eoption v-for="tag in tagList" :label="tag.name" :value="tag._id" :key="tag._id"></Eoption>
            </Eselect>
            <Eselect v-model="cateChooseList"  size="large"  placeholder="分类列表">
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
        <div class="margin-top-20">
            <label class="upload-btn">
                <span :class="{'icon-spinner icon-spin':isUploading}">{{isUploading?'':'上传图片'}}</span>
                <input type="file" v-show="false" name="poster" v-on:change="posterChange" accept="image/gif, image/jpeg, image/png">
            </label>
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
    import Axios from 'axios';
    import * as API from '@/api/index.js';
    import * as CONFIG from '@/api/config.js'
    import '@/assets/css/common/github-markdown.css';
    import xss from 'xss';
    export default{
        name:'addArticle',
        data(){
            return{
                highlightHtml:'',
                configs: {
                    status: false, // 禁用底部状态栏
                    initialValue: '', // 设置初始值
                    autosave:{
                        enabled:true,
                        delay:5000,
                        uniqueId:Date.now()
                    },
                    renderingConfig: {
                        codeSyntaxHighlighting: true, // 开启代码高亮
                        highlightingTheme: 'atom-one-dark' 
                    },
                    toolbar: ["bold", "italic", "heading", "|", "code", "quote", "unordered-list", "ordered-list", "|", "link", "image", "preview", "|", "side-by-side", "fullscreen", "guide"]
                },
                title:'',
                previewText:'',
                tagChooseList:[],
                cateChooseList:[],
                isEditorFullscreen:false,
                editor:null,
                poster:'',
                isUploading:false
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
                token:state=>state.common.token,
                categoryList:state=>state.admin.categoryList
            }),
            isFullscreen(){
                return this.editor.isFullscreenActive();
            }
        },
        methods:{
            ...mapActions([
                'setToast',
                'setArticleState'
            ]),
            getParseContent(){
                console.log(this.highlightHtml)
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
                    codeContent:that.highlightHtml,
                    content:that.editor.markdown(that.highlightHtml)
                }
                API.addArticle(obj).then(res=>{
                    this.title = '';
                    this.tagChooseList = [];
                    this.cateChooseList = [];
                    this.previewText = '';
                    this.highlightHtml = '';
                    this.setArticleState(true); 
                });
            },
            posterChange(e){
                //b为单位，1mb = 1024b*1024*1024
                this.isUploading = true;
                var cm = this.editor.codemirror;
                var file = e.target.files[0];
                var size = file.size;
                var formData = new FormData();
                formData.append('poster',file);
                var that = this;
                var tempText = `![${file.name}](http://...)`;
                var tempValue = `${cm.getValue()}${tempText}`;
                cm.setValue(tempValue);
                Axios.post(`${CONFIG.ROOT_API}/article/addPoster`, formData, {
                    headers: {
                        'withCredentials':true,
                        'Content-Type': false,
                        'x-access-token':that.token
                    },
                    timeout:100000
                }).then(res=>{
                    that.isUploading = false;
                    var reg = new RegExp('\\!\\['+file.name+'\\]\\(http:\\/\\/\\.\\.\\.\\)','gm');
                    cm.setValue(tempValue.replace(reg, `\n![default](${CONFIG.POSTER_URL}/${res.data.data.posterName})`));
                    e.target.value='';
                }, err=>{
                    that.setToast('异常');
                    e.target.value='';
                    that.isUploading = false;
                }).catch(e=>{
                    that.setToast('异常');
                    e.target.value='';
                    that.isUploading = false;
                });
            }
        },
        mounted(){
            this.editor = this.$refs.Markdowneditor.simplemde;
        },
        created(){
        }
    }
</script>