//=require jquery.min.js
// require libs/imagesloaded.pkgd.min.js
//
//=require libs/TweenMax.min.js
//=require libs/ScrollMagic.min.js
//=require libs/animation.gsap.min.js
//
//=require plugins/debug.addIndicators.min.js
//=require plugins/MorphSVGPlugin.min.js
//=require plugins/DrawSVGPlugin.min.js
//=require plugins/SplitText.min.js
// require plugins/page-scroll.js
//=require plugins/ScrollToPlugin.min.js
//=require plugins/disable-scroll.js
// require ../../../node_modules/barba.js/dist/barba.min.js


;(function($){

	$(window).on('load', function(){
		setTimeout(function(){
			document.body.classList.remove('loading');
		}, 100)
	});
})(jQuery);
