---
---
{%- assign collections = site.collections | map: 'label' -%}
window.lunrStore = [
{%- if site.pages.size != 0 -%}{%- for post in site.pages -%}{%- if post.title -%}{%- capture preview -%}
  <div class="{% include partials/post-tag-filter-classes.html post=post %}">
    <input type="radio" id="flipcard_position_{{ post.url | slugify: 'default' }}" name="flipcard_position" value="{{ post.url }}" class="flipcard-position d-none" data-local-storage="false" />
    <div class="card flipcard m-1">
      {%- if post.weight > 0 -%}{%- assign class = 'bg-primary text-white' -%}{%- else -%}{%- assign class = 'bg-dark text-white' -%}{%- endif -%}
      {%- include bootstrap-components/card.html face="front" post=post class="card-position-absolute" img-class="card-img-faded card-img-grayscale" title-class="h2 font-weight-bold" -%}
      {%- include bootstrap-components/card.html face="back" post=post class="bg-white text-dark" -%}
    </div>
  </div>{%- endcapture -%}
  {
    "id": {{ forloop.index0 | jsonify }},
    "layout": {{ post.layout | jsonify }},{%- if post.title -%}
    "title": {{ post.title | jsonify }},{%- endif -%}{%- if post.author -%}
    "author": {{ post.author | jsonify }},{%- endif -%}{%- if post.categories.length -%}
    "categories": {{ post.categories | jsonify }},{%- endif -%}{%- if post.tags.length -%}
    "tags": {{ post.tags | jsonify }},{%- endif -%}{%- for key in collections -%}{%- if post[key].length -%}
    "{{ key }}": {{ post[key] | jsonify }},{%- endif -%}{%- endfor -%}{%- if post.description -%}
    "description": {{ post.description | strip_html | strip_newlines | jsonify }},{%- endif -%}{%- if post.excerpt -%}
    "excerpt": {{ post.excerpt | strip_html | strip_newlines | jsonify }},{%- endif -%}
    "content": {{ post.content | strip_html | strip_newlines | jsonify }},
    "preview": {{ preview | strip_newlines | normalize_whitespace | jsonify }}
  }{%- unless forloop.last -%},{%- endunless -%}{%- endif -%}{%- endfor -%}{%- endif -%}
];
