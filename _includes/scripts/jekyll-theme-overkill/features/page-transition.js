{% raw %}
((($, window, document) => {
  const transitionDuration = 1000;

  /**
  * Add the page leave transition class (opposite transition) and delay page leave when user click a local link
  */

  $('a').filter('[href^="/"]').on('click', (event) => {

    $('.fadeInRight').addClass('fadeOutLeft');
    $('.fadeInLeft').addClass('fadeOutRight');
    $('.fadeInUp').addClass('fadeOutDown');
    $('.fadeInDown').addClass('fadeOutUp');
    const href = $(event.currentTarget).attr('href');

    window.setTimeout(() => {
      window.location = href;
    }, transitionDuration);
    return false;

  });

}))(window.jQuery, window, document);
{% endraw %}
