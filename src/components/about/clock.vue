<template>
	<div class="">
		<canvas width="300" height="180" id="canvas" v-clock><p class="nope">No canvas, no particles</p></canvas>
		<div id="about">
	        <a href="#" style="visibility:hidden;opacity:0" id="toggle-options"></a>
	        <ul id="options" style="visibility:hidden;opacity:0">
	            <li><a href="#" id="quivers" class="">Quiver</a></li>
	            <li><a href="#" id="gradient" class="on">Gradient</a></li>
	            <li><a href="#" id="color" class="on">Colorize</a></li>
	            <li><a href="#" id="valentineify" class="">Valentine-ify</a></li>
	            <li class="group"><span>Mouse down: explode and repel</span></li>
	            <li><span>Mouse down + shift: explode and attract</span></li>
	            <li><span>Arrow Up: increase particle size</span></li>
	            <li class="group"><span>Sorry about your CPU</span></li>
	            <li><span id="fps"></span></li>
	        </ul>
	    </div>
	</div>
</template>
<script>
	export default{
		name:'clock',
		created(){

		},
		mounted(){

		}
	}
</script>
