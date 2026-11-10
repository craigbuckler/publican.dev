---
title: StaticSearch v0.9.2 update
menu: false
description: StaticSearch now parses robots.txt and meta tags according to standards.
author: Craig Buckler
tags: update, tools, robots, StaticSearch
priority: 1.0
pinned: 0.9
hero: images/robots.avif
heroWidth: 1200
heroHeight: 600
heroAlt: search
heroCaption: Image courtesy of <a href="https://unsplash.com/@ekrull">Eric Krull</a>
---

[StaticSearch v0.9.2](https://www.npmjs.com/package/staticsearch) was released on <time datetime="${{ tacs.lib.format.dateISO( '2026-11-10' ) }}">${{ tacs.lib.format.dateHuman( '2026-11-10' ) }}</time>. There should be no breaking changes but you should check your `robots.txt` and `<meta>` tags to ensure pages are indexed -- *or not indexed* -- as you expect.


## Improved `robots.txt` parsing

Previous releases of StaticSearch used simpler `robots.txt` parsing that incorrectly merged `*` and `staticsearch` user agent sections and only processed `Disallow` rules.

StaticSearch v0.9.2 parses `robots.txt` according to the [Google specification](https://developers.google.com/crawling/docs/robots-txt/robots-txt-spec) processing rules:

1. StaticSearch parses any `User-agent: staticsearch` sections.

1. Where none exist, it parses any `User-agent: *` sections (`*` and `staticsearch` sections are **not** merged).

1. You can define any number of sections for the same user agent, e.g.

   {{ `robots.txt` }}
   ```ini
   # both disallow rules applied
   User-agent: staticsearch
   Disallow: /tag/

   User-agent: staticsearch
   Disallow: /news/
   ```

1. You can specify more than one `User-agent` per section, e.g.

   {{ `robots.txt` }}
   ```ini
   # applies to both agents
   User-agent: staticsearch
   User-agent: somebot
   Disallow: /news/
   ```

1. You can set `*` wildcard characters in `Allow` and `Disallow` paths, e.g. `/*/2026*/`.

1. You can set an explicit `Allow` and `Disallow` end of path markers with `$`, e.g. `/news/$`.

1. `Allow` and `Disallow` override each other when they are more explicit (have a longer rule length). `Allow` takes precedence when rule lengths are identical.

   {{ `robots.txt` }}
   ```ini
   # disallow all paths except those starting /news/
   User-agent: staticsearch
   Allow: /news/
   Disallow: /
   ```

The following examples are also shown in the [StaticSearch file indexing documentation](__/tools/staticsearch/search-indexer/#file-indexing-options).


### Example 1

Do not index pages in the `/secret/` and `/personal/` paths:

{{ `robots.txt` }}
```ini
# do not index pages with paths starting
# /secret/ and /personal/
User-agent: *
Disallow: /secret/
Disallow: /personal/
```

### Example 2

Do not index pages in `/personal/`. StaticSearch indexes paths starting with `/secret/` because only the `User-agent: staticsearch` section applies (it is **not** merged with the `*` section):

{{ `robots.txt` }}
```ini
# non-staticsearch agents: ignored
User-agent: *
Disallow: /secret/

# staticsearch agent
# do not index /personal/
User-agent: staticsearch
Disallow: /personal/
```


### Example 3

Do not index the root `/news/` page but permit any sub-pages such as `/news/post1/`. `$` indicates the explicit end of a path:

{{ `robots.txt` }}
```ini
# do not index /news/ page only
# sub-pages of /news/ are indexed
User-agent: *
Disallow: /news/$
```


### Example 4

Do not index pages starting `/news/` except those where the path ends `2026*`. `*` is a wildcard character:

{{ `robots.txt` }}
```ini
# do not index /news/ pages
# unless it's a sub-page ending /2026*/, e.g. /news/2026-01-01/
User-agent: *
Disallow: /news/
Allow: /*/2026*/$
```


## Improved meta tag parsing

Previous releases of StaticSearch only parsed `robots` `noindex` meta tag rules and they could be applied even when in HTML `<!-- -->` comments.

StaticSearch v0.9.2 now parses `robots` `<meta>` tags according to the following rules:

1. `<meta>` tags only apply when `robots.txt` has not blocked page indexing.

1. StaticSearch only processes `<meta>` tags in the HTML `<head>` unless they are commented out with `<!-- -->`.

1. StaticSearch indexes a page unless `content` contains `"noindex"` in the `robots` or `staticsearch` meta tags:

   ```html
   <meta name="robots" content="noindex,nofollow">
   <!-- AND/OR -->
   <meta name="staticsearch" content="noindex">
   ```

1. StaticSearch indexes a page when the more explicit `staticsearch` meta tag sets `"index"` irrespective of the `robots` meta tag:

   ```html
   <!-- not indexed by search engines -->
   <meta name="robots" content="noindex">

   <!-- but is indexed by staticsearch -->
   <meta name="staticsearch" content="index">
   ```

Refer to the [StaticSearch file indexing options documentation](__/tools/staticsearch/search-indexer/#file-indexing-options).


## Get started

The [StaticSearch documentation](__/tools/staticsearch/) provides a [quick start guide](__/tools/staticsearch/quickstart/), and details about the [indexer](__/tools/staticsearch/search-indexer/), [single script tag](__/tools/staticsearch/staticsearch-here/), [web component](__/tools/staticsearch/search-web-component/),[web component](__/tools/staticsearch/search-web-component/), [bind module](__/tools/staticsearch/search-bind-module/), and [JavaScript API](__/tools/staticsearch/search-api/).

StaticSearch works well with Publican sites. The [Publican documentation](__/docs/) provides a [quick start guide](__/docs/quickstart/concepts/), a [detailed set-up guide](__/docs/setup/content/), [API references](__/docs/reference/publican-options/), and [common recipes](__/docs/recipe/) you can use and adapt for your own projects.

<ul class="flexcenter">
  <li><a href="__/docs/quickstart/concepts" class="button">Get started</a></li>
  <li><a href="__/about/donate/" class="button">Donate</a></li>
</ul>
