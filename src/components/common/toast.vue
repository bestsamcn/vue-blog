<style src="@/assets/css/common/toast.css" scoped></style>
<template>
    <div class="toast">
        {{ msg }}
    </div>
</template>
<script>
    export default{
        name:'toast',
        props:{
            msg:{
                type:String,
                default:'未知错误',
                require:true
            }
        }
    }
</script>