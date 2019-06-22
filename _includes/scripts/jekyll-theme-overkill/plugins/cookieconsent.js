{% raw %}

window.addEventListener('load', () => {
  window.cookieconsent.initialise(window.cookieConsentConfig);
});

const d = document;
const s = d.createElement('script');
s.src = '{% endraw %}{{ "/node_modules/cookieconsent/build/cookieconsent.min.js" | relative_url }}{% raw %}';
s.async = true;
s.setAttribute('data-timestamp', +new Date());
(d.head || d.body).appendChild(s);

{% endraw %}
