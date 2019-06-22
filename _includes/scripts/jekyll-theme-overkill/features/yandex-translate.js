{% raw %}
/**
* Translate the page using the Yandex translate API
* @module
* @see https://tech.yandex.com/translate/
*/
var YandexTranslate = (() => {
    /*eslint-enable no-unused-vars*/
    'use strict';

    /**
    * Make a request to the Yandex translate API
    * @param {String} url Mediawiki base URL
    * @param {Object} params Request parameters
    * @return {Object} jQuery promise
    * @see https://tech.yandex.com/translate/doc/dg/reference/translate-docpage/
    */
    var request = (params) => {

        params = Object.assign({}, {
            key: 'trnsl.1.1.20170126T174835Z.60d9a0f54ac44aef.fc3b4dab14cf7c81caf5fe57769a769ab427a872',
            lang: $('html').attr('lang') || 'en-US', // en | fr-en
            format : 'plain' // plain | html
            //text: '', // some text to translate
            //options: 1, // automatically detected language
            //callback: '' // Callback function
        }, params);

        var url = 'https://translate.yandex.net/api/v1.5/tr.json/translate';

        console.log('Yandex translate request', url + '?' + $.param(params));

        return $.ajax({
            type: 'GET',
            url: url,
            data: params,
            contentType: 'application/json; charset=utf-8',
            async: true,
            dataType: 'jsonp',
            headers: {
                'Api-User-Agent': document.apiUserAgent || location.hostname + '/1.0',
                'Origin': document.origin || location.origin
                //'Content-Type': 'application/json; charset=UTF-8'
            },
            //timeout: 5000, // Uncaught ReferenceError:
            success: (data, textStatus, jqXHR) => {
                console.log('Yandex translate request', 'done');
                if (data.warnings) {
                    console.warn(data.warnings.main['*']);
                }
            },
            error: (errorMessage) => {
                console.warn('Yandex translate request', errorMessage, url + '?' + $.param(params));
            }
        });

    };

    $(() => {

        var params = {
            format: 'html'
        };

        params.text = $('html').replace(/^.*?<body[^>]*>(.*?)<\/body>.*?$/i,"$1");
        var lang = '{{ page.lang }}';
        if (lang && lang !== 'en') {
            params.format = lang + '-en';
        }
        params.format = 'en-fr';

        request(params).done((html) => {
            $('body').html(html);
        });

    });

});


});

})();
{% endraw %}
