import $$ from './index.js';
let obj = {};


obj.install = Vue=>{
	/**
	 * 图片自动适配
	 */
	Vue.directive('autoSize', {
		bind(el){
			el.setResize = function(){
				var src = el.src;
				var img = new Image();
				img.src = el.src;
				img.onload = function(e){
					var w = e.path[0].width;
					var h = e.path[0].height;
					if(w > h){
						el.style.height = '100%';
						el.style.width = 'initial';
					}else{
						el.style.height = 'initial';
						el.style.width = '100%';
					}
				}
			}
			el.setResize();
		},
		update(el){
			el.setResize();

		},
		unbind(){

		}
	});

	/**
	 * 右边侧栏滚动
	 */

	Vue.directive('sidebarScroll', {

		bind(el){
		},
		inserted(el){
			var _body = document.body;
			var _pNode = el.parentNode;
			// return
			el.slideBar = ()=>{
				//滚动的极限距离
				var h = parseInt(_pNode.offsetHeight) - parseInt(el.offsetHeight)-20;
				var mainOffsetTop = parseInt(_pNode.offseTop);
				var mainHeight = parseInt(_pNode.offsetHeight);
				var slideBarHeight =  parseInt(el.offsetHeight) - 40 ;
				var slideBarIntOffsetTop = 20;
				var slideFunc = function() {
		            var	scrollTop = parseInt(_body.scrollTop);
		            var slideBarOffsetTop = parseInt(el.offsetTop);
		            var slideBarTop  = parseInt(el.style.top) || 0;

		            //如果侧边栏和主体只差小于侧边栏的原始offsetTop就不滚动
		            if(parseInt(h) < slideBarIntOffsetTop){
		            	return false;
		            }
					// var aniDistant=Math.min( ( Math.max( ( -mainOffsetTop, ( scrollTop - slideBarOffsetTop + slideBarTop)))), (mainHeight - slideBarHeight ) );
					var aniDistant= Math.min(  scrollTop , (mainHeight - slideBarHeight ) );
					//
					if (aniDistant > h) {
						aniDistant = h
					};
					if (parseInt(_body.scrollTop) > slideBarIntOffsetTop ) {
						$$.moveStart(el, {'top':aniDistant});
					} else {
						$$.moveStart(el, {'top':10});
					}
				}
				window.addEventListener('scroll', slideFunc);
				document.addEventListener('resize', slideFunc);
			}
			setTimeout(()=>{
				el.slideBar()
			}, 500)
		},
		update(el){
			setTimeout(()=>{
				el.slideBar()
			}, 500)
		},
		unbind(){

		}
	});

	/**
	 * 动态canvas时钟
	 */
	Vue.directive('clock' , {
		inserted(el){
			setTimeout(()=>{
				$$.Clock.init(el);
			},500)
		},
		update(el){
			setTimeout(()=>{
				$$.Clock.init(el);
			},500)
		},
		unbind(){
			clearInterval($$.Clock._timer);
		},
		componentUpdated(){
			console.log($$.Clock._timer)
		}
	});

	/**
	 * 返回顶部指令
	 */
	Vue.directive('goTop', {
		inserted(el){
			setTimeout(()=>{
				$$.toScrollHeight(0, el);
			}, 500)
		},
		update(el){
			setTimeout(()=>{
				$$.toScrollHeight(0, el);
			}, 500)
		}
	});

	/**
	 * 是否显示返回顶部
	 */
	Vue.directive('shouldShowTop', {
		bind(el, binding){
			var nScrollTop, nClientHeight = document.documentElement.clientHeight || document.body.clientHeight;
			var elClass=el.class;
	        el.temp = ()=>{
	        	nScrollTop = document.documentElement.scrollTop || document.body.scrollTop;
		        if (nScrollTop > binding.value) {
		        	el.className="go-top-btn show";
		        } else {
		        	el.className="go-top-btn"
		        }
	        }
		},
		inserted(el){
	        el.temp();
	        window.addEventListener('scroll',el.temp);
		},
		update(el){
			el.temp();
	        window.addEventListener('scroll',el.temp);
		}
	});

}

export default obj;
