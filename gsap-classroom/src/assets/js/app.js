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
// require components/tilt.js

;(function($){

	var tlIntro = new TimelineMax();
	// console.log($('#morh-bg')[0].getTotalLength());
	var pathL = $('#morh-bg')[0].getTotalLength();

	tlIntro
		.set('#morh-bg',
			{
				fill:"rgba(0,0,0,0)",
				stroke:"rgba(0,0,0,1)",
				strokeWidth:2,
				strokeDasharray : pathL,
				strokeDashoffset : pathL
			})
		.set('#tape',
			{
				fill:"rgba(0,0,0,0)",
				stroke:"#fff",
				strokeWidth:10,
				// strokeDasharray : pathL,
				// strokeDashoffset : ""+pathL+""
			})
		.to('#morh-bg', 2, {
			strokeDashoffset: 0,
			delay:1
		})
		.from('#tape', 2, {drawSVG: "50% 50%", ease:Expo.easeInOut})
		.to('#morh-bg', 1, {
			fill:"rgba(0,0,0,0.4)",
			stroke:"rgba(0,0,0,0)",
		}, "-=2")
		.to('#morh-bg', 1, {morphSVG: "#morh-bg2"})
	;



	$(window).on('load', function(){
		setTimeout(function(){
			document.body.classList.remove('loading');

			var title  = $('.content__title');

			title.wrapInner('<div class="gs-revealer__content"></div>');
			var revEl = $('<div class="gs-revealer__el" />');
			title.addClass('gs-revealer');
			title.append(revEl);

			var tlReveal = new TimelineMax({delay:.5});
			console.log(revEl);
			tlReveal
				.set('.gs-revealer__el', {opacity:1, transformOrigin:"0 0"})
				.fromTo('.gs-revealer__el', 0.5, {scaleX:0 }, {scaleX:1})
				.set('.gs-revealer__content', {opacity:1})
				.to('.gs-revealer__el', 0.5, {scaleX:0, transformOrigin:"100% 0"})
				;

		}, 100)
	});
})(jQuery);
