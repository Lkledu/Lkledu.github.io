---
layout: document-list
title: "Pages"
#permalink: /pages/
lang: en-US
translation_ref: pages.md
categories: [list]
filter: [categories, tags]
image: "assets/images/pages/default.png"

plugins:
  lunr: true
  select2: true
features:
  card: true
  flipcard: true
  filters: true
  lunr: true
  select2: true
  document_list: true

sidebar:
  modules: ['modules/sidebar/filters.html']

document_list:
  #collection:
  module: modules/document-list/document-list-flipcard.html

nav_item:
  group: "primary-nav"
  position: 2
  label: "Pages"
  icon:
    class:
---
