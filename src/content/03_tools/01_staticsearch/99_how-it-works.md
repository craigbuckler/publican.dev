---
title: How StaticSearch works
menu: How StaticSearch works
description: An overview of how StaticSite indexes web pages and provides client-side only search engine functionality.
date: 2025-06-13
modified: 2026-01-06
priority: 0.8
tags: StaticSearch, JavaScript
---

This page explains how StaticSite works. It's not essential to read or understand, but it may help you create more effective search indexes for your site.


## Overview

StaticSearch's simple code and data format ensure search remains fast and lightweight.

It processes unique words in HTML files -- *not the full content*. When you search for *"Star Wars"*, it finds all pages containing the words *"star"* OR *"wars"*. It does not recognise the context or know the words are together, but pages with *"Star Wars"* in titles, descriptions, and inbound links will have a higher relevancy score and appear toward the top of results.

SiteSearch requires:

* 11Kb of JavaScript and 4Kb of CSS for the [web component](#staticsearchcomponentjs-web-component). Sites using the [bind module](#staticsearchbindjs-bind-module) require 8Kb of JavaScript. Sites directly using the [search API](#staticsearchjs-search-api) require less than 6Kb of JavaScript.

* Indexing a typical 100 page site takes less than one second and generates 100Kb of word index data.

* Indexing a typical 1,000 page site takes less than six seconds and generates 800Kb of word index data.

Index data is incrementally loaded on demand as you search for different words. The browser caches index data ([IndexedDB](https://www.npmjs.com/package/pixdb)) so results appear faster the more searches you do.


### StaticSearch vs other engines

Static sites cannot easily provide search facilities because there's no back-end framework, language, or database.

You can integrate a third-party search service such as [Alogia](https://www.algolia.com/), [AddSearch](https://www.addsearch.com/), or [Google's Programmable Search Engine](https://programmablesearchengine.google.com/). These index your site and provide a search API, but have an ongoing cost, and can take a while to update.

JavaScript-only search options such as [Lunr](https://lunrjs.com/) require you to pass content in specific formats. Every page then has a full index of your site, so the payload can become large as your site grows.

[pagefind](https://pagefind.app/) analyses your built site and creates WASM binary indexes. Unfortunately, it can require some HTML configuration, requires considerable JavaScript code, and has problems with [Content Security Policies](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP) (and Safari compatibility).

StaticSearch is easier to use, is fully compatible with Publican sites, but works with any other static site generator. It:

1. quickly indexes built pages (like pagefind)
1. requires no special HTML markers or content changes
1. is pure JavaScript and JSON without any CSP issues, and
1. has a small payload.

It doesn't offer advanced features such as phrase matching, but search results are generally good.


## Indexer processing

This section explain how the indexer processes HTML files to find and index words.


### 1. Find all indexable HTML pages

The indexer locates every HTML file in every sub-directory of the `build/` directory and determines its URL slug. It checks `robots.txt` `Disallow` rules and removes files as necessary.

All file content is then loaded, but it removes pages with a `noindex` meta tag.


### 2. Parse HTML content

The indexer processes each page's HTML code to find the title, description, date, and word count.

It identifies the main content by locating DOM node(s) to index and remove. Within this, the indexer also looks for content in:

* heading `h2` to `h6` tags
* emphasised `<strong>`, `<b>`, `<em>`, and `<i>` tags
* image `alt` attributes, and
* external `<a>` links to other pages.


### 3. Process words

StaticSearch processes words found using the following rules:

1. It removes punctuation, normalizes characters (**&eacute;** becomes **e**), and converts words to lowercase.

1. A Porter *"stemming"* algorithm reduces English words to their root or base form. The words "process", "processes", "processing", "processed", etc. effectively become the same.

   Stemming for other languages may appear in future releases.

1. It removes stop words. These are common words considered insignificant to the meaning of text -- such as *"and"*, *"the"*, and *"but"* in English.

   StaticSearch supports Afrikaans (`af`), Croatian (`hr`), Czech (`cs`), Danish (`da`), Dutch (`nl`), English (`en`), Estonian (`et`), Finnish (`fi`), French (`fr`), German (`de`), Hungarian (`hu`), Irish (`ga`), Italian (`it`), Latvian (`lv`), Lithuanian (`lt`), Malay (`ms`), Norwegian (`no`), Polish (`pl`), Portuguese (`pt`), Romanian (`ro`), Slovak (`sk`), Somali (`so`), Spanish (`es`), Swahili (`sw`), Swedish (`sv`), Turkish (`tr`), and Zulu (`zu`) stop words. Stop words for other languages may appear in future releases.

1. It crops words to a maximum of 7 letters.

1. It removes duplicate words from each set.


### 4. Calculate word relevancy scores

Each word receives a score according to where it's found:

| word location | score |
|-|-|
| title / h1 heading | 10 |
| description | 8 |
| h2 heading | 6 |
| h3 heading | 5 |
| h4 heading | 4 |
| h5 heading | 3 |
| h6 heading | 2 |
| emphasis (bold/italic) | 2 |
| main content | 1 |
| alt tags | 1 |
| inbound link | 5 |

Consider a page with the words "Star Wars" in the title, description, content, `<h2>`{language=html}, and an `<em>`{language=html}. The word *"star"* scores:

10 + 8 + 6 + 2 + 1 = 27

Other pages in the site add another 5 points when they use *"star"* in a link, e.g. `<a href="/star-wars/">about Star Wars</a>`{language=html}. Assuming four inbound links, the total is:

( 4 &times; 5 ) + 27 = 47


### 5. Write word index files

Once processed, the indexer has a list of words, and one or more pages where that word appears. Each of those pages has a relevancy score. For example:

| word | page slug | relevancy score |
|-|-|-|
| star | `/star-wars/` | 47 |
| star | `/the-sun/` | 21 |
| star | `/hollywood/` | 5 |
| wars | `/star-wars/` | 47 |
| wars | `/hollywood/` | 1 |

*(Note that pages are allocated a numeric ID so index files are as small as possible.)*

StaticSearch writes word index files to the `/search/data/` directory inside the static site. Index filenames use the first two characters of a word:

`aa.json`, `ab.json`, `ac.json` ... etc ... `zx.json`, `zy.json`, `zz.json`

A `pu.json` file would provide information about words such as "publican", "publicize", "publish", "puddle", "puffin", etc. The words *"star"* and *"wars"* appear in the data files `st.json` and `wa.json` respectively.

Some files are not generated -- *few words begin "zz"* -- and files such as `co.json` and `de.json` will probably contain more data than `qq.json`.


### 6. Write an `index.json` file

StaticSearch creates a single `/search/index.json` file that contains:

1. an array of all pages in numerical (ID) order with the slug, title, description, date, and word count
1. an array of all generated word indexes such as *"st"* and *"wa"*
1. an array of stop words when available.


### 7. Write JavaScript and CSS files

StaticSearch adds the following (vanilla) JavaScript and CSS files to the `/search/` directory inside the static site:

| file | description |
|-|-|
| `staticsearch.js` | the core search API functionality |
| `stem/stem_*.js` | language-specific word stemming functions used by the API |
| `staticsearch-bind.js` | binds search functionality to an input and results elements (it uses the API) |
| `staticsearch-component.js` | provides `<static-search>` web component (it uses the bind module and API) |
| `css/component.css` | web component styling |

It embeds information in these files including:

* the language/stem file
* the word cropping value
* a *version* hash generated from all word index data. This identifies whether something has changed since the last indexer run.


## Client-side search functionality

This sections explains the client-side search processing.


### `staticsearch.js` search API

After the DOM has loaded, `staticsearch.js` checks the current version hash. If it doesn't exist or has changed, it downloads `index.json` and initializes a client-side [IndexedDB](https://www.npmjs.com/package/pixdb) database with the following stores:

| store | description |
|-|-|
| `cfg` | the current version hash and list of stop words |
| `page` | a list of all indexed pages with their numeric ID, title, description, date, and word count |
| `file` | the list of word `data` index files and whether they've been loaded |
| `index` | each word, the page ID(s) where it appears, and the associated relevancy score |

Nothing else occurs until the asynchronous `.find()` method receives a search string such as *"Star Wars"*. The method:

1. Triggers a `staticsearch:find` event on the document to indicate search has started.

1. [Processes the words in the same way as the indexer](#a-3-process-words) to get a list of unique stemmed words with stop words removed.

1. For each word -- such as *"star"* -- it:

   * checks the `file` store to see if the word index data was previously loaded (`data/st.json`). If necessary, it loads that file and puts every word (beginning with *"st"*) into the `index` store.

   * attempts to locate the word in the `index` store. It adds associated page IDs and relevancy scores to a list of page and score metrics.

1. It creates a result array containing a list of page objects with their URL, title, description, date, word count, total `relevancy` score, and the proportion of search words `found`. It sorts the array by:

   * highest to lowest `relevancy` order, then
   * highest to lowest `found` order, then
   * newest to oldest `date` order.

1. Triggers a `staticsearch:result` event on the document to indicate a search result is available.

1. Returns the results array.

Assuming the [index generated above](#a-5-write-word-index-files), a search for *"Star Wars"* returns an array such as:

{{ example result }}
```json
[
  {
    "id": 77,
    "url": "/star-wars/",
    "title": "Star Wars movie",
    "description": "About Star Wars, the 1977 movie directed by George Lucas.",
    "date": "2025-01-31",
    "words": 1234,
    "relevancy": 94,
    "found": 1
  },
  {
    "id": 55,
    "url": "/the-sun/",
    "title": "The sun: the star in our solar system",
    "description": "Information about our closest star.",
    "date": "2025-02-01",
    "words": 954,
    "relevancy": 21,
    "found": 0.5
  },
  {
    "id": 22,
    "url": "/hollywood/",
    "title": "Hollywood",
    "description": "Hollywood is the location of the US movie industry",
    "date": "2025-01-31",
    "words": 222,
    "relevancy": 21,
    "found": 0.5
  }
]
```


### `staticsearch-bind.js` bind module

The bind module can automatically or programmatically attach StaticSearch functionality to HTML elements. It handles:

* `<input>` debouncing and initiating calls to the [search API](#staticsearchjs-search-api)
* displaying results according to `minFound`, `minScore`, `maxResults`, and `highlight` settings
* URL querystring and hash functionality when clicking a result link followed by the browser's back button.

When the page loads, the script looks for elements with the IDs `staticsearch_search` and `staticsearch_result`. If found, the nodes are passed to `staticSearchInput()` and `staticSearchResult()` accordingly.

The `staticSearchInput( field )` function checks the field is not already handled then:

1. Fetches the `<input>` `name` attribute (`q` is used by default) and checks whether a value has been set on the URL querystring or previously stored in `sessionStorage`.

1. The field is monitored for changes, but debounced to ensure no further changes occur for 500 milliseconds.

When either event arises, the input value is stored in `sessionStorage` and passed `staticsearch.find()` to start a search. Note that `staticSearchInput()` does not process the result of the search query.


The `staticSearchResult( element )` function checks the element is not already handled then:

1. Defines the message template from a passed value, an element with the ID `staticsearch_resultmessage`, or a default DOM fragment.

1. Defines the result item template from a passed value, an element with the ID `staticsearch_item`, or a default DOM fragment.

1. An event handler listens for `staticsearch:result` events, parses the incoming result, and updates the results element. The first time this happens after a page load, it checks whether a `#hash` is set on the URL and scrolls to that result.

1. Another event handler triggers when any result is clicked. It updates the URL querystring and hash so clicking back shows the search result.


### `staticsearch-component.js` web component

This script provides functionality for the `<static-search>`{language=html} web component. It handles:

1. Creation of a shadow DOM and loading a stylesheet.

1. Creating a `<dialog>`{language=html} element with a close button, input field, and results element. These are passed to the `staticSearchInput()` and `staticSearchResult()` functions in the [bind module](#staticsearch-bindjs-bind-module).

1. Copying the clickable element into the shadow DOM and attaching a click event handler to open the `<dialog>`. A similar handler also handles <kbd>Ctrl</kbd> | <kbd>Cmd</kbd> + <kbd>K</kbd> keyboard events on the `window` element.

The component's design allows you to use it in any site with minimal configuration. It uses a shadow DOM to ensure you don't unintentionally style the generated HTML and break the layout. Safer CSS styling is available with custom properties and shadow `::parts`.
