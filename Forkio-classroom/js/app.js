;(function($){

	var tlHeader = new TimelineMax();

	tlHeader
		.fromTo('.logo', .6, {opacity:0, y:-30}, {opacity:1, y:0})
		.staggerFrom('.nav-drop > ul li a', 0.3, {
			cycle: {
				y: [-20, 20]
			},
			opacity:0
		}, 0.1, 0.3)
		.from('#nav > a', 1, {x:10, opacity:0, ease: Expo.easeOut}, "-=0.5")
		// .from('.visual', 0.5,  {opacity:0})
	;
	var title = new SplitText('.visual h1', {type:"chars, words"});

	var tlHero = new TimelineMax({delay:0.5});

		tlHero
			.set("#cta p", {opacity:0})
			.staggerFrom(title.chars, 0.3,
				{
					cycle:{
						y:function(i){
							return -i*30
						}
					},
				opacity:0,
				ease: Power3.easeInOut
				}, 0.1)
			.staggerFrom(
				['.visual p', '.visual span', '.visual img'],
				1,
				{opacity:0},
				0.3
			)
		.from("#cta a", .5, {scale:0, ease: Bounce.easeOut})
		.set("#cta p", {opacity:1})
		.from("#cta p", 0.5, {y:-40, ease: Bounce.easeOut})
	;

	var price = {val:0, val2:0};

	var priceCount = new TimelineMax()
		.to(price, 5, {val: 100, onUpdate: function(){
			$('.price-main').eq(0).text(Math.round(price.val))
			},
			ease: Expo.easeInOut
		})
		.to(price, 5, {val2: 100, onUpdate: function(){
			$('.price-main').eq(1).text(Math.round(price.val2))
			},
			ease: Expo.easeInOut
		}, 0.2)
	;


	var controller = new ScrollMagic.Controller();
	// build scene
	var scene = new ScrollMagic.Scene({
						triggerElement: ".pricing-tables",
						triggerHook:0.8,
						reverse:false
					})
					.setTween(priceCount) // trigger a TweenMax.to tween
					.addIndicators({name: "run price counter"}) // add indicators (requires plugin)
					.addTo(controller);

	new ScrollMagic.Scene({
			triggerElement: ".visual-container",
			duration:"100%",
			triggerHook:1
		})
		// .setPin(".visual-container")
		.setTween(
			".visual-container .bg-stretch",
			// $('.testimonials li').eq(2),
			{y: -100, ease: Linear.easeNone})
		.addIndicators({name:"paralax"})
		.addTo(controller);

})(jQuery);
