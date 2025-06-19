---
title: StaticSearch bind module
menu: Bind module
description: How to bind StaticSearch functionality to any page elements to provide a custom user experience.
date: 2025-06-16
priority: 0.8
tags: StaticSearch, HTML, JavaScript
---

::: aside

You must [run the StaticSearch indexer](--ROOT--tools/staticsearch/search-indexer/) to generate a word indexes before you can add search functionality to your site. This tutorial assumes search index files have been generated in the static site's `/search/` directory.

::: /aside

The JavaScript bind module can automatically or programmatically attach StaticSearch functionality to HTML `<input>` and result elements. It can be used in situations where you want to create your own search widget but utilize StaticSearch functionality including:

* `<input>` debouncing and initiating calls to the [search API](--ROOT--tools/staticsearch/search-api/)
* displaying results
* handling the URL querystring and hash when clicking a result link followed by the back button.

The bind module used by the [web component](--ROOT--tools/staticsearch/search-web-component/) so the processes are similar.

The following example automatically binds `<input>` and results elements using HTML alone:

```html
<!-- include script once on your page -->
<script type="module" src="/search/staticsearch-bind.js"></script>

<!-- define input and result elements -->
<search>

  <input type="search" id="staticsearch_search">
  <div id="staticsearch_result"></div>

</search>
```

:::aside

The `<script>` tag can be placed anywhere in the page. It's non-blocking and runs when the DOM is ready, so you can put it near the top of the HTML `<head>`. It loads 8Kb of JavaScript and associated index data when the user starts a new search.

:::/aside


## Input field attributes

The `<input>` field must use the ID `staticsearch_search` but can have any other HTML attributes set.

The `name` attribute is presumed to be `q` by default and its value is checked on the querystring. You can set any other value, e.g.

```html
<input type="search" id="staticsearch_search" name="query">
```


## Search result attributes

The results element must use the ID `staticsearch_result` but can set optional attributes:

| attribute | description |
|-|-|
| `minscore="<num>"` | only show pages with total relevancy scores of this or above on results |
| `maxresults="<num>"` | show up to this number of pages on the results |


## Overriding HTML templates

The HTML generated when displaying results can be changed using `<template>` elements.


### Search results message

A message such as the following is shown when search results are available:

> 7 found for *"web component"*&hellip;

It uses the HTML code:

```html
<p part="resultmessage">
  <span part="resultcount"></span> found for
  <span part="searchterm"></span>&hellip;
</p>
```

You can override this using a `<template>` with an ID of `staticsearch_resultmessage` anywhere in your HTML page. You must set the `part` attributes `"resultmessage"`, `"resultcount"`, and `"searchterm"` as necessary, e.g.

```html
<template id="staticsearch_resultmessage">

  <p part="resultmessage">
    StaticSearch found
    <span part="resultcount"></span> results
    for <span part="searchterm"></span>:
  </p>

</template>
```

### Search result item

Search results are shown in an ordered list: `<ol part="searchresult">`. The following HTML is used for each list item:

```html
<li part="item">
  <a part="link">
    <h2 part="title"></h2>
    <p part="meta">
      <time part="date"></time> &ndash;
      <span part="words">0</span> words
    </p>
    <p part="description"></p>
  </a>
</li>
```

You can override this using a `<template>` with an ID of `staticsearch_item` anywhere in your HTML page. Set the `part` attributes `"item"`, `"link"`, `"title"`, `meta`, `date`, `words`, and `"description"` as necessary, e.g. show the title but no description, date, or word count in an `<article>`:

```html
<template id="staticsearch_item">

  <li part="item">
    <article>
      <h2 part="title"><a part="link"></a></h2>
    </article>
  </li>

</template>
```

::: aside

The date and word count number are formatted for the active user's locale. This may be different to the language your site uses.

::: /aside


## JavaScript binding

You can programmatically bind StaticSearch functionality to `<input>` and result element using JavaScript. This may be useful if you want further control or you're using a client-side framework to dynamically create content. Consider a page with the following HTML:

```html
<search>

  <input type="search" id="mysearch">
  <div id="myresult"></div>

</search>
```

Bind the elements to StaticSearch using code such as:

```js
import { staticSearchInput, staticSearchResult } from '/search/staticsearch-bind.js';

staticSearchInput( document.getElementById('mysearch') );
staticSearchResult( document.getElementById('myresult') );
```

`staticSearchInput(element)` is passed the input element.

`staticSearchResult(element, options)` is passed the result element and an optional options object with the following properties:

| option property | description |
|-|-|
| `minScore` | only show pages with total word scores of this or above on results |
| `maxResults` | show up to this number of pages on the results |
| `resultElement` | the outer list element (defaults to `ol`) |
| `messageTemplate` | a DOM `<template>` configuring the results message |
| `itemTemplate` | a DOM `<template>` configuring a result item |

Example usage:

```js
// custom results message
const messageTemplate = document.createElement('template');
messageTemplate.innerHTML = `
  <p part="resultmessage">
    <span part="resultcount">0</span> results found for
    <span part="searchterm"></span>:
  </p>
`;

// bind results element
staticSearchResult(
  document.getElementById('myresult'),
  {
    minScore: 5,
    maxResults: 10,
    messageTemplate
  }
);
```


## Re-run the indexer

Once you have added StaticSearch functionality to your static site's templates, you should [re-run the indexer](--ROOT--tools/staticsearch/search-indexer/) to ensure the latest content is indexed.
