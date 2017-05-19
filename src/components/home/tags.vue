<style src="@/assets/css/home/tags.css" scoped></style>
<template>
    <div class="moveup tags">
        <slot name="title"></slot>
        <div class="cont">
            <div class="wrapper">
                <label v-if="isShowReset" class="tag-item" @change.stop="resetTag()">
                    <input type="radio" name="tag" checked>
                    <span>重置</span>
                </label>
                <label class="tag-item" v-for="item in tagList">
                    <input type="radio" @change.stop="tagClick(item._id)" :disabled="isDisabled" name="tag" v-model="tagValue" :value="item._id">
                    <span>{{item.name}}</span>
                </label>
            </div>
        </div>
    </div>
</template>
<script>
    import { mapState } from 'vuex';
    export default{
        name:'tags',
        props:{
            isShowReset:{
                type:Boolean,
                default:true,
                require:false
            },
            parentTagValue:{
                type:String,
                default:'',
                require:false
            },
            isDisabled:{
                type:Boolean,
                default:true,
                require:false
            }
        },
        data(){
            return{
                tagValue:''
            }
        },
        computed:{
            ...mapState({
                tagList:state=>state.admin.tagList
            })
        },
        watch:{
            'parentTagValue':'_resetTag'
        },
        methods:{
            tagClick(){
                if(this.isDisabled) return;
                this.$emit('onTagClick', this.tagValue);
            },
            resetTag(){
                this.tagValue = '';
                this.$emit('onResetClick','');
            },
            _resetTag(nval, oval){
                if(!nval) this.tagValue = '';
            }
        }
    }
</script>