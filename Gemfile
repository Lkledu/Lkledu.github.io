# frozen_string_literal: true

source "https://rubygems.org"
gemspec

ruby RUBY_VERSION
require 'json'
require 'open-uri'
versions = JSON.parse(open('https://pages.github.com/versions.json').read)
gem "github-pages", versions["github-pages"], group: :jekyll_plugins
#gem "github-pages", versions["github-pages"] # bypass dependency check
gem 'wdm', '>= 0.1.1' if Gem.win_platform?
