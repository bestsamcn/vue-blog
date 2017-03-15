<style src="../../assets/css/article/page.css"></style>
<template>
    <div class="page">
        <div class="page-wrapper" v-html="pageHtml"></div>
    </div>
</template>
<script>
    export default{
        name:'page',
        data(){
            return {
                pageHtml:'' 
            }
           
        },
        props:{
            total:{
                type:Number,
                default:1,
                require:true
            },
            showPage:{
                type:Number,
                default:2,
                require:false
            },
            pageIndex:{
                type:Number,
                default:1,
                require:true
            },
            activeClass:{
                type:String,
                default:'active',
                require:false
            }
        },
        watch:{
            pageIndex:'generatePage'
        },
        methods:{
            generatePage(){
                var str = '<a href="#/article/'+this.pageIndex+'" data-bind="'+this.pageIndex+'" class="'+this.activeClass+'">' + this.pageIndex + '</a>';
                for (var i = 1; i <= this.showPage; i++) {
                    if (this.pageIndex - i > 1) {
                        str = '<a href="#/article/'+(this.pageIndex-i)+'" data-bind="'+(this.pageIndex-i)+'">' + (this.pageIndex - i) + '</a> ' + str;
                    }
                    if (this.pageIndex + i < this.total) {
                        str = str + ' ' + '<a href="#/article/'+(this.pageIndex+i)+'" data-bind="'+(this.pageIndex+i)+'">'+(this.pageIndex + i)+'</a>';
                    }
                }
                if (this.pageIndex - (this.showPage+1)> 1) {
                    str = '<a>...</a> ' + str;
                }
                if (this.pageIndex > 1) {
                    str = '<a href="#/article/'+(this.pageIndex-1)+'" class="icon-chevron-left" data-bind="'+(this.pageIndex-1)+'"></a> ' + '<a href="javascript:;" data-bind="1">1</a>' + ' ' + str;
                }
                if (this.pageIndex + (this.showPage+1) < this.total) {
                    str = str +' '+'<a>...</a>';
                }
                if (this.pageIndex < this.total) {
                    str = str + ' ' + '<a href="#/article/'+this.total+'" data-bind="'+this.total+'">'+this.total +'</a>'+' '+'<a href="#/article/'+(this.pageIndex+1)+'" class="icon-chevron-right" data-bind="'+(this.pageIndex+1)+'"></a>';
                }
                this.pageHtml = str;
            }
        },
        created(){
            this.generatePage();
        }

    }
</script>