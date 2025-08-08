---
title: StaticSearch bind module
menu: Bind module
description: How to bind StaticSearch functionality to any page elements to provide a custom user experience.
date: 2025-06-16
modified: 2025-08-08
priority: 0.8
tags: StaticSearch, HTML, JavaScript
---

::: aside

You must [run the StaticSearch indexer](--ROOT--tools/staticsearch/search-indexer/) to generate JavaScript code and JSON word indexes before adding search functionality to your site. This tutorial assumes you generated them to the static site's `/search/` directory.

::: /aside

The JavaScript bind module can automatically or programmatically attach StaticSearch functionality to HTML `<input>` and result elements. Use it in situations where you want to create your own search widget using StaticSearch functionality including:

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

You can put the `<script>` tag anywhere in your page. It's non-blocking and runs when the DOM is ready -- near the top of the HTML `<head>` is best. It loads 8Kb of JavaScript and associated index data when the user starts a new search.

:::/aside


## Input field attributes

The `<input>` field must use the ID `staticsearch_search` but can have any other HTML attributes set.

StaticSearch presumes the `name` is `q` and checks its value on the querystring. You can set any other value, e.g.

```html
<input type="search" id="staticsearch_search" name="query">
```


## Search result attributes

The results element must use the ID `staticsearch_result` but can set optional attributes:

| attribute | description |
|-|-|
| `minfound="<num>"` | only show pages containing at least this proportion of search words (`0.0` to `1.0`) |
| `minscore="<num>"` | only show pages with total relevancy scores of this or above on results |
| `maxresults="<num>"` | show up to this number of pages on the results |

Search results provide a `found` value indicating the percentage of search words found on a page, e.g. two of four search words is `0.5`.

* setting `minfound="0"`{language=html} (the default) is a *logical OR*. A page appears in results when it contains ANY of the search words.

* setting `minfound="1"`{language=html} is a *logical AND*. A page appears in results when it contains ALL the search words.

* setting `minfound="0.5"`{language=html} means a page appears in results when it contains at least half of the search words.

Pages still appear in `relevancy` order, but higher `minfound` values will reduce the number of results.


## Overriding HTML templates

You can change the HTML shown when displaying results using `<template>` elements.


### Search results message

When search results are available, you'll see a message such as:

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

An ordered list (`<ol part="searchresult">`) contains search results. Each page result uses the HTML:

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

The user's locale determines the date and word count formats. This may be different to the language your site uses.

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

Pass the `<input>` element to `staticSearchInput(element)`.

Pass the result element and an optional options object to `staticSearchResult(element, options)`. The option object properties:

| option property | description |
|-|-|
| `minFound` | only show pages containing at least this proportion of search words (default `0`) |
| `minScore` | only show pages with total relevancy scores of this or above on results (no minimum) |
| `maxResults` | show up to this number of pages on the results (no maximum) |
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
    minFound: 0.5,  // at least half the search terms must be on a page
    minScore: 5,    // minimum relevancy score
    maxResults: 10, // maximum number of results
    messageTemplate // DOM <template> defined above
  }
);
```


## Re-run the indexer

Once you have added StaticSearch functionality to your static site's templates, you should [re-run the indexer](--ROOT--tools/staticsearch/search-indexer/) to ensure word indexes are up-to-date.
