---
title: StaticSearch JavaScript search API
menu: Search API
description: How to use the StaticSearch JavaScript API to create your own custom search functionality.
date: 2025-06-16
modified: 2025-08-08
priority: 0.8
tags: StaticSearch, JavaScript, API
---

::: aside

You must [run the StaticSearch indexer](--ROOT--tools/staticsearch/search-indexer/) to generate JavaScript code and JSON word indexes before adding search functionality to your site. This tutorial assumes you generated them to the static site's `/search/` directory.

::: /aside

You can create whatever input and output functionality or styling you require by directly calling the StaticSearch JavaScript API. You can use it when the [web component](--ROOT--tools/staticsearch/search-web-component/) and [bind module](--ROOT--tools/staticsearch/search-bind-module/) do not provide the features you require.


## `staticsearch.find()` method

The `staticsearch.find(<term>)` method returns an array of results for a specific search term:

```js
import { staticsearch } from '/search/staticsearch.js';

const result = await staticsearch.find('my search query');
```

:::aside

This example uses ES6 module code. It loads 6Kb of JavaScript and associated index data when a searching for a term.

:::/aside

`result` will hold an array of page objects sorted into highest to lowest relevancy order. Each object has the properties:

| property | description |
|-|-|
| `id` | page ID (number) |
| `url` | page URL from the root path (string) |
| `title` | page title/H1 (string) |
| `date` | page date in `YYYY-MM-DD` format (string) |
| `words` | page's number of words (number) |
| `relevancy` | search relevancy score (number) |
| `found` | the proportion of search words found on the page (`0.0` to `1.0`) |

Example result:

```json
[
  {
    "id": 42,
    "url": "/news/search-engine-optimization/",
    "title": "Do Publican sites rank better?",
    "description": "Do static sites rank better in search engines?",
    "date": "2025-01-31",
    "words": 1234,
    "relevancy": 21,
    "found": 1
  },
  {
    "id": 55,
    "url": "/docs/recipe/feeds/txt-sitemap/",
    "title": "Create a text sitemap",
    "description": "How to output a list of all pages for search engines.",
    "date": "2025-02-01",
    "words": 954,
    "relevancy": 12,
    "found": 0.5
  },
  {
    "id": 22,
    "url": "/news/site-performance/",
    "title": "Are static sites fast?",
    "description": "Static sites typically perform better than others.",
    "date": "2025-02-22",
    "words": 222,
    "relevancy": 2,
    "found": 0.5
  }
]
```


## `staticsearch.fetchTimeout` property

StaticSearch permits up to five seconds for loading an index file. This should be adequate for most sites, but you can specify any `.fetchTimeout` limit in milliseconds, e.g.

```js
// set fetch timeout to 10 seconds
staticsearch.fetchTimeout = 10000;
```


## StaticSearch events

Whenever a search runs, StaticSearch triggers events on the page's `document` object. This may be useful when:

* you'd rather not [`await` the `.find()` Promise](#staticsearchfind-event)
* you want to show the same search result in more than one element.


### `staticsearch:find` event

This event triggers when `staticsearch.find()` runs and before any results are available. The search term is available in the event object's `detail.search` property:

```js
// search started
document.addEventListener('staticsearch:find', e => {

  // get search term
  const { search } = e.detail;

  console.log(`searching for "${ search }"`);

});
```


### `staticsearch:result` event

This event triggers when search results are ready. The search term and results array are available in the event object's `detail.search` and `detail.result` properties:

```js
// search result available
document.addEventListener('staticsearch:result', e => {

  // get search term and result array
  const { search, result } = e.detail;

  console.log(`${ result.length } pages found for "${ search }"`);

});
```


## Re-run the indexer

Once you have added StaticSearch functionality to your static site's templates, you should [re-run the indexer](--ROOT--tools/staticsearch/search-indexer/) to ensure word indexes are up-to-date.
