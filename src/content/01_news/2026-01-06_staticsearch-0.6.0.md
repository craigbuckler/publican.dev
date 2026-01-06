---
title: StaticSearch v0.6.0 update
menu: false
description: StaticSearch v0.6.0 improves results ordering, can highlight search terms in a page, and supports more languages.
author: Craig Buckler
tags: update, tools, StaticSearch
priority: 1.0
hero: images/search.avif
heroWidth: 1200
heroHeight: 600
heroAlt: search
heroCaption: Image courtesy of <a href="https://unsplash.com/@olloweb">Agence Olloweb</a>
---

[StaticSearch v0.6.0](https://www.npmjs.com/package/staticsearch) was released on <time datetime="${{ tacs.fn.format.dateISO( '2026-01-06' ) }}">${{ tacs.fn.format.dateHuman( '2026-01-06' ) }}</time>. There should be no breaking changes but there are a few new features and results ordering may change.


## Improved results ordering

The latest update:

1. orders results from highest to lowest relevancy as before.

1. If those values match, it orders results from highest to lowest `found` value (a number between `0` and `1` that indicates the proportion of search words found in a page).

1. If those values match, it orders results from newest to oldest date.


## Highlight search words

Setting a `highlight` attribute on the [web component](--ROOT--tools/staticsearch/search-web-component/#web-component-attributes) or [bind module](--ROOT--tools/staticsearch/search-bind-module/#search-result-attributes) scrolls to and highlights the first matching search terms on a results page.

This uses [text fragment links](https://developer.mozilla.org/docs/Web/URI/Reference/Fragment/Text_fragments) which can have issues:

1. searching for "highlight" will return pages containing "highlighted" and "highlighter", but they are not highlighted.

1. A highlighted word could appear outside your main content, such as in a menu.


## Selected search text

When using the [`<static-search>`{language=html} web component](--ROOT--tools/staticsearch/search-web-component/), activating search now selects the current search term as well as focusing the field. This allows quicker searches for a new term.


## Additional language support

StaticSearch removes commonly-used *stop words* considered insignificant to the meaning of text -- such as *"and"*, *"the"*, and *"but"* in English. This can produce better results and v0.6.0 now supports stop words in:

* Afrikaans (`af`)
* Croatian (`hr`)
* Czech (`cs`)
* Danish (`da`)
* Dutch (`nl`)
* English (`en`)
* Estonian (`et`)
* Finnish (`fi`)
* French (`fr`)
* German (`de`)
* Hungarian (`hu`)
* Irish (`ga`)
* Italian (`it`)
* Latvian (`lv`)
* Lithuanian (`lt`)
* Malay (`ms`)
* Norwegian (`no`)
* Polish (`pl`)
* Portuguese (`pt`)
* Romanian (`ro`)
* Slovak (`sk`)
* Somali (`so`)
* Spanish (`es`)
* Swahili (`sw`)
* Swedish (`sv`)
* Turkish (`tr`)
* Zulu (`zu`)


## Smaller payload

Thanks to an [esbuild](https://esbuild.github.io/) update, the minified JavaScript has reduced by a couple of kilobytes to less than 11Kb -- *despite having more code!*


## Get started

The [StaticSearch documentation](--ROOT--tools/staticsearch/) provides a [quick start guide](--ROOT--tools/staticsearch/quickstart/), and details about the [indexer](--ROOT--tools/staticsearch/search-indexer/), [web component](--ROOT--tools/staticsearch/search-web-component/), [bind module](--ROOT--tools/staticsearch/search-bind-module/), and [JavaScript API](--ROOT--tools/staticsearch/search-api/).

StaticSearch works well with Publican sites. The [Publican documentation](--ROOT--docs/) provides a [quick start guide](--ROOT--docs/quickstart/concepts/), a [detailed set-up guide](--ROOT--docs/setup/content/), [API references](--ROOT--docs/reference/publican-options/), and [common recipes](--ROOT--docs/recipe/) you can use and adapt for your own projects.

<ul class="flexcenter">
  <li><a href="--ROOT--docs/quickstart/concepts" class="button">Get started</a></li>
  <li><a href="--ROOT--about/donate/" class="button">Donate</a></li>
</ul>
