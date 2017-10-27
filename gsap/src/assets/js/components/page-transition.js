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
	// if(Barba.HistoryManager.prevStatus().namespace == 'single'){
	// 	return toHomeTransition;
	// } else {

	// }

	return toSingleTransition;
};
