---
title: StaticSearch
menu: StaticSearch
description: StaticSearch is a client-side search engine that doesn't require a backend server or database. It can be added to any static site such as those created by Publican.
date: 2025-06-17
priority: 1.0
tags: StaticSearch, tools
---

StaticSearch is a simple search engine you can add to any static website. It uses client-side JavaScript and JSON data files so there is no need for back-end server technologies or a database. To see how it works, click the search icon in the header or press <kbd>Ctrl</kbd> | <kbd>Cmd</kbd> + <kbd>K</kbd>.

StaticSearch works well with Publican sites but can be used on any static website no matter how it's generated. It currently works best on English language sites, but most Western languages can be used.

Using StaticSearch is a two-step process:

1. [Index a directory](--ROOT--tools/staticsearch/search-indexer) containing your static website files. This can be run from the command line or integrated into any Node.js project using CLI, environment variable, or API configuration settings.

1. Add a search facility to your website using a [web component](--ROOT--tools/staticsearch/search-web-component), [bind module](--ROOT--tools/staticsearch/search-bind-module), or the [search API](--ROOT--tools/staticsearch/search-api).
