{% raw %}
((($, window, document) => {

  /*
  if (typeof $.fn.modal === 'undefined') {
    console.warn('Bootstrap is not loaded!');
    return false;
  }
  */

  /**
  * Convert title attributs into tooltips
  */

  if (typeof $.fn.tooltip !== 'undefined') {
    const $tooltips = $('[title]');
    $tooltips.filter(':not(.btn), :not(attr)').tooltip({
      'trigger': 'hover focus',
      'delay': {
        'show': 3000
      }
    });
    $tooltips.filter('.btn').tooltip({
      'trigger': 'hover',
      'delay': {
        'show': 3000
      }
    });
  }



  /**
  * Change checkbox/radio text according to state
  */
  //$tooltips.filter('[data-checked-title]').attr('[data-unchecked-title]', $el.attr('title'))
  /*$tooltips.filter('[data-checked-title]').on('change', function () {
  $(':checkbox, :radio').filter('[data-checked-title]').on('change', function () {
    const $el = $(this);
    const attr = ($el.is(':checked')) ? 'data-checked-title' : 'data-unchecked-title';
    $el.tooltip('hide')
      .attr(attr, $el.)
      .tooltip('fixTitle')
      .tooltip('show');
  });*/


  /**
  * Load Disqus script only if container is shown
  */
  /*
  $('#comments').filter('.collapse').one('shown.bs.collapse', () => {
    let d = document, s = d.createElement('script');
    s.src = 'https://{% endraw %}{{ site.disqus.shortname }}{% raw %}.disqus.com/embed.js';
    s.async = true;
    s.setAttribute('data-timestamp', +new Date());
    (d.head || d.body).appendChild(s);
  });
  */



  /**
  * Add/remove .active class to collapse togglers
  */

  if (typeof $.fn.collapse !== 'undefined') {
    const $collapses = $('.collapse').filter('[id]');
    $collapses.on('shown.bs.collapse', (event) => {
      let id = $(event.currentTarget).attr('id');
      $('.btn').filter(`button[data-target="#${id}"], a[href="#${id}"]`).addClass('active');
    });
    $collapses.on('hidden.bs.collapse', (event) => {
      let id = $(event.currentTarget).attr('id');
      $('.btn').filter(`button[data-target="#${id}"], a[href="#${id}"]`).removeClass('active');
    });
  }



  /**
  * Hide toggler if target is missing
  */

  /*
  $('a[href*="#"], button[data-toggle][data-target*="#"]').each((index, element) => {
    let $el = $(element);
    console.log('toggler', $el.attr('href'), $el.attr('data-target'), $el);
    let target = $el.attr('href') || $el.attr('data-target');
    if (!target || !target.match(/^#[0-9a-zA-Z_-]*$/g) || !$(target)) {
      $el.hide();
    }
  });
  */


  /**
  * Assorted alert links
  */

  if (typeof $.fn.alert !== 'undefined') {
    $('.alert a').addClass('alert-link');
    $('.alert p').addClass('d-inline').last().addClass('mb-0');
  }


  /**
  * Update modal if height change
  */

  if (typeof $.fn.modal !== 'undefined') {
    $('.modal').modal('handleUpdate')
  }


  /**
  * Store / restore with local storage
  */
}))(window.jQuery, window, document);
{% endraw %}
