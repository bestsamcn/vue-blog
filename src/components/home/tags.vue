<style src="@/assets/css/home/tags.css" scoped></style>
<template>
    <div class="moveup tags">
        <slot name="title"></slot>
        <div class="cont">
            <div class="wrapper">
                <label class="tag-item" @change.stop="resetTag()">
                    <input type="radio" name="tag" checked>
                    <span>重置</span>
                </label>
                <label class="tag-item" @change.stop="onTagClick()" v-for="item in tagList">
                    <input type="radio" name="tag" :value="item._id" v-model="tagValue">
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
        methods:{
            onTagClick(){
                this.$emit('onTagClick', this.tagValue);
            },
            resetTag(){
                this.tagValue = '';
                this.$emit('onResetClick');
            }
        }
    }
</script>