{% raw %}

/**
* Show/hide the back-to-top button according to scrollbar position
*/

$(() => {

  const defaults = {
    toggler: {
      id: 'back-to-top',
      bottom: 0,
      zIndex: 0
    },
    offset: 0,
    fadeDuration: 300
  };

  const settings = $.extend({}, defaults, window.backToTopConfig);



  const $toggler = $(`#${settings.toggler.id}`);
  const $targets = $toggler.add('.reveal');


  // If the back-to-top link is fixed,
  // try to adjust bottom position and z-index above fixed-bottom element(s)
  if ($toggler.length && $toggler.css('position') === 'fixed') {
    let bottom = 0, zIndex = 0;
    $('.fixed-bottom').each((index, element) => {
      bottom = Math.max(bottom, ($(window).outerHeight(true) - $(element).position().top) || 0);
      zIndex = Math.max(zIndex, parseInt($(element).css('z-index')) + 1);
    });
    $toggler
      .css('right', 0)
      .css('bottom', settings.toggler.bottom || bottom);
    if (settings.toggler.zIndex || zIndex) {
      $toggler.css('z-index', settings.toggler.zIndex || zIndex);
    }
  }


  // Unhide the back-to-top button (and other elements) gradually when scroll down
  if ($targets.length) {

    $targets.fadeOut();

    $(window).on('scroll', (event) => {
      const scrollHeight = $(document).height();
      if (scrollHeight > 0) {
        const scrollTop = $(event.currentTarget).scrollTop();
        const viewportHeight = $(window).height();
        const opacity = 1 - (scrollHeight - viewportHeight - scrollTop) / (scrollHeight - viewportHeight);
        if (scrollTop > (settings.offset || viewportHeight)) {
          $targets.stop().fadeTo(settings.fadeDuration, opacity);
        } else {
          $targets.stop().fadeOut(settings.fadeDuration);
        }
      }
    });

  }


});
{% endraw %}
