// disable/enable scroll (mousewheel and keys) from http://stackoverflow.com/a/4770179
// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
var keys = [32, 37, 38, 39, 40], wheelIter = 0;

function preventDefault(e) {
	e = e || window.event;
	if (e.preventDefault)
		e.preventDefault();
	e.returnValue = false;
}

function keydown(e) {
	for (var i = keys.length; i--;) {
		if (e.keyCode === keys[i]) {
			preventDefault(e);
			return;
		}
	}
}

function touchmove(e) {
	preventDefault(e);
}

function wheel(e) {
	// for IE
	//if( ie ) {
		//preventDefault(e);
	//}
}

function disable_scroll() {
	window.onmousewheel = document.onmousewheel = wheel;
	document.onkeydown = keydown;
	document.body.ontouchmove = touchmove;
}

function enable_scroll() {
	window.onmousewheel = document.onmousewheel = document.onkeydown = document.body.ontouchmove = null;
}
// scroll functions
function resetScroll() { document.body.scrollTop = document.documentElement.scrollTop = 0; }
function preventScroll() { window.addEventListener( 'scroll', noscroll ); }
function allowScroll() { window.removeEventListener( 'scroll', noscroll ); }
function noscroll() {
	window.scrollTo( 0, 0 );
}
