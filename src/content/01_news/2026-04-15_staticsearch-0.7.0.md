---
title: StaticSearch v0.7.0 update
menu: false
description: StaticSearch v0.7.0 improves search functionality and provides useful accessibility improvements.
author: Craig Buckler
tags: update, tools, StaticSearch
priority: 1.0
pinned: 0.9
hero: images/binoculars.avif
heroWidth: 1200
heroHeight: 600
heroAlt: search
heroCaption: Image courtesy of <a href="https://unsplash.com/@elijahjmears">Elijah Mears</a>
---

[StaticSearch v0.7.0](https://www.npmjs.com/package/staticsearch) was released on <time datetime="${{ tacs.lib.format.dateISO( '2026-04-14' ) }}">${{ tacs.lib.format.dateHuman( '2026-04-14' ) }}</time>. There should be no breaking changes but there are a few new features included *fuzzier* results generation.


## Fuzzy search results

StaticSearch now finds partial segments of words so there's less need to type them in full.

* When you type the characters `"exp"`, the results show pages containing words such as "expert", "explain", "explicit", "explore", "export", and "express".

* Changing the search term to `"expl"` returns pages with the words "explain", "explicit", and "explore".

* Changing it to `"expla"` then returns pages with "explain".

A `fuzzy` setting determines the maximum number of words to fetch. Set it on the [web component](--ROOT--tools/staticsearch/search-web-component/):

{{ HTML excerpt }}
```html
<static-search fuzzy="5">
  <p>search</p>
</static-search>
```

the [bind module `<input>` field](--ROOT--tools/staticsearch/search-bind-module/#input-field-attributes):

{{ HTML excerpt }}
```html
<input type="search" id="staticsearch_search" fuzzy="5">
```

or as the second argument of the [API .find() method](--ROOT--tools/staticsearch/search-api/#staticsearchfind-method):

{{ JavaScript excerpt }}
```js
const result = await staticsearch.find('my search query', 5);
```

* The default `fuzzy` value is `6`. Searching for `"exp"` returns results for all six words above.
* Setting `fuzzy="3"` returns results for the first three words ("expert", "explain", and "explicit").
* Setting `fuzzy="1"` or lower reverts to the original search behaviour and the user must type most of the word before results appear.


## Keyboard-focusable activation

The [`<static-search>` activation element](--ROOT--tools/staticsearch/search-web-component/#search-activation-element) which triggers the search dialog is now keyboard-focusable so you can open it by hitting Enter or space.


## Activate search from any element

When using the [`<static-search>` web component](--ROOT--tools/staticsearch/search-web-component/), any HTML element can trigger the search dialog by adding a `data-static-search` attribute, e.g.

{{ HTML excerpt }}
```html
<a href="#" data-static-search="search">click here to search</a>
```


## Activation element `::part` name

The [activation element](--ROOT--tools/staticsearch/search-web-component/#search-activation-element) sets a `part` attribute name of `activate` unless you define your own, e.g.

{{ HTML excerpt }}
```html
<static-search fuzzy="5">
  <p part="trigger">search</p>
</static-search>
```

Style it using the `part` name, e.g.

{{ CSS excerpt }}
```css
static-search::part(trigger) {
  color: #00f;
}
```


## Build directory location

The StaticSearch [indexer](--ROOT--tools/staticsearch/search-indexer/) now looks for static sites built to the subdirectories:

1. `./build/`
1. `./dist/`
1. `./dest/`
1. `./out/`, or
1. `./target/`

When none exist, it uses the current working directory.


## Omit default stop words

StaticSearch automatically removes common stop words considered insignificant to the meaning of text -- such as "and", "the", and "but" in English. It supports stop words in Afrikaans (`af`), Croatian (`hr`), Czech (`cs`), Danish (`da`), Dutch (`nl`), English (`en`), Estonian (`et`), Finnish (`fi`), French (`fr`), German (`de`), Hungarian (`hu`), Irish (`ga`), Italian (`it`), Latvian (`lv`), Lithuanian (`lt`), Malay (`ms`), Norwegian (`no`), Polish (`pl`), Portuguese (`pt`), Romanian (`ro`), Slovak (`sk`), Somali (`so`), Spanish (`es`), Swahili (`sw`), Swedish (`sv`), Turkish (`tr`), and Zulu (`zu`).

In some cases, such as smaller sites, you may wish to omit these defaults or use your own set. You can do this on the command line:

{{ terminal }}
```bash
staticsearch -W
# or
staticsearch --ignorestopdefault
```

in an [environment variable](--ROOT--tools/staticsearch/search-indexer/#load-environment-files):

{{ example `.env` }}
```ini
# StaticSearch environment variables
STOPWORDS_DEFAULT=false
```

or using the [Node.js API](--ROOT--tools/staticsearch/search-indexer/#using-the-staticsearch-nodejs-api):

{{ `index.js` example }}
```js
// run indexer
import { staticsearch } from 'staticsearch';
staticsearch.stopWordsDefault = false;
await staticsearch.index();
```


## Miscellaneous updates

Minor changes include:

* Index files are generated to a `search` subdirectory of the build directory unless overridden.
* The search result scrollbar thumbs now use the `--staticsearch-color-fore2` color.
* Words with valid technical meanings have been removed from the English stop word list.
* Slug paths generated on Windows devices now use `/` rather than `\`.


## Get started

The [StaticSearch documentation](--ROOT--tools/staticsearch/) provides a [quick start guide](--ROOT--tools/staticsearch/quickstart/), and details about the [indexer](--ROOT--tools/staticsearch/search-indexer/), [web component](--ROOT--tools/staticsearch/search-web-component/), [bind module](--ROOT--tools/staticsearch/search-bind-module/), and [JavaScript API](--ROOT--tools/staticsearch/search-api/).

StaticSearch works well with Publican sites. The [Publican documentation](--ROOT--docs/) provides a [quick start guide](--ROOT--docs/quickstart/concepts/), a [detailed set-up guide](--ROOT--docs/setup/content/), [API references](--ROOT--docs/reference/publican-options/), and [common recipes](--ROOT--docs/recipe/) you can use and adapt for your own projects.

<ul class="flexcenter">
  <li><a href="--ROOT--docs/quickstart/concepts" class="button">Get started</a></li>
  <li><a href="--ROOT--about/donate/" class="button">Donate</a></li>
</ul>
