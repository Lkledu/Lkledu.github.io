
/**
* Add a class to the html tag when Lazysizes is ready
*/

$(document).one('lazybeforeunveil', () => {
  $('html').addClass('lazysizes-active');
})
