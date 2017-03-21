<style src="@/assets/css/admin/signin.css"></style>
<template>
    <div class="sign">
        <div class="moveup signinpanel signin">
            <form id="signin-form">
                <h4 class="text-center sign-title color-purple">Login</h4>
                <input type="text" class="form-control uname" name="account" placeholder="用户名" />
                <input type="password" class="form-control pword m-b" name="password" placeholder="密码" />
                <button class="btn btn-success full-width btn-block m-b" @click.prevent="signClick()">登录</button>
            </form>
        </div>
    </div>
</template>
<script>
    import { Message } from 'element-ui';
    export default{
        name:'signin',
        components:{
        },
        data(){
            return{
                iShowMsg:false,
                alertMsg:''
            }
        },
        methods:{
            signClick(){
                this.$router.push({name:'AdminHome'});
            },
            onAlertClose(){
                this.iShowMsg = false;
                console.log('alert is close');
            }
        }
    }
</script>