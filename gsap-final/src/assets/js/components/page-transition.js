var lastClicked;

Barba.Dispatcher.on('linkClicked', function(el) {
	lastClicked = el;
});

var toSingleTransition = Barba.BaseTransition.extend({
	start: function() {
		/**
		 * This function is automatically called as soon the Transition starts
		 * this.newContainerLoading is a Promise for the loading of the new container
		 * (Barba.js also comes with an handy Promise polyfill!)
		 */

		// As soon the loading is finished and the old page is faded out, let's fade the new page
		Promise
		.all([this.newContainerLoading, this.fadeOut()])
		.then(this.fadeIn.bind(this));
	},

	fadeOut: function() {
		/**
		 * this.oldContainer is the HTMLElement of the old Container
		 */
		 var deferred = Barba.Utils.deferred();
		 // var album = $(lastClicked).closest('.gs-album');

		 // var reveal = album.find('.content').children(':not(img,svg, audio)');

		 // function reverseReveal(tl){
		 // 	console.log(tl);
		 // 	$(tl.target).data('tlReveal').reverse()
		 // }
		 // var tlReverseReveal = new TimelineMax({
		 // 	onComplete: showSingle
		 // });

		 // // Optimize for using reverse!!!!
		 // //
		 // tlReverseReveal
		 // .staggerFrom(reveal, 1, { onStart: reverseReveal, onStartParams: ["{self}"], }, 0.15);

		 // function showSingle(){
		 // 	console.log('single')
	 	// 	deferred.resolve();

		 // }

		deferred.resolve();

		return deferred.promise;
		//return $(this.oldContainer).animate({ opacity: 0 }).promise();
	},

	fadeIn: function() {
		/**
		 * this.newContainer is the HTMLElement of the new Container
		 * At this stage newContainer is on the DOM (inside our #barba-container and with visibility: hidden)
		 * Please note, newContainer is available just after newContainerLoading is resolved!
		 */

		 var e = this;
		 var newBox = $(e.newContainer),
		 oldBox = $(e.oldContainer);

		 var album = $(lastClicked).closest('.gs-album');

		 var reveal = album.find('.content').children(':not(img,svg, audio)');

		 function reverseReveal(tl){
		 	console.log(tl);
		 	$(tl.target).data('tlReveal').reverse()
		 }
		 var tlReverseReveal = new TimelineMax({
		 	onComplete: showSingle
		 });

		 // TweenLite.set(newBox, {position: "fixed", top: 0, left:0});

		 //Muted all audio
		 TweenLite.to('audio', 0.3, {volume: 0, onComplete: function(){
		 	// console.log(this.target);
		 	$(this.target).each(function(){
		 		this.pause();
		 	})
	 	}});

		 // Optimize for using reverse!!!!
		 //
		 tlReverseReveal
		 	.staggerFrom(reveal, 1, { onStart: reverseReveal, onStartParams: ["{self}"], }, 0.15);

		 function showSingle(){
		 	console.log('single')
		 	// deferred.resolve();
		 	oldBox.hide();

		 	 var article = newBox.find('.gs-post');


		 	gsAnime.sceneMorph.enabled(false); //Disable on scroll morping
		 	TweenLite.to('audio', 0.3, {volume: 0});

		 	// albumAudio = album.find('audio')[0];

		 	var tlShowSingle = new TimelineLite({
		 		delay:0,
		 		onComplete: function(){ e.done(); }
		 	});

		 	// var article = $('.gs-post');
		 	// var splitArticle = new SplitText('.gs-post__content p', {type:"lines"});

		 	// // TweenLite.set('h1,p', {css:{transformPerspective:400, transformStyle:"preserve-3d"}}); //saves a dozen lines of vendor-prefixed css ;)

		 	tlShowSingle
		 		.set(newBox, {visibility : 'visible'})
		 		.set(window, {scrollTo: 0})
		 		.from(article, 0.5  , {xPercent: 100, ease: Power3.easeOut})
		 		.from('.gs-post__header', 0.8, {opacity: 0, ease: Power3.easeInOut}, "-=0.3")
		 		.staggerFrom('.gs-post p', 0.5, {y:-10, opacity:0}, 0.1, "-=0.3")
		 		// .staggerFrom(splitArticle.lines, 0.5, {y:-10, opacity:0}, 0.1, "-=0.3")
		 	;
		 }
		 // reveal.each(function(index) {
		 //   var revealer = $(this);

		 //   revealer.data('tlReveal').reverse()
		 // });

		 // var sceneReveal = album.data('sceneReveal');

		 // var tlStaggerReveal = album.data('tlStaggerReveal');






		// $el.animate({ opacity: 1 }, 400, function() {
			/**
			 * Do not forget to call .done() as soon your transition is finished!
			 * .done() will automatically remove from the DOM the old Container
			 */

			// _this.done();
		// });
	}
});

var toHomeTransition = Barba.BaseTransition.extend({
	start: function() {
		/**
		 * This function is automatically called as soon the Transition starts
		 * this.newContainerLoading is a Promise for the loading of the new container
		 * (Barba.js also comes with an handy Promise polyfill!)
		 */

		// As soon the loading is finished and the old page is faded out, let's fade the new page
		Promise
		.all([this.newContainerLoading, this.fadeOut()])
		.then(this.fadeIn.bind(this));
	},

	fadeOut: function() {
		/**
		 * this.oldContainer is the HTMLElement of the old Container
		 */
		 var deferred = Barba.Utils.deferred();

		deferred.resolve();

		return deferred.promise;
	},

	fadeIn: function() {
		/**
		 * this.newContainer is the HTMLElement of the new Container
		 * At this stage newContainer is on the DOM (inside our #barba-container and with visibility: hidden)
		 * Please note, newContainer is available just after newContainerLoading is resolved!
		 */

		 var e = this;
		 e.done();
	}
});


/**
 * Next step, you have to tell Barba to use the new Transition
 */

Barba.Pjax.getTransition = function() {
	/**
	* Here you can use your own logic!
	* For example you can use different Transition based on the current page or link...
	*/
	if(Barba.HistoryManager.prevStatus().namespace == 'single'){
		return toHomeTransition;
	} else {
		return toSingleTransition;
	}

};
