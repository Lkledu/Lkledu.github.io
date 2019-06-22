
{%- assign config = page.features -%}

{%- assign lang = page.lang | default: site.lang | default: "en-US" | replace: '_', '-' -%}
{%- assign lang_base = lang | split: '-' | first  | downcase -%}
{%- assign t = site.data.locales[lang] | default: site.data.locales['en-US'] -%}

{%- include scripts/jekyll-theme-overkill/config.js -%}

{%- if config.local_storage != false -%}
{%- include scripts/jekyll-theme-overkill/features/local-storage.js -%}
{%- endif -%}

{%- if config.terms != false -%}
{%- include scripts/jekyll-theme-overkill/helpers/base64.js -%}
{%- endif -%}

{%- if config.index != false -%}
{%- include scripts/jekyll-theme-overkill/modules/article-index.js -%}
{%- endif -%}

{%- if config.progress != false -%}
{%- include scripts/jekyll-theme-overkill/modules/progress.js -%}
{%- endif -%}

{%- if config.filters != false and config.lunr == false -%}
{%- include scripts/jekyll-theme-overkill/modules/filters.js -%}
{%- endif -%}

{%- if config.sound_player != false -%}
{%- include scripts/jekyll-theme-overkill/features/sound-player.js -%}
{%- endif -%}

{%- if config.speech_synthesis != false -%}
{%- include scripts/jekyll-theme-overkill/features/speech-synthesis.js -%}
{%- endif -%}

{%- if config.page_transition != false -%}
{%- include scripts/jekyll-theme-overkill/features/page-transition.js -%}
{%- endif -%}

{%- if config.smooth_scroll != false -%}
{%- include scripts/jekyll-theme-overkill/features/smooth-scroll.js -%}
{%- endif -%}

{%- if config.back_to_top != false -%}
{%- include scripts/jekyll-theme-overkill/modules/back-to-top.js -%}
{%- endif -%}



{%- if config.bootstrap != false -%}
{%- include scripts/jekyll-theme-overkill/plugins/bootstrap.js -%}
{%- endif -%}

{%- if config.select2 != false -%}
{%- include scripts/jekyll-theme-overkill/plugins/select2.js -%}
{%- endif -%}

{%- if config.lunr != false -%}
{%- include scripts/jekyll-theme-overkill/plugins/lunr.js -%}
{%- comment -%}
{%- include scripts/jekyll-theme-overkill/plugins/lunr.js store_name='lunrStore' store_path='/assets/data/documents.json' ref_key='id' search_input_selector='#search-input' items_container_selector='#search-items' results_container_selector='#search-results' message_container_selector='#search-message' -%}
{%- endcomment -%}
{%- endif -%}

{%- if config.lazysizes != false -%}
{%- include scripts/jekyll-theme-overkill/plugins/lazysizes.js -%}
{%- endif -%}

{%- if config.cookie_consent != false -%}
{%- include scripts/jekyll-theme-overkill/plugins/cookieconsent.js -%}
{%- endif -%}

{%- if config.disqus != false and site.disqus.shortname -%}
{%- include scripts/jekyll-theme-overkill/plugins/disqus.js -%}
{%- endif -%}

{%- if config.google_analytics != false -%}
{%- include scripts/jekyll-theme-overkill/plugins/google-analytics.js -%}
{%- endif -%}

{%- comment -%}
{%- if config.browser_update != false -%}
{%- include scripts/jekyll-theme-overkill/plugins/browser-update.js -%}
{%- endif -%}
{%- endcomment -%}


{%- if config.terms != false -%}
{%- include scripts/jekyll-theme-overkill/layouts/terms.js -%}
{%- endif -%}

{%- if config.flipcard != false -%}
{%- include scripts/jekyll-theme-overkill/modules/flipcard.js -%}
{%- endif -%}
