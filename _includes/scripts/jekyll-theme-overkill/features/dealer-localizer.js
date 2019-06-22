{% raw %}
const dealerLocalizerModule = ((() => {
    const baseurl = window.baseurl;
    let dealersData;
    let shopsData;
    let countriesData;
    let ready;


    const addURIParams = ($link, newParams) => {

       // Get URL parts
       const origin = $link.prop('origin');
       const pathname = $link.prop('pathname');
       const search = $link.prop('search');
       const hash = $link.prop('hash');

       // Parse URL params
       const params = $link.prop('search')
       .replace(/^\?/, '')
       .split('&')
       .reduce((params, param) => {
          const pair = param.split('=').map(value => decodeURIComponent(value.replace('+', ' ')));
          params[pair[0]] = pair[1];
          return params;
       }, {});

       // Merge actual and new params
       Object.assign(params, newParams);

       // Combine URL components
       const url = origin + pathname + $.param(params) + hash;

       // Update link href
       $link.attr('href', url);

       console.log('Params updated', params);
       console.log('New URL', url);

    };



    const saveLink = $link => {

        if (!$link.data('default-href') || !$link.data('default-html')) {
            $link.attr('data-default-href', $link.attr('href'));
            $link.attr('data-default-html', $link.html());
        }

    };



    const restoreLink = $link => {

        $link.attr('href', $link.data('default-href'));
        $link.html($link.data('default-html'));

    };



    const updateLink = ($link, href, html) => {

        $link.attr('href', href);
        $link.html(html);

    };



    // Check if the dealer have several websites
    const getDealerData = $link => {

        let dealerData;

        for (const data of dealersData) {
            if ($link.prop('href').match(new RegExp(data.pattern, 'g'))) {
                console.log('Dealer link found', $link.prop('href'), data);
                dealerData = data;
                return false;
            }
        }

        return dealerData;

    };



    const getDealerLinks = ($link, countryCode) => {

    };



    /**
     * Generate link attributs for each local shop
     */
    const getDealerLinks = ($link, countryCode) => {

        const list = {};
        const tld = $link.prop('hostname').match(/(\.[a-z]{2,3})?(\.[a-z]{2,3})$/g);

        // Check if the dealer have some local shops
        // and return the patterns allowing to find links
        const dealerData = getDealerData($link);
        if (dealerData) {


            // Get regex patterns for each local shops
            $.each(shopsData, (host, shopData) => {
                let url;

                if (host.match(new RegExp(dealerData.hostSearchPattern, 'g'))) {
                    if (!countryCode || (shopData && (!shopData.countries || $.inArray(countryCode, shopData.countries) !== -1))) {

                        // Create a local URL using the given pattern
                        url = $link.prop('href').replace(new RegExp($link.prop('hostname'), 'g'), host);
                        url = url.replace(new RegExp(dealerData.urlSearchPattern, 'g'), dealerData.urlReplacePattern);

                        // Add affiliation parameters to query string
                        if (shopData.params) {
                            //url = url + (($link.prop('search')) ? '&' : '?') + shopData.queryString;
                            url = url + (($link.prop('search')) ? '&' : '?') + $.param(shopData.params);
                        }

                        list[host] = {
                            'href': url,
                            'html': host.replace(/^www\./g, '')
                            //'shipping_area_key': shippingAreaKey,
                            //'shipping_area_name': shippingAreaName,
                            //'filters': filters
                        };

                    }
                }

            });

        }

        return list;

    };



    /**
     * Update dealer links with the local shop URL
     */
    const localize = (linksSelector, countryCode) => {
        let $link;
        let list;

        //  Once required data has been loaded
        $.when(ready).done(() => {

            $(linksSelector).each((index, element) => {

                $link = $(element);

                // First save the link href and text in a data attribut
                saveLink($link);

                // Create a dataset for each local shop
                list = getDealerLinks($link, countryCode);
                if (list) {
                    for (const data of list) {
                        updateLink($link, data.href, data.html);
                    }
                } else {
                    restoreLink($link);
                }

            });

        });
    };



    /**
    * Load JSON data
    */
    const loadData = () => $.when(
        $.getJSON(`${baseurl}/assets/json/dealers.json`, json => {
            dealersData = json;
            console.log('Loaded', 'dealers.json');
        }),
        $.getJSON(`${baseurl}/assets/json/shops.json`, json => {
            shopsData = json;
            console.log('Loaded', 'shops.json');
        })/*,
        $.getJSON(baseurl + '/assets/json/countries.json', (json) => {
            countriesData = json;
            console.log('Loaded', 'countries.json');
        })*/
    );



    // Load data imediatly
    ready = loadData();



    return {
        localize
    }
}))();
{% endraw %}
