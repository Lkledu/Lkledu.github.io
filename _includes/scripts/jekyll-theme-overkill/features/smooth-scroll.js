{% raw %}

/**
* Smooth scroll up to anchors
*/

$(() => {

    const scrollTopDuration = 1000;
    $('a').filter('[href*="#"]').not('[href="#"]').not('[data-toggle="modal"]').not('[data-toggle="collapse"]').not('[data-toggle="tab"]').click((event) => {
      let $element = $(event.currentTarget);
      if (location.pathname.replace(/^\//,'') === event.currentTarget.pathname.replace(/^\//,'') && location.hostname === event.currentTarget.hostname) {

        const id = decodeURIComponent(event.currentTarget.hash);
        const $target = $(id) || $(`[name=${id.slice(1)}]`);
        let top;

        if ($target && $target.length) {

          const $parents = $target.parents('.card');
          if ($parents && $parents.length) {
            top = $parents.first().offset().top;
          } else {
            top = $target.offset().top;
          }

          const paddingTop = parseFloat($('body').css('padding-top')) || 0;

          // Scroll up to target
          $('html, body').stop().animate({
            scrollTop: top - paddingTop
          }, scrollTopDuration, 'swing', () => {

            // Blink target (or section)
            let $highlighted;
            let $sectionItems = $('.card').filter(`[data-section="${$target.attr('id')}"]`);
            if ($sectionItems && $sectionItems.length) {
              $highlighted = $sectionItems;
            } else if ($target.is('h1, h2, h3, h4, a, p')) {
              $highlighted = $target;
            }

            if ($highlighted && $highlighted.length) {
              const duration = 300;
              const repeat = 2;
              let interval = setInterval(() => {
                $highlighted.fadeToggle(duration);
              }, duration);
              setTimeout(() => {
                clearInterval(interval);
                $highlighted.fadeIn(duration);
              }, duration * repeat - duration);
            }

          });

          return false;

        }
      }
    });

});
{% endraw %}
