<style src="@/assets/css/admin/article/addArticle.css"></style>
<template>
    <div class="add-article" ref="addArticleRef">
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
        <div class="margin-top-20" ref="articleToolbarRef">
            <label class="upload-btn">
                <span :class="{'icon-spinner icon-spin':isUploading}">{{isUploading?'':'上传图片'}}</span>
                <input type="file" v-show="false" name="poster" v-on:change="posterChange" accept="image/gif, image/jpeg, image/png">
            </label>
            <label class="upload-btn">
                <span :class="{'icon-spinner icon-spin':isPosterUploading}">{{isPosterUploading ?'':'修改封面'}}</span>
                <input type="file" v-show="false" name="poster" v-on:change="addPoster" accept="image/gif, image/jpeg, image/png">
            </label>
            <label class="upload-btn" @click="postArticle()">
                <span>提交</span>
            </label>
            <label class="upload-btn" @click="getParseContent()">
                <span>查看</span>
            </label>
        </div>
        <div class="highlight">
            <Markdowneditor :class="{'editor': 1}" ref="Markdowneditor" preview-class="markdown-body" :configs="configs" v-model="highlightHtml"></Markdowneditor>
        </div>
        <div class="margin-top-20">
            <label class="upload-btn">
                <span :class="{'icon-spinner icon-spin':isUploading}">{{isUploading?'':'上传图片'}}</span>
                <input type="file" v-show="false" name="poster" v-on:change="posterChange" accept="image/gif, image/jpeg, image/png">
            </label>
            <label class="upload-btn">
                <span :class="{'icon-spinner icon-spin':isPosterUploading}">{{isPosterUploading ?'':'修改封面'}}</span>
                <input type="file" v-show="false" name="poster" v-on:change="addPoster" accept="image/gif, image/jpeg, image/png">
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
        name:'editArticle',
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
                tagChoose:'',
                cateChoose:'',
                isEditorFullscreen:false,
                editor:null,
                poster:'',
                isUploading:false,
                isPosterUploading:false,
                type:2,
                elScrollTop:0
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
                console.log(this.highlightHtml)
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
                    codeContent:that.highlightHtml,
                    poster:that.poster,
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
                if(this.$route.name !== 'AdminEditArticle') return;
                if(!this.$route.params.id){
                    this.$router.push({name:'AdminArticle'});
                    return;
                }
                API.getArticleDetail({id:this.$route.params.id,type:this.type}).then(res=>{
                    this.title = res.data.curr.title;
                    this.tagChoose = res.data.curr.tag._id;
                    this.poster = res.data.curr.poster;
                    this.cateChoose = res.data.curr.category._id;
                    this.previewText = res.data.curr.previewText;
                    this.highlightHtml = res.data.curr.codeContent;
                });
            },
            posterChange(e){
                //b为单位，1mb = 1b*1024*1024
                this.elScrollTop = this.$el.scrollTop;
                this.isUploading = true;
                var cm = this.editor.codemirror;
                var file = e.target.files[0];
                var size = file.size;
                var formData = new FormData();
                formData.append('poster',file);
                var that = this;
                var tempText = `![${file.name}](http://...)`;
                // var tempValue = `${cm.getValue()}${tempText}`;
                // cm.setValue(tempValue);
                //获取光标位置
                var pos = cm.getCursor();
                cm.setSelection(pos, pos);
                cm.replaceSelection(tempText);
                Axios.post(`${CONFIG.ROOT_API}/article/addPoster`, formData, {
                    headers: {
                        'withCredentials':true,
                        'Content-Type': false,
                        'x-access-token':that.token
                    }
                }).then(res=>{
                    that.isUploading = false;
                    var reg = new RegExp('\\!\\['+file.name+'\\]\\(http:\\/\\/\\.\\.\\.\\)','gm');
                    cm.setValue(cm.getValue().replace(reg, `![default](${CONFIG.POSTER_URL}/${res.data.data.posterName})`));
                    that.$el.scrollTop = that.elScrollTop;
                    e.target.value='';

                });
            },
            addPoster(e){
                this.isPosterUploading = true;
                var file = e.target.files[0];
                var formData = new FormData();
                formData.append('poster',file);
                var that = this;
                Axios.post(`${CONFIG.ROOT_API}/article/addPoster`, formData, {
                    headers: {
                        'withCredentials':true,
                        'Content-Type': false,
                        'x-access-token':that.token
                    },
                    timeout:100000
                }).then(res=>{
                    that.isPosterUploading = false;
                    that.poster = res.data.data.posterName;
                    e.target.value='';
                }, err=>{
                    that.setToast('异常');
                    e.target.value='';
                    that.isPosterUploading = false;
                }).catch(e=>{
                    that.setToast('异常');
                    e.target.value='';
                    that.isPosterUploading = false;
                });
            },
            //scroll view
            scrollView(){
                let that = this;
                let toolbarOffsetTop = this.articleToolbarRef.offsetTop;
                let _scroll = function(){
                    if(this.scrollTop >= toolbarOffsetTop){
                        let cssText = `position:fixed;z-index:100;left:290px;top:100px`;
                        that.articleToolbarRef.style.cssText = cssText;

                    }else{
                        that.articleToolbarRef.style.cssText = '';
                    }
                }
                this.addArticleRef.addEventListener('scroll', _scroll);
                this.addArticleRef.addEventListener('resize', _scroll);

            }
        },
        mounted(){
            this.editor = this.$refs.Markdowneditor.simplemde;
            this.addArticleRef = this.$refs.addArticleRef;
            this.articleToolbarRef = this.$refs.articleToolbarRef;
            this.scrollView();

        }
    }
</script>
