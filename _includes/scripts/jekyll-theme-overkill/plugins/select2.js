{% raw %}
$(() => {

  const selector = "{% endraw %}{{ include.selector | default: '.select2' }}{% raw %}";

  if ($().select2) {

    {% endraw %}
    {%- if page.plugins.bootstrap != false -%}
    console.log('Select2 default theme', 'bootstrap4');
    $.fn.select2.defaults.set('theme', 'bootstrap4');
    {%- endif -%}
    {%- if lang -%}
    console.log('Select2 default language', '{{ lang }}');
    $.fn.select2.defaults.set('language', '{{ lang }}');
    {%- endif -%}
    {% raw %}

    console.log('Initializing Select2', selector, $.fn.select2.defaults);
    let $input;
    let $inputs = $(selector);
    $inputs.each((index, element) => {
      $input = $(element);
      $input.select2({
        theme: 'bootstrap4',
        language: $('html').attr('lang'),
        placeholder: $input.attr('placeholder'),
        allowClear: Boolean($input.data('allow_clear')),
      });
    });


    // Generate select options from json data
    $inputs.filter('#user_country').select2({
      ajax: {
        //url: '{% endraw %}{{ 'node_modules/country-json/src/country-by-abbreviation.json' | relative_url }}{% raw %}',
        url: '{% endraw %}{{ 'assets/json/countries.json' | relative_url }}{% raw %}',
        dataType: 'json',
        processResults: (data) => {
          data = $.map(data, (obj) => {
            obj.id = obj.id || obj['code_iso_3166-1'];
            obj.text = obj.text || obj['names']['local'][0] || obj['names']['en-US'][0];
            return obj;
          });
          return {
            results: data
          };
        }
      }
    });
console.log('lang inputs', $('#lang, #langs, #language, #languages, #user_language, #user_languages'));
    $inputs.filter('#lang, #langs, #language, #languages, #user_language, #user_languages').select2({
      ajax: {
        url: '{% endraw %}{{ 'assets/json/languages.json' | relative_url }}{% raw %}',
        dataType: 'json',
        processResults: (data) => {
          data = $.map(data, (obj) => {
            obj.id = obj.id || obj['code_iso_639-1'];
            obj.text = obj.text || obj['names']['local'][0] || obj['names']['en-US'][0];
            return obj;
          });
          return {
            results: data
          };
        }
      }
    });

    $inputs.filter('#user_gender').select2({
      ajax: {
        url: '{% endraw %}{{ 'assets/json/genders.json' | relative_url }}{% raw %}',
        dataType: 'json',
        processResults: (data) => {
          data = $.map(data, (obj) => {
            obj.id = obj.id || obj['id'];
            obj.text = obj.text || obj['singular_names'][lang] || obj['singular_names']['en-US'];
            return obj;
          });
          return {
            results: data
          };
        }
      }
    });

    $inputs.filter('#favorite_makes_regions, #favorite_shopping_regions').select2({
      ajax: {
        url: '{% endraw %}{{ 'assets/json/regions.json' | relative_url }}{% raw %}',
        dataType: 'json',
        processResults: (data) => {
          data = $.map(data, (obj) => {
            obj.id = obj.id || obj['id'];
            obj.text = obj.text || obj['names'][lang] || obj['names']['en-US'];
            return obj;
          });
          return {
            results: data
          };
        }
      }
    });

  } else {
    throw new Error('Select2 must be loaded before this script.');
  }

});
{% endraw %}
