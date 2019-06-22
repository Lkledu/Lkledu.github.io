---
layout: document-list
title: "Posts"
#permalink: /posts/
lang: en-US
translation_ref: posts.md
categories: [list]
filters:
  keys: [categories, tags]
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

sidebar:
  modules: ['modules/sidebar/filters.html']

document_list:
  collection: posts
  module: modules/document-list/document-list-group.html

nav_item:
  group: "primary-nav"
  position: 3
  label: "Posts"
  icon:
    class:
---
