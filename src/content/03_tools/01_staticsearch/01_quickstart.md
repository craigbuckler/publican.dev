---
title: StaticSearch quickstart
menu: Quickstart
description: How to add a search engine to your static site using StaticSearch.
date: 2025-06-13
modified: 2026-06-02
priority: 0.8
tags: StaticSearch, indexer
---

To use StaticSearch, build your static site to a local directory, then:

1. [Index the pages](#index-a-site) to create JavaScript and JSON data files. You must re-run the indexing process every time the site changes.
1. [Add search functionality to your site](#add-search-functionality-to-your-site). It's easiest to do this after indexing the pages for the first time.


## Index a site

You can run StaticSearch without installation using `npx`:

{{ terminal }}
```bash
npx staticsearch
```

The process:

1. looks for static sites built to the subdirectories `./build/`, `./dist/`, `./dest/`, `./out/`, or `./target/`. When none exist, it uses the current working directory.
1. Creates a new directory named `search` inside the build directory containing StaticSearch's client-side code and index data.


### Indexing help

For help, enter:

{{ terminal }}
```bash
npx staticsearch --help
```


### Indexing a different build directory

If your site is in a different directory, such as `./mysite/`, use:

{{ terminal }}
```bash
npx staticsearch --builddir ./mysite/
```

This generates StaticSearch code and indexes in `./mysite/search/`.


### Omitting HTML pages: `robots.txt`

StaticSearch removes pages from the index when they're disallowed by the `robots.txt` file in the site's root. For example, to disallow indexing on any page starting with the path `/video/` or `/docs/`:

{{ `robots.txt` example }}
```txt
User-agent: *
Disallow: /video/

User-agent: staticsearch
Disallow: /docs/
```

You can ignore `robots.txt` with:

{{ terminal }}
```bash
npx staticsearch --ignorerobotfile
```


### Omitting HTML pages: `<meta>` noindex

StaticSearch removes a pages from the index when it contains a `noindex` value in the `robots` meta tag:

{{ HTML `<head>` }}
```html
<meta name="robots" content="noindex">
```

or:

{{ HTML `<head>` }}
```html
<meta name="staticsearch" content="noindex">
```

You can override this with:

{{ terminal }}
```bash
npx staticsearch --ignorerobotmeta
```


### Indexing main content

StaticSearch attempts to locate your page's main content. It looks for an HTML `<main>` element, but reverts to the `<body>` when necessary. It skips content inside blocks such as `<header>`, `<nav>`, and `<footer>`.

If this is not suitable, you can set alternative DOM elements using CSS selectors. For example, index content in `#main`{language=css} but exclude all `<header>`, `<footer>`, `<nav>`, and `<div class="related">` elements inside it:

{{ terminal }}
```bash
npx staticsearch --dom '#main' --domx 'header,footer,nav,div.related'
```


## Add search functionality to your site

The easiest way to add a search facility to your site is a single `<script>` tag. Add the following code to any template, perhaps in the HTML `<header>`:

{{ template excerpt }}
```html
<script type="module" src="/search/staticsearch-here.js"></script>
```

:::aside

The code above presumes search index code resides in `/search/`. Change the path if you generated it elsewhere.

:::/aside

You'll need to re-build your site after changing its template. You should then [re-run the indexer](#index-a-site) to ensure word indexes are up-to-date.

Pages now show a search icon wherever that `<script>` tag appears in the DOM. Click it to open the search dialog and enter terms.
