<style src="@/assets/css/article/comment.css"></style>
<template>
    <div class="comment">
        <form class="comment-form">
            <ul>
                <li>
                    <input type="text" placeholder="你的昵称">
                </li>
                <li>
                    <input type="text" placeholder="你的邮箱">
                </li>
                <li>
                    <textarea placeholder="回复内容" cols="30" rows="10"></textarea>
                </li>
                <li>
                    <label>
                        <input type="checkbox">
                        <span class="icon-check-empty">记住评论信息</span>
                    </label>
                    <a href="javascript:;" class="face icon-github-alt">表情</a>
                    <button @click.stop="" class="sub-btn">提交</button>
                </li>
            </ul>
        </form>
        <div class="comment-list">
            <div class="comment-item">
                <div class="favor">
                    <a href="javascript:;" class="icon-sort-up up"></a>
                    <span>0</span>
                    <a href="javascript:;" class="icon-sort-down down"></a>
                </div>
                <div class="cont">
                    <h4 class="title text-left">
                        梁小茹：
                    </h4>
                    <p class="quote">@打死不吃黄瓜： 萌出鼻血了！而且表现手法也好棒啊！</p>
                    <p class="text text-left color-black margin-top-5">
                        萌出鼻血了！而且表现手法也好棒啊！
                    </p>
                    <div class="operate text-left margin-top-10">
                        <a class="color-gray font-12 icon-time">5小时前</a>
                        <a href="javascript:;" class="text-left color-gray font-12 icon-comment">回复</a>
                    </div>
                </div>
            </div>
            <a  href="#/article/2" class="more-btn md-hide">More</a>
        </div>
    </div>
</template>
<script>
    export default{
        name:'comment'
    }
</script>