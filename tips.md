---
layout: document-list
title: "Tips"
#permalink: /tips/
lang: en-US
translation_ref: tips.md
category: test
categories:
filters:
  keys: [categories, tags]

features:
  card: true
  flipcard: true
  filters: true
  lunr: true
  select2: true
  comments: true
  document_list: true

#bottom_navbar:
#  modules: [modules/bottom_navbar/comments-toggler.html]
  #modules: [modules/bottom_navbar/comments-toggler.html, modules/nav/language-switcher.html]

sidebar:
  modules: ['modules/sidebar/filters.html']

document_list:
  collection: tips
  module: modules/document-list/document-list-accordion.html

nav_item:
  group: "secondary-nav"
  position: 6
  label: "Tips"
  icon:
    class: fas fa-question fa-lg fa-fw

---
