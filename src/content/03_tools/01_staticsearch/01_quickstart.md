---
title: StaticSearch quickstart
menu: Quickstart
description: How to add a search engine to your static site using StaticSearch.
date: 2025-06-13
modified: 2026-04-15
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

The easiest way to add search facilities to your site is to use the `<static-search>` web component. Add the following snippet to any template, perhaps in the HTML `<header>`:

{{ template excerpt }}
```html
<script type="module" src="/search/staticsearch-component.js"></script>

<static-search title="press Ctrl+K to search">
  <p>search</p>
</static-search>
```

:::aside

The `<script>` tag can go anywhere in your page. It's non-blocking and runs when the DOM is ready -- near the top of the HTML `<head>` is best.

The code above presumes search index code resides in `/search/`. Change the path if you generated it elsewhere.

:::/aside

Put any HTML element inside `<static-search>` to activate search when clicked. The following example uses an icon that links to a search engine when JavaScript fails or is not available:

{{ template excerpt }}
```html
<static-search title="press Ctrl+K to search">

  <a href="https://duckduckgo.com/?q=search%20site:mysite.com">
    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" width="30" height="30">
      <path d="M10 4a6 6 0 1 0 0 12 6 6 0 0 0 0-12Zm-8 6a8 8 0 1 1 14.3 5l5.4 5.3a1 1 0 0 1-1.4 1.4l-5.4-5.4A8 8 0 0 1 2 10Z"></path>
    </svg>
  </a>

</static-search>
```

You'll need to re-build your site after changing its template. You should then [re-run the indexer](#index-a-site) to ensure word indexes are up-to-date.
