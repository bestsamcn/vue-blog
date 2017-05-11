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
                <label class="tag-item" @change.stop="tagClick(item._id)" v-for="item in tagList">
                    <input type="radio" :disabled="isDisabled" name="tag" :value="item._id">
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
            tagValue:{
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
            }
        },
        computed:{
            ...mapState({
                tagList:state=>state.admin.tagList
            })
        },
        methods:{
            tagClick(tag){
                if(this.isDisabled) return;
                this.$emit('onTagClick', tag);
            },
            resetTag(){
                this.$emit('onResetClick','');
            }
        }
    }
</script>