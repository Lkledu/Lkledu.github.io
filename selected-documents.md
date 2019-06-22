---
layout: document-list
title: "My selection"
#permalink: /posts/
lang: en-US
translation_ref: selected-documents.md
#categories: [list]
#filters:
#  keys: [categories, tags]
description:
excerpt:
keywords: []
image: "assets/images/pages/default.png"

plugins:
  lunr: true
  select2: true
features:
  #card: true
  #flipcard: true
  filters: true
  lunr: true
  select2: true
  document_list: true
  selection: true

sidebar:
  modules: ['modules/sidebar/filters.html']

document_list:
  #collection: posts
  module: modules/document-list/document-list-group.html

nav_item:
  group: "primary-nav"
  position: 5
  label: "My selection"
  icon:
    class:
---
