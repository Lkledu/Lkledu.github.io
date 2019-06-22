{% raw %}
(($, window, document) => {
  'use strict';

  const $togglers, $targets, $searchboxes;


  /**
  * Hide unchecked items
  */

  var filter = (action) => {
    var $checkedTogglers = $togglers.filter(':checked');

    $targets.show();
    if (action !== false) {

      // Filter by attribut
      $checkedTogglers.each((index, element) => {
        var target = $(element).attr('data-filter');
        if (target) {
          $targets.not(target).filter(':visible').hide();
        }
      });

      /*
      // Filter by text
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
      */

    }
  };



  $(() => {


    $togglers = $('.filter-toggler');
    $targets = $('.filter-target');
    $searchboxes = $('.searchbox');



    /**
    * Filter elements only when options are visible
    */

    if ($togglers.length) {
      var $collapses = $togglers.parents('.collapse');
      $collapses.on('show.bs.collapse', (event) => {
        filter();
        $togglers.change((event) => {
          filter(true);
        });
        // Check the hidden "none" radio when user click a checked radio
        //$togglers.click(() => {
        //  console.log("click");
        //  if ($(event.currentTarget).is(':checked')) {
        //    $toggles.filter('[name=' + $(event.currentTarget).attr('name') + '][value=none]').trigger('click');
        //  }
        //});
      });
      $collapses.on('hide.bs.collapse', () => {
        filter(false);
        $togglers.stop('change');
      });
    }



    /**
    * Searchbox filter
    */

    if ($searchboxes.length && $targets.length) {
      $searchboxes.on('input', (e) => {
        console.log('Searchbox', e.type);
        $targets = $('.filter-target');
        filter(true);
      });
    }


  });


})(window.jQuery, window, document);
{% endraw %}
