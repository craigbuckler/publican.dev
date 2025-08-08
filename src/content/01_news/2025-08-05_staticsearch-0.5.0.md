---
title: StaticSearch v0.5.0 update
menu: false
description: StaticSearch now supports more languages and can limit results to pages containing some or every search word.
author: Craig Buckler
tags: update, tools, StaticSearch
priority: 1.0
pinned: 0.9
hero: images/update.avif
heroWidth: 1200
heroHeight: 600
heroAlt: update
heroCaption: Image courtesy of <a href="https://unsplash.com/@markuswinkler">Markus Winkler</a>
---

[StaticSearch v0.5.0](https://www.npmjs.com/package/staticsearch) was released on <time datetime="${{ tacs.fn.format.dateISO( '2025-08-05' ) }}">${{ tacs.fn.format.dateHuman( '2025-08-05' ) }}</time>. There should be no breaking changes but -- *more importantly* -- it has a new logo!...

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 506.7 257.3" width="88" height="45" class="logolarge"><path d="M88.3 130.4a63 63 0 0 1-49-19.2l21.6-21.6c23.3 25 65.4 9.1 33.1-5.8-11.4-4.4-25-7.9-34.6-16.3C40.2 51.8 46.3 16.4 69.9 7.6c21.4-9 53.3-4.9 69.7 12.4l-21.8 21.6c-7.2-6.9-14.1-10.9-23.9-10.9-8.5-1.1-16.4 6.5-8.6 12.9 8.9 6 21.7 8 31.7 13.1 25.3 9.1 30.5 47.8 9.1 63.3-8.9 6.9-21.5 10.3-37.8 10.3Z"/><path d="M132.2 70.9V43.2h70.2v27.7h-70.2Zm18.1 57.5V8.3h33.9v120.1h-33.9Z"/><path d="M236.1 130.1c-62.8-1.6-48.4-106.7 13.8-86.1a24.6 24.6 0 0 1 16 17.4v48.8c-2.8 13.2-16.9 20-29.8 19.9Zm7.6-29.8c18.6.9 18.7-29.8.2-29.1-18.6-.6-18.9 29.6-.2 29.1Zm13.1 28.1v-22.8l4.7-20.8-4.7-20.6V43.3h33v85.1h-33Z"/><path d="M287.9 70.9V43.2h70.2v27.7h-70.2Zm18.2 57.5V8.3H340v120.1h-33.9Z"/><path d="M372.6 35.3c-22.8.3-22.8-35.6 0-35.3 22.8-.4 22.8 35.7 0 35.3Zm-16.9 93.1V43.3h33.9v85.1h-33.9Z"/><path d="M437.5 130.4c-35.9 1.7-61.8-36.4-42.3-67.6 15.3-24.5 54.9-29.5 75.9-9.1L449.8 75c-9-8.7-27.5-3.2-26.8 10.6-.7 14.4 19.1 20 27.7 9.9l21.3 21.3a46.8 46.8 0 0 1-34.4 13.7ZM49 230.4a63 63 0 0 1-49-19.2l21.6-21.6c23.3 25 65.4 9.1 33.1-5.8-11.4-4.4-25-7.9-34.6-16.3C.9 151.8 7 116.4 30.6 107.6c21.4-9 53.3-4.9 69.7 12.4l-21.8 21.6c-7.2-6.9-14.1-10.9-23.9-10.9-8.5-1.1-16.4 6.5-8.6 12.9 8.9 6 21.7 8 31.7 13.1 25.3 9.1 30.5 47.8 9.1 63.3-8.9 6.9-21.5 10.3-37.8 10.3Z"/><path d="M146.2 230.4c-49.3 2.5-69.7-58.7-27-83.5 34.9-18.4 78.8 7.7 68.2 49l-76.8.5v-20.8l64.2-.5-15.7 9.2c2.3-20.6-20.8-28.6-29.7-10.2-3.5 9.4-3.2 25.3 6.5 30.8a24.9 24.9 0 0 0 29.4-5.9l17 16.8a45.6 45.6 0 0 1-36 14.5Z"/><path d="M224 230.1c-62.8-1.6-48.4-106.7 13.8-86.1a24.6 24.6 0 0 1 16 17.4v48.8c-2.8 13.2-16.9 20-29.8 19.9Zm7.6-29.8c18.6.9 18.7-29.8.2-29.1-18.6-.6-18.9 29.6-.2 29.1Zm13.1 28.1v-22.8l4.7-20.8-4.7-20.6v-20.9h33v85.1h-33Zm37.7 0v-85.1h33.9v85.1h-33.9Zm33.9-46-15.7-14c8.4-17.2 18.2-26.7 37.2-26.8 6.6 0 12.6 1.2 17 5.4l-19 27c-7.1-6.8-20.7-3-19.4 8.5Zm71.5 48c-35.9 1.7-61.8-36.4-42.3-67.6 15.3-24.5 54.9-29.5 75.9-9.1L400.1 175c-9-8.7-27.5-3.2-26.8 10.6-.7 14.4 19.1 20 27.7 9.9l21.3 21.3a46.8 46.8 0 0 1-34.4 13.7Z"/><path d="M418.6 228.4V101.8h33.9v126.6h-33.9Zm54.1 0c-1.1-5.8 2.9-52.1-2.9-55.4-6.2-5.9-18.2-1.6-17.4 7.7l-13.1-5.9c-1.7-27.8 29.5-40.7 51.6-29.1a29.1 29.1 0 0 1 15.7 27.2v55.5h-33.9Z"/><path d="m398.8 222.7 14.3-14.2 34.6 34.6-14.2 14.2z"/></svg>


## Logical OR/AND searches

Search results now contain a new [`found` value](--ROOT--tools/staticsearch/search-api/#staticsearchfind-method) that gives the proportion of search words found on a page. For example, a page featuring two of the four search words entered has a `found` value of `0.5`. You can set a new `minfound` attribute on the [web component](--ROOT--tools/staticsearch/search-web-component/#web-component-attributes) or [bind module](--ROOT--tools/staticsearch/search-bind-module/#search-result-attributes) to limit results to pages with an equal or higher `found` value.

Consider a cooking website *(thanks for the suggestion, Jos!)* where users can search for recipes according to ingredients they have in the cupboard:

* setting `minfound="0"`{language=html} (the default) is a *logical OR*.

  A recipe page appears in results when it contains ANY of the ingredients. Recipes containing all ingredients *should* be at the top, but there will be less useful recipes featuring a single ingredient.

* setting `minfound="1"`{language=html} is a *logical AND*.

  A recipe page appears in results when it contains ALL the ingredients. That may be a little too restrictive.

* setting `minfound="0.8"`{language=html} means a recipe page appears in results when it contains at least 80% of the ingredients.

  Again, recipes containing all ingredients should be at the top, but there could be useful results featuring four of five ingredients entered.

StaticSearch allows you build a custom recipe search where the user could click ingredients and use a slider to change the *precision / fuzziness* of results.


## Additional language support

StaticSearch removes commonly-used *stop words* considered insignificant to the meaning of text -- such as *"and"*, *"the"*, and *"but"* in English. This can produce better results and v0.5.0 now supports stop words in:

* Danish (`da`{language=html})
* Dutch (`nl`{language=html})
* English (`en`{language=html})
* Finnish (`fi`{language=html})
* French (`fr`{language=html})
* German (`de`{language=html})
* Italian (`it`{language=html})
* Norwegian (`no`{language=html})
* Portuguese (`pt`{language=html})
* Spanish (`es`{language=html})
* Swedish (`sv`{language=html})
* Turkish (`tr`{language=html})

The lists are courtesy of [Stopwords ISO](https://github.com/stopwords-iso).


## StaticSearch on Frontend Focus

The [Frontend Focus newsletter, issue 703](https://frontendfoc.us/issues/703) featured StaticSearch, so many thanks to their editors.


## Get started

The [StaticSearch documentation](--ROOT--tools/staticsearch/) provides a [quick start guide](--ROOT--tools/staticsearch/quickstart/), and details about the [indexer](--ROOT--tools/staticsearch/search-indexer/), [web component](--ROOT--tools/staticsearch/search-web-component/), [bind module](--ROOT--tools/staticsearch/search-bind-module/), and [JavaScript API](--ROOT--tools/staticsearch/search-api/).

StaticSearch works well with Publican sites. The [Publican documentation](--ROOT--docs) provides a [quick start guide](--ROOT--docs/quickstart/concepts), a [detailed set-up guide](--ROOT--docs/setup/content), [API references](--ROOT--docs/reference/publican-options), and [common recipes](--ROOT--docs/recipe) you can use and adapt for your own projects.

<ul class="flexcenter">
  <li><a href="--ROOT--docs/quickstart/concepts" class="button">Get started</a></li>
  <li><a href="--ROOT--about/donate/" class="button">Donate</a></li>
</ul>
