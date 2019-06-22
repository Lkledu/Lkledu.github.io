{% raw %}
(($, window, document) => {
  'use strict';

  var $targets, $searchboxes;


  /**
  * Filter by text
  */

  var filter = (action) => {

    //$targets.show();
    if (action !== false) {

      $searchboxes.each((index, element) => {
        var text = $(element).val().toLowerCase();
        if (text) {
          $targets.filter(':visible').each((index, element) => {
            var $target = $(element);
            var matches = 0;
            $target.find('h2, h3, h4, p').add($target).each((index, element) => {
              if ($(element).text().toLowerCase().indexOf("" + text + "") !== -1) {
                matches = matches + 1;
              }
            });
            if (matches === 0) {
              $target.hide();
            }
          });
        }
      });

    }
  };



  $(() => {

    $targets = $('.filter-target');
    $searchboxes = $('.searchbox');

    if ($searchboxes.length && $targets.length) {
      $searchboxes.on('input', () => {
        filter(true);
      });
    }

  });


})(window.jQuery, window, document);
{% endraw %}
