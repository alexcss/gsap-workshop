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
//=require plugins/page-scroll.js
//=require plugins/ScrollToPlugin.min.js
//=require plugins/disable-scroll.js
//=require ../../../node_modules/barba.js/dist/barba.min.js
// require components/tilt.js

;(function($){
	// scroll functions



	const gsAnime = {};



	//=require components/page-transition.js

	//
	var  tlDraw = new TimelineMax();


	gsAnime.tlIntro = new TimelineMax({paused:true, onComplete: allowScroll});

	if($('.gs-intro__title').length){

		var introText = new SplitText('.gs-intro__title', {type:"chars"});

		gsAnime.tlIntro
			.set('#morh-bg', {stroke:"rgba(0,0,0,0.3)", strokeWidth:4, fill:"rgba(0,0,0,0)", transformOrigin:"50% 50%"})
			.set('#tape', {stroke:"#fff", strokeWidth:4, fill:"rgba(0,0,0,0)", scale:0.9, transformOrigin:"50% 50%"})
			.add('start-morph')
			.from('#tape', 2, {drawSVG:"50% 50%", delay:1})
			// .fromTo('#tape', 10, {drawSVG:"0% 10%", delay:1}, {drawSVG:"90% 100%"})
			.from('#morh-bg', 1, {drawSVG:"0% 0%", delay:1}, "start-morph")
			.to('#morh-bg', 1, {stroke:"rgba(0,0,0,0)", fill:"rgba(0,0,0,0.3)"})
			.staggerFrom(introText.chars, 1, {cycle: {y:[-10, 10], opacity:[0]}}, 0.02)
			.from('.gs-intro p', 1, {y:-10, opacity:0});

		preventScroll();
	}

	$(document).ready(function(){
		Barba.Pjax.start();

		// Barba.Pjax.Dom.wrapperId = 'pjax-wrapper';
		// Barba.Pjax.Dom.containerClass = 'pjax-container';
		// Barba.Pjax.start();
		// Barba.Prefetch.init();
	});

	//
	MorphSVGPlugin.convertToPath("circle, rect, ellipse, line, polygon, polyline");

	// TweenMax.to(".gs-clip", 5, {morphSVG:"#clip-circle"});

	function playReveal(el){
		//console.log(el.target);

		var revealer = $(el.target),
			revealerContent = revealer.children('.gs-revealer__content'),
			revealerEl = revealer.children('.gs-revealer__el');


		var tlReveal = new TimelineMax();
			tlReveal
				.set(revealerContent, {opacity:0})
				.set(revealerEl, {opacity:1, transformOrigin:'0% 0%'})
				.fromTo(revealerEl, 1, {scaleX:0}, {scaleX:1})
				.set(revealerEl, {transformOrigin:'100% 0%'})
				.set(revealerContent, {opacity:1})
				.to(revealerEl, 1, {scaleX:0});

		tlReveal.timeScale( 1.5 );

		revealer.data('tlReveal', tlReveal);
	}
	var counter = { var: 0 };
	 // TweenMax.to(counter, 5, {
		//   var: 100,
		//   onUpdate: function () {
		// 	  console.log(Math.ceil(counter.var));
		//   },
		//   ease:Circ.easeOut
	 //  });

	var controller = new ScrollMagic.Controller();

	tl = new TimelineMax({yoyo:true, repeat:-1});

	var tlMorph = new TimelineMax(),
		tlMorphShape = new TimelineMax(),
		tlBgColor = new TimelineMax(),
		morphShape = $("#morh-bg");

	tl
	  .to('.morph-wrap', 5, {skewX:10, skewY:-5, scale:1.1})
	  .to('.morph-wrap', 5, {skewX:-5, skewY:2});

	//TweenMax.to("#tape", 5, {morphSVG:"#morh-bg2"}, "+=0");

	tlMorphShape
		.to(morphShape, 10, {morphSVG:"#morh-bg"}, "+=0")
		.to(morphShape, 10, {morphSVG:"#morh-bg1"}, "+=0")
		.to(morphShape, 10, {morphSVG:"#morh-bg2"}, "+=0")
		.to(morphShape, 10, {morphSVG:"#morh-bg3"}, "+=0")
		.to(morphShape, 10, {morphSVG:"#morh-bg4"}, "+=0")
		.to('.morph', 10, {scale:0.8}, "-=10")
		.to(morphShape, 10, {morphSVG:"#morh-bg5"}, "+=0")
		.to('.morph', 10, {scale:1.5}, "-=10");

	tlBgColor
		.to("body", 10, {"--background-color":"#333DBD"})
		.to("body", 10, {"--background-color":"#533556"})
		.to("body", 10, {"--background-color":"#00565B"})
		.to("body", 10, {"--background-color":"#66B193"} )
		.to("body", 10, {"--background-color":"#164993"} )
		.to("body", 10, {"--background-color":"#992E4A"})
	;
	tlMorph
		.add(tlMorphShape)
		.add(tlBgColor, 0);

		// build scene
	gsAnime.sceneMorph = new ScrollMagic.Scene({triggerElement: "#main", duration: $('#main').outerHeight(true), triggerHook: "onEnter"})
					// animate color and top border in relation to scroll position
				.setTween(tlMorph) // the tween durtion can be omitted and defaults to 1
				// .addIndicators({name: "morph"}) // add indicators (requires plugin)
				.addTo(controller);

	$('.gs-album').each(function(index, el) {

		var album = $(el);
		var reveal = album.find('.content').children(':not(img,svg, audio)');

		console.log(album);

		// console.log(reveal);
		//
		reveal.each(function(index) {
			var revealer = $(this),
				revealerContent = $('<div class="gs-revealer__content" />'),
				revealerEl = $('<div class="gs-revealer__el" />');

			revealer.addClass('gs-revealer');
			revealer.wrapInner(revealerContent);
			revealer.append(revealerEl);
		});


		var tlStaggerReveal = new TimelineMax();

		// Optimize for using reverse!!!!
		//
		tlStaggerReveal
			.staggerFrom(reveal, 1, { onStart: playReveal, onStartParams: ["{self}"]}, 0.15);

		// album.data('tlStaggerReveal', tlStaggerReveal);

		var sceneReveal = new ScrollMagic.Scene({triggerElement: el , offset:100, reverse: false})
			.setTween(tlStaggerReveal)
			// .addIndicators({name: "reveal", colorStart: 'orange'})
			.addTo(controller);


		// album.data('sceneReveal', sceneReveal);


		var albumAudio = album.find('audio')[0];

		albumAudio.volume = 0;
		albumAudio.muted = false;

		var voluemControl = new TimelineMax({yoyo:true, repeat:1, repeatDelay:1})
				.to(albumAudio, 1, {
				  volume: 0.5,
				  ease: Power2.easeIn,
				  onUpdateParams: ['{self}'],
				  onUpdate: function (tl) {
				  	// console.log(tl.progress().toFixed(2))
				  }
				})
			;

		// build scene
		var scenePlayAudio = new ScrollMagic.Scene({triggerElement: el, duration: "102%", triggerHook: 0.5, offset: 0})
						// animate color and top border in relation to scroll position
					.setTween(voluemControl) // the tween durtion can be omitted and defaults to 1
					// .addIndicators({name: "volume"}) // add indicators (requires plugin)
					.addTo(controller);

		// album.data('scenePlayAudio', scenePlayAudio);

	});


	$(window).on('load', function(){

		TweenLite.set(window, {scrollTo: 0});

		// Array.from(document.querySelectorAll('.content--layout')).forEach(el => new TiltObj(el));

		setTimeout(function(){
			document.body.classList.remove('loading');
			gsAnime.tlIntro.play();
		}, 100)
	});
})(jQuery);
