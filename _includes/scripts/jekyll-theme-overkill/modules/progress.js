{% raw %}
((($, window, document) => {
  /**
  * Display progression on post preview (card)
  */

  if (window.localStorage) {
    $('.progress').each((index, element) => {
      const $progress = $(element);
      const $card = $progress.closest('.card').first();
      const namespace = $progress.attr('data-id');
      const key = 'progress';
      const value = JSON.parse(localStorage.getItem(`${namespace}:${key}`));
      const complete = (value === 100);
      $progress
        .find('.progress-bar')
        .css('width', `${value || 0}%`)
        //.html((value || 0).toFixed() + '%')
        .attr('aria-valuenow', (value || 0).toFixed());
      if (complete) {
        $card.toggleClass('text-dark bg-dark bg-white bg-primary bg-warning border-dark border-primaty border-warning', !complete);
        $card.toggleClass('bg-success border-success', complete);
      }
    });
  }
}))(window.jQuery, window, document);
{% endraw %}
