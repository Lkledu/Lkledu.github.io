{% raw %}
((($, window, document) => {
  $(() => {

    const $nav = $('#index');
    if ($nav.length) {
      let titleLevel;
      let label;
      let $title;
      let navItems = '';
      //const $titles = $('.post-content').find('h2, h3, h4.card-title, .card[data-section]').filter('[id]');
      const $titles = $('.post-content').find('h2, h3, h4.card-title').filter('[id]');

      if ($titles.length > 1) {
        $titles.each((index, element) => {
          $title = $(element);
          titleLevel = parseInt($title.prop('tagName').replace(/[^0-9]+/g, ''));
          titleLevel = titleLevel - 2 || 0;
          label = ($title.attr('data-label') || $title.html());
          navItems = `${navItems}<li class="nav-item ${(index === 0) ? 'active' : ''}"><a class="nav-link" href="#${(index === 0) ? 'top' : $title.attr('id')}">${label}</a></li>`;
        });
        $nav.append(navItems);
        const paddingTop = parseFloat($('body').css('padding-top')) || 0;
        $('body').scrollspy({
          target: $nav,
          offset: paddingTop
        });
      } else {
        $nav.parents('.collapse').first().collapse({
          toggle: false
        });
        $nav.closest('.card').prop('hidden', 'hidden');
      }
    }

  });
}))(window.jQuery, window, document);
{% endraw %}
