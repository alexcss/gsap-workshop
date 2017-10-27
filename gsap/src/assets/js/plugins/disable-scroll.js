// scroll functions
function resetScroll() { document.body.scrollTop = document.documentElement.scrollTop = 0; }
function preventScroll() { window.addEventListener( 'scroll', noscroll ); }
function allowScroll() { window.removeEventListener( 'scroll', noscroll ); }
function noscroll() {
	window.scrollTo( 0, 0 );
}
