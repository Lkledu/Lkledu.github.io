{% raw %}

// =============================================================================
// Plugin configs
// =============================================================================

// https://help.disqus.com/developer/javascript-configuration-variables
window.disqus_config = function () {
  this.language = '{% endraw %}{{ lang | split: '-' | first }}{% raw %}';
  this.page.identifier = '{% endraw %}{{ page.url }}{% raw %}';
  this.page.url = '{% endraw %}{{ page.url | absolute_url }}{% raw %}';
  this.page.title = '{% endraw %}{{ page.title | escape }}{% raw %}';
  this.page.category_id = '{% endraw %}{{ page.disqus.category_id }}{% raw %}';
  //this.callbacks.afterRender = [function () {
  //  // your code here
  //}];
};


// https://github.com/aFarkas/lazysizes
window.lazySizesConfig = {% endraw %}{{ site.lazysizes | jsonify }}{% raw %};


// https://cookieconsent.insites.com/documentation/javascript-api/
window.cookieConsentConfig = {% endraw %}{{ site.cookie_consent | jsonify }}{% raw %};
window.cookieConsentConfig.content = {
    "header": "{% endraw %}{{ t.cookieconsent_header }}{% raw %}",
    "message": "{% endraw %}{{ t.cookieconsent_message }}{% raw %}",
    "dismiss": "{% endraw %}{{ t.cookieconsent_dismiss }}{% raw %}",
    "link": "{% endraw %}{{ t.cookieconsent_link }}{% raw %}",
    "allow": "{% endraw %}{{ t.cookieconsent_allow }}{% raw %}",
    "deny": "{% endraw %}{{ t.cookieconsent_deny }}{% raw %}"
  };
window.cookieConsentConfig.window = 'div role="dialog" aria-label="cookieconsent" aria-describedby="cookieconsent:desc" class="cc-window card {{classes}}">{{children}}</div>';
window.cookieConsentConfig.elements = {
    header: '<div class="card-header">{{header}}</div>',
    message: '<span id="cookieconsent:desc" class="cc-message">{{message}}</span>',
    messagelink: '<span id="cookieconsent:desc" class="cc-message">{{message}} <a aria-label="learn more about cookies" tabindex="0" class="cc-link" href="{{href}}" target="_blank">{{link}}</a></span>',
    dismiss: '<a role="button" aria-label="dismiss cookie message" tabindex="0" class="btn-secondary cc-dismiss">{{dismiss}}</a>',
    allow: '<a role="button" aria-label="allow cookies" tabindex="0" class="btn btn-secondary cc-allow">{{allow}}</a>',
    deny: '<a role="button" aria-label="deny cookies" tabindex="0" class="btn btn-secondary cc-deny">{{deny}}</a>',
    link: '<a role="button" aria-label="learn more about cookies" tabindex="0" class="cc-link" href="{{href}}" target="_blank">{{link}}</a>',
    close: '<span aria-label="dismiss cookie message" tabindex="0" class="cc-close">{{close}}</span>',
  };
window.cookieConsentConfig.compliance = {
    'info': '<div class="cc-compliance">{{dismiss}}</div>',
    'opt-in': '<div class="cc-compliance cc-highlight">{{dismiss}}{{allow}}</div>',
    'opt-out': '<div class="cc-compliance cc-highlight">{{deny}}{{dismiss}}</div>',
  };



// =============================================================================
// Script configs
// =============================================================================

window.soundPlayerConfig = {% endraw %}{{ site.sound_player | jsonify }}{% raw %};
{% endraw %}{%- for sound in site.sound_player.sounds -%}{% raw %}
window.soundPlayerConfig.sounds[{% endraw %}{{ forloop.index0 }}{% raw %}].filePath = '{% endraw %}{{ sound.filePath | relative_url }}{% raw %}';
{% endraw %}{%- endfor-%}{% raw %}


window.lunrConfig = {% endraw %}{{ page.lunr | jsonify }}{% raw %};
{% endraw %}{{ unless page.lunr.lang }}{% raw %}
window.lunrConfig.lang = {% endraw %}{{ lang_base | jsonify }}{% raw %};
{% endraw %}{{ endunless }}{% raw %}
{% endraw %}{% if page.lunr.storePath %}{% raw %}
window.lunrConfig.storePath = {% endraw %}{{ page.lunr.storePath | relative_url | jsonify }}{% raw %};
{% endraw %}{% endif %}{% raw %}


window.disqusConfig = {% endraw %}{{ site.disqus | jsonify }}{% raw %};

window.backToTopConfig = {% endraw %}{{ page.back_to_top | jsonify }}{% raw %};

{% endraw %}
