---
title: StaticSearch web component
menu: Web component
description: How to quickly add search functionality to any page using the <static-search> web component.
date: 2025-06-17
modified: 2025-07-18
priority: 0.8
tags: StaticSearch, HTML, CSS, web component
---

::: aside

You must [run the StaticSearch indexer](--ROOT--tools/staticsearch/search-indexer/) to generate a word indexes before you can add search functionality to your site. This tutorial assumes search index files have been generated in the static site's `/search/` directory.

::: /aside


The `<static-search>` web component provides full search functionality in any web page using HTML alone. It is the easiest option to use, e.g.

```html
<!-- include script once on your page -->
<script type="module" src="/search/staticsearch-component.js"></script>

<!-- define web component -->
<static-search title="press Ctrl+K to search">
  <p>search</p>
</static-search>
```

:::aside

The `<script>` tag can be placed anywhere in the page. It's non-blocking and runs when the DOM is ready, so you can put it near the top of the HTML `<head>`. It loads 13Kb of JavaScript, 4Kb of CSS, and associated index data when the user starts a new search.

:::/aside

The component uses the [Shadow DOM](https://developer.mozilla.org/docs/Web/API/Web_components/Using_shadow_DOM) so it can be added without your styles affecting the layout. Styling can still be achieved using [custom properties](#css-custom-property-styling) and/or [`::part` selectors](#css-part-selector-styling).


## Search activation element

`<static-search>` can can be placed anywhere you want a search icon or text -- perhaps the page `<header>`. It requires a single inner element that can be clicked to activate the search. This opens a modal dialog with an input field and results list.

The activation element must be an element with content -- it cannot be empty or text only. You can also assign [`part` attributes so they can be styled](#css-part-selector-styling), e.g.

```html
<static-search title="press Ctrl+K to search">

  <a part="staticsearchactivate" href="https://duckduckgo.com/?q=search%20site:mysite.com">
    <svg part="staticsearchicon" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
      <path d="M10 4a6 6 0 1 0 0 12 6 6 0 0 0 0-12Zm-8 6a8 8 0 1 1 14.3 5l5.4 5.3a1 1 0 0 1-1.4 1.4l-5.4-5.4A8 8 0 0 1 2 10Z"></path>
    </svg>
  </a>

</static-search>
```

> This example links to [duckduckgo.com search](https://duckduckgo.com/) by default. The web component progressively enhances it to use StaticSearch instead. The user therefore gets a search facility when JavaScript fails to load or run.


## Web component attributes

The following attributes can be added to the `<static-search>` element to control functionality:

| attribute | description |
|-|-|
| `title="<string>"` | activation instructions (clicking and <kbd>Ctrl</kbd>\|<kbd>Cmd</kbd>+<kbd>K</kbd> is supported) |
| `label="<string>"` | the label on the search `<input>` |
| `minscore="<num>"` | only show pages with [total relevancy scores](--ROOT--tools/staticsearch/search-indexer/#word-indexing-options) of this or above on results |
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

You can override this using a `<template>` with an ID of `staticsearch_resultmessage` in your HTML page (it can be within `<static-search>` or anywhere else). You must set the `part` attributes `"resultmessage"`, `"resultcount"`, and `"searchterm"` as necessary, e.g.

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

You can override this using a `<template>` with an ID of `staticsearch_item` in your HTML page (it can be within `<static-search>` or anywhere else). Set the `part` attributes `"item"`, `"link"`, `"title"`, `meta`, `date`, `words`, and `"description"` as necessary, e.g. show the title but no description, date, or word count in an `<article>`:

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


## CSS custom property styling

The following CSS custom properties (variables) can be set in the `:root` or any element that's an ancestor of `<static-search>`. A neutral set of colors is defined and your site's light/dark theme will be followed presuming your CSS sets `color-scheme: light dark;`, `color-scheme: light;`, or `color-scheme: dark;` accordingly.

The following code shows custom property defaults you can change:

```css
:root {
  /* font size */
  --staticsearch-fontsize: 1em;

  /* modal dimensions */
  --staticsearch-maxwidth: 60ch;
  --staticsearch-margin: 3vmin;
  --staticsearch-padding: 2vmin;
  --staticsearch-fieldset-height: calc(3em + (2 * var(--staticsearch-padding)));

  /* colors */
  --staticsearch-color-back: Canvas;
  --staticsearch-color-border: ButtonFace;

  --staticsearch-color-fore0: CanvasText;
  --staticsearch-color-fore1: color-mix(in oklab, CanvasText 80%, Canvas);
  --staticsearch-color-fore2: color-mix(in oklab, CanvasText 60%, Canvas);

  --staticsearch-color-link: color-mix(in oklab, LinkText 70%, CanvasText);
  --staticsearch-color-visited: color-mix(in oklab, VisitedText 70%, CanvasText);

  --staticsearch-color-shadow: #000;
  --staticsearch-color-backdrop: color-mix(in srgb, var(--colshad0), transparent 30%);
  --staticsearch-backdrop-blur: 3px;
}
```


## CSS `::part` selector styling

You can target `static-search` elements using `::part` selectors. HTML similar to the following is produced -- note the `part` attribute names:

```html
<static-search>

  <!-- user-defined activation element -->
  <p>search</p>

  <!-- dialog with aria-expanded when open -->
  <dialog part="dialog" aria-expanded="true">

    <!-- close button -->
    <form method="dialog">
      <button part="close">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path xmlns="http://www.w3.org/2000/svg" fill="currentColor" d="M5.3 5.3a1 1 0 0 1 1.4 0l5.3 5.3 5.3-5.3a1 1 0 1 1 1.4 1.4L13.4 12l5.3 5.3a1 1 0 0 1-1.4 1.4L12 13.4l-5.3 5.3a1 1 0 0 1-1.4-1.4l5.3-5.3-5.3-5.3a1 1 0 0 1 0-1.4Z"/></svg>
      </button>
    </form>

    <!-- search form -->
    <search part="search">
      <label for="search" part="searchlabel">search</label>
      <input type="search" id="search" name="q" minlength="2" maxlength="300" part="searchinput" />
    </search>

    <!-- search results -->
    <div part="results">

      <!-- default results message -->
      <p part="resultmessage">
        <span part="resultcount">1</span> found for
        <span part="searchterm">"web component"</span>&hellip;
      </p>

      <!-- results list -->
      <ol part="searchresult">

        <!-- default results item -->
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

      </ol>

    </div>

  </dialog>

<static-search>
```

You can therefore target any element with its `::part` selector:

```css
static-search {

  /* modal dialog */
  &::part(dialog) {
    border: 5px solid #f00;
  }

  /* input */
  &::part(searchlabel) {
    text-transform: uppercase;
  }

  &::part(searchinput) {
    font-family: monospace;
  }

  &::part(resultmessage) {
    font-size: 1.5em;
  }

  &::part(description) {
    font-size: 0.8em;
  }

}
```


## Re-run the indexer

Once you have added StaticSearch functionality to your static site's templates, you should [re-run the indexer](--ROOT--tools/staticsearch/search-indexer/) to ensure the latest content is indexed.
