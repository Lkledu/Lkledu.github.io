{% raw %}
((($, window, document) => {

  /**
  * Force the flipcard to close when user click a checked radio
  */

  $('.flipcard-toggler').on('click', (event) => {
    const $input = $(event.currentTarget).parents('.flipcard').prev('input');

    if ($input) {
      const $uncheck = $(`input[name="${$input.attr['name']}"]`).filter('[value=""], [value="none"]');
      console.log($uncheck);
      if ($uncheck.length) {
        $uncheck.prop('checked', true).trigger('change');
      } else {
        const checked = $input.prop('checked');
        //$(event.currentTarget).parents('.flipcard').find('[title], [data-toggle="tooltip"]').tooltip('hide');
        //$tooltips.tooltip('hide');
        $input.prop('checked', !checked).trigger('change');
      }
    }
  });
}))(window.jQuery, window, document);
{% endraw %}
