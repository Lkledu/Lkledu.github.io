---
#
# By default, content added below the "---" mark will appear in the home page
# between the top bar and the list of recent posts.
# To change the home page layout, edit the _layouts/home.html file.
# See: https://jekyllrb.com/docs/themes/#overriding-theme-defaults
#
layout: home
lang: fr-FR
translation_ref: index.md

description: >
  Écrivez une description géniale pour votre nouveau site ici. Vous pouvez éditer cette ligne dans _config.yml. Il apparaîtra dans votre méta de tête de document (pour les résultats de recherche Google) et dans votre description de site feed.xml.

features:
  card: true
  flipcard: true
  lunr: true
  document_list: true
  social_icons: true

body:
  class: 'pt-0'

top_navbar:
  modules: ['modules/navbar/navbar-brand.html']
  #position: ''

action_nav:
  modules: [modules/bottom_navbar/comments-toggler.html, modules/bottom_navbar/tip-link.html, modules/bottom_navbar/settings-toggler.html]
  #class: 'navbar navbar-light bg-light d-flex flex-row justify-content-between w-100 animated fadeInUp'
  #position: 'fixed-bottom'

sidebar:
  modules: ['modules/sidebar/vertical-primary-nav.html']

document_list:
  module: 'modules/document-list/document-list-group.html'

jumbotron:
  title: 'Salut à tous!'
  lead: 'Voici le thème le plus abusé pour Jekyll.'
  description:
  class:
  button:
    class: 'btn btn-primary btn-lg'
    text: 'Continer'
    href: '#next'
    icon:
      class: 'fas fa-chevron-right fa-lg mr-1'

nav_item:
  group: "primary-nav"
  position: 1
  label: "Accueil"
  icon:
    class: 'fa-home'
---
