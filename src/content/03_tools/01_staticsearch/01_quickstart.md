---
title: StaticSearch quickstart
menu: Quickstart
description: How to quickly add a search engine to your static site using StaticSearch.
date: 2025-06-13
priority: 1.0
tags: StaticSearch
---

To use StaticSearch, you must build your static site to a local directory, then:

1. [Index all pages](#index-a-site) to create JavaScript and JSON data files in that directory. Indexing must be run every time the site changes.
1. [Add search functionality to your site](#add-search-functionality-to-your-site). This is done once after the first index.


## Index a site

StaticSearch can be run without installation using `npx`. Assuming your static site has been generated in a sub-directory named `./build/`, run StaticSearch using:

{{ terminal }}
```bash
npx staticsearch
```

This creates a new directory named `./build/search/` containing JavaScript code and word index data.


### Indexing help

For help, enter:

{{ terminal }}
```bash
npx staticsearch --help
```


### Indexing a different directory

If your site is in a different directory, such as `./dist/`, use:

{{ terminal }}
```bash
npx staticsearch --builddir ./dist/ --searchdir ./dist/search/
```


### Omitting HTML pages: `robots.txt`

StaticSearch removes pages from the index when they're disallowed in the `robots.txt` file in the site's root. For example, this disallows indexing for any page with `/video/` or `/docs/` paths:

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

StaticSearch removes pages from the index when a `noindex` value is found in the meta tag:

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


### Indexing specific HTML page elements

StaticSearch examines words contained in your page's `<main>` HTML element. It also any `<nav>` elements (within `<main>`). If this is not suitable, you can set alternative DOM elements using CSS selectors. For example, index everything in `<body>` but exclude all `<header>`, `<footer>`, `<nav>`, and `<div class="related">` elements:

{{ terminal }}
```bash
npx staticsearch --dom 'body' --domx 'header,footer,nav,div.related'
```


## Add search functionality to your site

StaticSearch provides a web component to quickly add the search facilities to your pages. The following snippet could be added to any template, perhaps in the HTML `<header>`:

{{ template excerpt }}
```html
<script type="module" src="/search/staticsearch-component.js"></script>

<static-search title="press Ctrl+K to search">
  <p>search</p>
</static-search>
```

:::aside

The `<script>` tag can be placed anywhere in the page. It's non-blocking and runs when the DOM is ready, so you can put it near the top of the HTML `<head>`.

:::/aside

Any HTML element can be placed inside `<static-search>` to activate search when clicked. The following example uses an icon where a search engine link is used when JavaScript fails or is not available:

{{ template excerpt }}
```html
<static-search title="press Ctrl+K to search">

  <a href="https://duckduckgo.com/?q=search%20site:mysite.com">
    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
      <path d="M10 4a6 6 0 1 0 0 12 6 6 0 0 0 0-12Zm-8 6a8 8 0 1 1 14.3 5l5.4 5.3a1 1 0 0 1-1.4 1.4l-5.4-5.4A8 8 0 0 1 2 10Z"></path>
    </svg>
  </a>

</static-search>
```

After changing the template, you'll need to regenerate the site -- which means you should then [re-run the indexer](#index-a-site) to ensure files are up-to-date.
