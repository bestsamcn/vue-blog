<style src="@/assets/css/admin/signin.css"></style>
<template>
    <div class="moveup sign signin">
        <form id="signin-form">
            <h4 class="text-center sign-title color-purple">Login</h4>
            <input type="text" class="form-control uname" name="account" placeholder="用户名" />
            <input type="password" class="form-control pword m-b" name="password" placeholder="密码" />
            <a href="" class="pull-left m-b color-gray">忘记密码了？</a>
            <button class="btn btn-success full-width btn-block m-b" id="signin-btn">登录</button>
            <!-- <p class="text-muted text-center">
                <small class="color-gray">还没有帐号？</small>
                <a href="/sign/signup" class="color-green">点此注册</a>
            </p> -->
        </form>
    </div>
</template>
<script>
    export default{
        name:'signin'
    }
</script>