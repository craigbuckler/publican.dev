---
title: StaticSearch v0.8.0 update
menu: false
description: StaticSearch v0.8.0 provides easier website integration, improved logging, and better keyboard support on Safari.
author: Craig Buckler
tags: update, tools, StaticSearch
priority: 1.0
hero: images/search.avif
heroWidth: 1200
heroHeight: 600
heroAlt: search
heroCaption: Image courtesy of <a href="https://unsplash.com/@olloweb">Agence Olloweb</a>
---

[StaticSearch v0.8.0](https://www.npmjs.com/package/staticsearch) was released on <time datetime="${{ tacs.lib.format.dateISO( '2026-06-01' ) }}">${{ tacs.lib.format.dateHuman( '2026-06-01' ) }}</time>. There should be no breaking changes.


## Single `<script>` tag

After [indexing a site](__/tools/staticsearch/quickstart/#index-a-site), search functionality can be added to any page with a [single `<script>` tag](__/tools/staticsearch/staticsearch-here/):

{{ template excerpt }}
```html
<script type="module" src="/search/staticsearch-here.js"></script>
```

This automatically loads the [web component](__/tools/staticsearch/search-web-component/) and puts a search icon on the page at the script's DOM location. You could add it to the HTML `<header>` in your site's templates.

Refer to the [web component documentation](__/tools/staticsearch/search-web-component/) for template and styling options.


## Improved logging

The [indexer](__/tools/staticsearch/search-indexer/) detects when StaticSearch code is present in HTML pages and provides inclusion instructions when necessary.


## Better minimum font size

The [web component dialog](__/tools/staticsearch/search-web-component/) font size is set to the largest of `1em` or `16px`. You can [override this](__/tools/staticsearch/search-web-component/#css-custom-property-styling) by setting a `--staticsearch-fontsize` custom property in your CSS.


## Safari keyboard support

Pressing <kbd>Esc</kbd> closes the [web component dialog](__/tools/staticsearch/search-web-component/) on Safari when the search field is empty. Other browsers already supported this without JavaScript.


## Powered by StaticSearch

A "powered by StaticSearch" link now appears at the bottom of the [web component dialog](__/tools/staticsearch/search-web-component/). You can style or remove the link using CSS:

```css
static-search::(poweredby) {
  display: none;
}
```


## Miscellaneous updates

Minor changes include:

* a shorter search input debounce time of 300ms
* minor bug fixes and improvements.


## Get started

The [StaticSearch documentation](__/tools/staticsearch/) provides a [quick start guide](__/tools/staticsearch/quickstart/), and details about the [indexer](__/tools/staticsearch/search-indexer/), [single script tag](__/tools/staticsearch/staticsearch-here/), [web component](__/tools/staticsearch/search-web-component/),[web component](__/tools/staticsearch/search-web-component/), [bind module](__/tools/staticsearch/search-bind-module/), and [JavaScript API](__/tools/staticsearch/search-api/).

StaticSearch works well with Publican sites. The [Publican documentation](__/docs/) provides a [quick start guide](__/docs/quickstart/concepts/), a [detailed set-up guide](__/docs/setup/content/), [API references](__/docs/reference/publican-options/), and [common recipes](__/docs/recipe/) you can use and adapt for your own projects.

<ul class="flexcenter">
  <li><a href="__/docs/quickstart/concepts" class="button">Get started</a></li>
  <li><a href="__/about/donate/" class="button">Donate</a></li>
</ul>
