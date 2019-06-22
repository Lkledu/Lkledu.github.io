{% raw %}
/*
((($, window, document) => {

  if (typeof lunr === 'undefined') {
    throw new Error('Lunr is not present. Please include / require Lunr before this script.');
    return false;
  }

  $('.lunr-list').each((index, element) => {

  });

  $('.lunr-filter').each((index, element) => {

  });

}))(window.jQuery, window, document);
*/


((($, window, document) => {

  if (typeof lunr === 'undefined') {
    throw new Error('Lunr is not present. Please include / require Lunr before this script.');
    return false;
  }

  let store;
  let idx;

  let $itemsContainer;
  let $resultsContainer;
  let $messageContainer;
  let $searchInput;
  let $searchFields;
  let $fields;

  const defaults = {
    storeName: 'lunrStore',
    storePath: null,
    ref: 'id',
    fields: ['title', 'categories', 'tags', 'description', 'excerpt', 'content'],
    lang: 'en',
    itemsContainerSelector: '#search-items',
    resultsContainerSelector: '#search-results',
    messageContainerSelector: '#search-message',
    searchInputSelector: '#search-input',
    fieldsSelector: '.lunr-field',
    searchFieldsSelector: '.lunr-search-field',
    searchInputName: 'query'
  };

  const settings = Object.assign({}, defaults, window.lunrConfig);



  /**
   * Extract URL parameters
   */

  const getUriParameter = variable => {
    const query = window.location.search.substring(1);
    const vars = query.split('&');

    for (const v of vars) {
      const pair = v.split('=');

      if (pair[0] === variable) {
        return decodeURIComponent(pair[1].replace(/\+/g, '%20'));
      }
    }
  };


  const insertParameter = (key, value) => {

      key = encodeURI(key); value = encodeURI(value);
      const kvp = document.location.search.substr(1).split('&');
      let i=kvp.length; let x; while(i--) {
          x = kvp[i].split('=');
          if (x[0]==key) {
              x[1] = value;
              kvp[i] = x.join('=');
              break;
          }
      }

      if(i<0) {kvp[kvp.length] = [key,value].join('=');}

      //this will reload the page, it's likely better to store this until finished
      //document.location.search = kvp.join('&');
      //history.pushState(null, null, document.location + kvp.join('&'));
  };



  /**
  *
  */

  const displayResults = results => {
    let html = '';
    let $items;
    let selector;

    if (results) {

      if (results.length) {
        for (const result of results) {
          for (const s of store) {
            if (s[settings.ref] && s[settings.ref] === result.ref) {

              selector = `[data-lunr-ref="${s[settings.ref]}"]`;
              $items = $itemsContainer.find(selector);

              if ($items.length) {
                $items.each((index, element) => {
                  html += element.outerHTML;
                });
              }
            }
          }
        }

        if ($messageContainer) {
          $messageContainer.attr('hidden', 'hidden');
        }

      } else {

        if ($messageContainer) {
          $messageContainer.removeAttr('hidden');
        }

      }

      if ($itemsContainer) {
        $itemsContainer.attr('hidden', 'hidden');
      }

    } else {

      if ($messageContainer) {
        $messageContainer.attr('hidden', 'hidden');
      }
      if ($itemsContainer) {
        $itemsContainer.removeAttr('hidden');
      }

    }

    if ($resultsContainer) {
      $resultsContainer.html(html);
    }
  };



  /**
  * Initialize lunr, definine search fields and data
  */

  //const getLunrInstance = () => lunr(() => {
  const getLunrInstance = () => {

    return lunr(function () {

      if (settings.lang) {
        if (settings.lang.first) {
          this.use(lunr.multiLanguage(settings.lang));
          console.log('this.use(lunr.multiLanguage('+settings.lang+'));');
        } else if (lunr[settings.lang]) {
          this.use(lunr[settings.lang]);
          console.log('this.use(lunr['+settings.lang+']);');
        } else {
          console.log('lunr lang not defined', settings.lang);
        }
      }

      if (settings.ref) {
        this.ref(settings.ref);
      }

      /*
      this.field('collection');
      //this.field('alias');
      this.field('title', { boost: 10 });
      //this.field('author');
      //this.field('category');
      this.field('categories', { boost: 5 });
      this.field('tags', { boost: 2 });
      this.field('content');
      this.field('description');
      this.field('excerpt');
      //this.field('preview');
      */

      /*
      if (options.customFields.length) {
        for (const key in options.customFields) {
          this.field(key);
        }
      }
      */


      // Search in checked fields only
      const checked = [];

      let value;
      if ($fields) {
        $fields.filter(':checked').each((index, element) => {
          value = $(element).attr('data-lunr-field');
          if (value) {
            checked.push(value);
          }
        });
      }
      if (settings.fields && settings.fields.length) {
        for (const field of settings.fields) {
          if (!checked.length || $.inArray(field, checked) !== -1) {
            this.field(field);
          }
        }
      }

      if (store && store.length) {
        store.forEach(function (doc) {
          this.add(doc)
        }, this)
      }

    });

  };



  /**
   * Build search query string from searchbox and selects
   */

  const query = () => {

    let terms = [];
    let $input;
    let field;
    let value;
    let values;

    if ($searchInput.length) {
      value = $searchInput.val();
      if (value) {
        terms.push(value);
      }
    }

    if ($searchFields.length) {
      $searchFields.each((index, element) => {
        $input = $(element);
        field = $input.attr('data-lunr-field');
        //if (typeof $input.select2 !== 'undefined') {
        //  values = $input.select2('val');
        //} else {
        values = $input.val();
        //}
        if (field && values) {
          if (Array.isArray(values)) {
            for (value of values) {
              terms.push(`+${field}:${value}`);
            }
          } else {
            terms.push(`+${field}:${values}`);
          }
        }
      });
    }

    return terms.join(' ');
  };



  /**
   * Perform a new search and display results when input value change
   */

  const search = query => {

    /*
    if (!query) {
      displayResults();
      return false;
    }

    query = query.trim();
    */
    if (query && query !== '') {

      // Get a new instance of Lunr with new fields selection
      idx = getLunrInstance();

      let results = idx.search(query);

      displayResults(results);

      //insertParameter('q', searchTerms);
      //history.pushState(null, null, encodeURI(decodeURI(location.href).replace(/([?&]q=)[^&]*/,'$1' + searchTerms)));
    } else {
      displayResults();
      //history.pushState(null, null, encodeURI(decodeURI(location.href).replace(/([?&]q=)[^&]*/,'')));
    }

  };



  const init = data => {

      if (data) {

        store = data;

        $itemsContainer = $(settings.itemsContainerSelector);
        $resultsContainer = $(settings.resultsContainerSelector);
        $messageContainer = $(settings.messageContainerSelector);
        $searchInput = $(settings.searchInputSelector);
        $fields = $(settings.fieldsSelector);
        $searchFields = $(settings.searchFieldsSelector);
        //$searchInput = document.getElementsByName(searchInputName);

        // Display results matching URL parameters
        const searchTerms = getUriParameter(settings.searchInputName);
        if (searchTerms) {
          search(searchTerms);
          if ($searchInput) {
            $searchInput.attr('value', searchTerms);
          }
        } else {
          search(query());
        }

        $searchInput.on('input', () => {
          search(query());
        });

        $fields.on('change', () => {
          search(query());
        });

        $searchFields.on('change', () => {
          search(query());
        });

      }

  };



  //document.addEventListener("DOMContentLoaded", (event) => {
  // Load the custom store stored in a global variable (if defined)
  // else load the site-wide JSON store
  if (window[settings.storeName]) {
    init(window[settings.storeName])
  } else if (settings.storePath) {
    $.getJSON(settings.storePath, init);
  }
  //});
}))(window.jQuery, window, document);
{% endraw %}
