{% raw %}
const filtersModule = ((() => {
    const data = {};
    let $reset;
    let $collectionFilters;
    let $searchFilter;
    let $items;


    /**
     * Filter items using selected collections
     */
    const filterCollections = $visibleItems => {
        const $inputs = $collectionFilters;

        let $input;
        let filter;
        let values;
        let selector = '';

        $inputs.each((index, element) => {

            $input = $(element);
            filter = $input.data('filter');
            values = $input.val();

            if (values && filter) {
                if (!$.isArray(values)) {
                    values = [values];
                }
                values.forEach(value => {
                    selector = `${selector}[data-${filter}~="${value}"]`;
                });
            }

        });

        if (selector !== '') {
            $visibleItems = $visibleItems.filter(selector);
            console.log('Filtered', selector);
        }

        return $visibleItems;
    };


    /**
     * Filter items from input query
     */
    const filterSearch = $visibleItems => {

        const $input = $searchFilter;

        return $visibleItems;

    };



    /**
     * Init collection filters
     */
    const initCollectionFilters = () => {
        const $inputs = $collectionFilters;
        if (!$inputs) {
            return false;
        }

        // Save filters default values in a data attribute
        let $input;

        let value;
        $inputs.each((index, element) => {
            $input = $(element);
            value = $input.val();
            $input.attr('data-default', value);
        });

        // When a collection filter change, display matching posts
        $inputs.on('change', () => {
            console.log('Collection filter changed');
            filterItems();
        });

        // Apply filter when input values restored from the local storage
        if ($().garlic) {
          $inputs.garlic({
              onRetrieve(elem, retrievedValue) {
                  console.log('Collection filter retrieved', retrievedValue);
                  filterItems();
              }
          });
        }
    };




    /**
     * Init search filter
     */
    const initSearchFilter = () => {

        const $input = $searchFilter;
        if (!$input) {
            return false;
        }

        // When the selection filter change, display matching posts
        $input.on('keyup', () => {
            filterItems();
        });

    };



    /**
     * Restore every filter values
     */
    const reset = () => {

        let value;

        const $inputs = $collectionFilters;
        if ($inputs) {
            $inputs.each((index, element) => {
                $input = $(element);
                value = $input.data('default');
                $input.val(value).trigger('change');
            });
        }

    };


    /**
     * Filter items using selected values
     */
    const filterItems = () => {

        let $visibleItems = $items;

        //$visibleItems.hide();
        //$visibleItems.css('opacity', 0.2);
        $visibleItems = filterCollections($visibleItems);
        $visibleItems = filterSearch($visibleItems);
        //$visibleItems.show();
        //$visibleItems.css('opacity', 1);

        $items.not($visibleItems).addClass('hidden');
        $visibleItems.removeClass('hidden');

    };




    $(() => {

        $reset = $('.filter-reset');
        $collectionFilters = $('.filter');
        $searchFilter = $('.search-filter');
        $items = $('.filter-item');

        initCollectionFilters();
        initSearchFilter();

        // Init reset button
        $reset.on('click', () => {
            reset();
        });

    });
}))();
{% endraw %}
