---
layout: document-list
title: "Produits"
#permalink: /produits/
lang: fr-FR
translation_ref: products.md
categories: [list]
description:
excerpt:
keywords: []
image: "assets/images/pages/default.png"

filters:
  modules: ['modules/filters/search-input.html', 'modules/filters/meta-filters.html', 'modules/filters/user-selection-filter.html']
  keys: [categories, tags, brands]

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
  collection: products
  module: modules/document-list/document-list-flipcard.html

nav_item:
  group: "primary-nav"
  position: 5
  label: "Produits"
  icon:
    class:
---
