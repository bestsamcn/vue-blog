<style src="@/assets/css/common/backTop.css" scoped></style>
<template>
	<div class="back-top">
		<a href="javascript:;" v-go-top v-should-show-top="800" class="go-top-btn">
			<span class="icon-arrow-up"></span>
		</a>
	</div>
</template>
<script>
	export default{
		name:'backTop'
	}
</script>