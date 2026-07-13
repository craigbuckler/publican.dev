---
title: StaticSearch single script tag
menu: Single script tag
description: How to add search functionality to any page using a single script tag.
date: 2025-06-17
modified: 2026-06-02
priority: 0.8
tags: StaticSearch, HTML
---

::: aside

You must [run the StaticSearch indexer](__/tools/staticsearch/search-indexer/) to generate JavaScript code and JSON word indexes before adding search functionality to your site. This tutorial assumes you generated them to the static site's `/search/` directory.

::: /aside

The easiest way to add a search facility to your site is a single `<script>` tag. Add the following code to any template where you want a search icon to appear (perhaps in the page `<header>`):

{{ template excerpt }}
```html
<script type="module" src="/search/staticsearch-here.js"></script>
```

The script automatically loads the [web component](__/tools/staticsearch/search-web-component/) script and updates the DOM at the script's location. It's effectively the same as inserting this code:

```html
<script type="module" src="/search/staticsearch-component.js"></script>

<static-search label="search" title="search Ctrl+K">

  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" width="1em" height="1em">
    <path d="M10 4a6 6 0 1 0 0 12 6 6 0 0 0 0-12Zm-8 6a8 8 0 1 1 14.3 5l5.4 5.3a1 1 0 0 1-1.4 1.4l-5.4-5.4A8 8 0 0 1 2 10Z"/>
  </svg>

</static-search>
```

Refer to the [web component documentation](__/tools/staticsearch/search-web-component/) for template and styling options. The main restriction of the single script is that you cannot set [custom attributes](__/tools/staticsearch/search-web-component/#web-component-attributes) to control search results.


## Re-run the indexer

Once you have added StaticSearch functionality to your static site's templates, you should [re-run the indexer](__/tools/staticsearch/search-indexer/) to ensure word indexes are up-to-date.
