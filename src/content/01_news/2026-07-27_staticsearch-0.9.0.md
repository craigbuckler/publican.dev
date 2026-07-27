---
title: StaticSearch v0.9.0 update
menu: false
description: StaticSearch now handles alternative HTML file extensions, keywords meta tags, compound words, and zero-weighted word scores.
author: Craig Buckler
tags: update, tools, StaticSearch
priority: 1.0
pinned: 0.9
hero: images/binoculars.avif
heroWidth: 1200
heroHeight: 600
heroAlt: search
heroCaption: Image courtesy of <a href="https://unsplash.com/@elijahjmears">Elijah Mears</a>
---

[StaticSearch v0.9.0](https://www.npmjs.com/package/staticsearch) was released on <time datetime="${{ tacs.lib.format.dateISO( '2026-07-27' ) }}">${{ tacs.lib.format.dateHuman( '2026-07-27' ) }}</time>. There should be no breaking changes but search results should improve (or at least differ) slightly.


## Index files by extension

A new [`--indexext` | `SITE_INDEXEXT` | `.siteIndexExt` option](__/tools/staticsearch/search-indexer/#file-indexing-options) option allows you to define the extension of files you want to index. The default matches any file with an extension containing `.htm` -- such as `.html`. You could set it to `.php` for PHP files or `.` for any file with an extension.

:::aside

StaticSearch always attempts to parse HTML content irrespective of the file extension. You *may* be able to index `.php` files if they contain HTML with chunks of PHP server code in [document sections](__/tools/staticsearch/search-indexer/#document-indexing-options) that are not indexed.

:::/aside


## Parse `keywords` meta tags

StaticSearch now indexes keywords in the HTML `<head>` keywords `<meta>` tag with a default weight of `1`:

{{ example HTML }}
```html
<meta name="keywords" content="index, some, other, words">
```

This allows you to index related words that do not necessarily appear in the main page content.

Google ignores the `keywords` meta tag because it was often misused for keyword stuffing. You can ignore it by setting the [`--weightkeywords` | `WEIGHT_KEYWORDS` | `.wordWeight.keywords` option](__/tools/staticsearch/search-indexer/#word-indexing-options) to zero:

{{ terminal }}
```bash
staticsearch --weightkeywords 0
```


## Omit zero-weighted words

As [shown above](#parse-keywords-meta-tags), words in sections assigned a [zero weight](__/tools/staticsearch/search-indexer/#word-indexing-options) are not added to the search index.

Previous releases indexed words with a zero score. A page would appear toward the bottom of results but it was not omitted.


## Improved handling of compound words

Compound words with hyphens, underscores, or apostrophes are now indexed as a single entity. For example, *"co-worker's"* is indexed as *"coworkers"* and *"my_variable"* is indexed as *"myvariable"*. Users can enter any variation to search for pages containing the word.

In previous releases, *"co-worker's"* was indexed as *"co"* and *"workers"* which could lead to less meaningfull results.


## Get started

The [StaticSearch documentation](__/tools/staticsearch/) provides a [quick start guide](__/tools/staticsearch/quickstart/), and details about the [indexer](__/tools/staticsearch/search-indexer/), [single script tag](__/tools/staticsearch/staticsearch-here/), [web component](__/tools/staticsearch/search-web-component/),[web component](__/tools/staticsearch/search-web-component/), [bind module](__/tools/staticsearch/search-bind-module/), and [JavaScript API](__/tools/staticsearch/search-api/).

StaticSearch works well with Publican sites. The [Publican documentation](__/docs/) provides a [quick start guide](__/docs/quickstart/concepts/), a [detailed set-up guide](__/docs/setup/content/), [API references](__/docs/reference/publican-options/), and [common recipes](__/docs/recipe/) you can use and adapt for your own projects.

<ul class="flexcenter">
  <li><a href="__/docs/quickstart/concepts" class="button">Get started</a></li>
  <li><a href="__/about/donate/" class="button">Donate</a></li>
</ul>
