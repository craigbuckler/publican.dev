---
title: Publican v0.8.0 update
menu: false
description: Publican v0.8.0 allows alternative index filenames, sets better default properties, and has a new event hook. An example theme is available.
author: Craig Buckler
tags: SSG, content, update
priority: 1.0
pinned: 0.9
date: 2025-05-02
hero: images/root.avif
heroWidth: 1200
heroHeight: 600
heroAlt: root
heroCaption: Image courtesy of <a href="https://unsplash.com/@eilisgarvey">Eilis Garvey</a>
---

[Publican v0.8.0](https://www.npmjs.com/package/publican) was released on <time datetime="${{ tacs.fn.format.dateISO( '2025-05-02' ) }}">${{ tacs.fn.format.dateHuman( '2025-05-05' ) }}</time>.

There are no breaking changes, but the following features have been added.


## Alternative index filenames

By default, Publican uses content slugs ending in `index.html` to create friendlier [directory-based URLs](--ROOT--docs/setup/content/#directory-structure). Content at `blog/index.md` is rendered to the slug `blog/index.html`.

You can choose an alternative index filename if necessary:

{{ `publican.config.js` excerpt }}
```js
// index filename
publican.config.indexFilename = 'default.htm';
```

This changes how slugs are created: content at `blog/index.md` is now rendered to `blog/index/default.htm`. You would need to rename the content file to `blog/default.md` to render it to `blog/default.htm`.

::: aside
You can set any file type, e.g. `index.php`. Unless an explicit [template is set in the front matter](--ROOT--docs/reference/front-matter/#template), index files are rendered inside the [default template](#default-template) since they are presumed to hold HTML content.
::: /aside


## New post content properties

The following [post content properties](--ROOT--docs/reference/content-properties/) have been added:

* [`data.isIndexPage`](--ROOT--docs/reference/content-properties/#dataisindexpage) - `true` for index pages in the root of a directory (`index.html` [unless changed](#alternative-index-filenames))
* [`data.isCSS`](--ROOT--docs/reference/content-properties/#dataiscss) -- `true` for CSS files
* [`data.isJS`](--ROOT--docs/reference/content-properties/#dataisjs) -- `true` for client-side JavaScript files


## Post `data.menu` property defaults

The front matter [`menu` value](--ROOT--docs/reference/front-matter/#menu) (and the [`data.menu` content property](--ROOT--docs/reference/content-properties/#datamenu)) sets a page title used in menus that is usually shorter than the real title, e.g.

```md
---
title: How to contact us
menu: Contact
---
```

Setting `index: false` allows you to omit a page from [menus](--ROOT--docs/recipe/navigation/main-menu/) or [breadcrumb trails](--ROOT--docs/recipe/navigation/breadcrumb-links/) by examining it's value in [`tacs.nav` global property](--ROOT--docs/reference/global-properties/#tacsnav).

From Publican v0.8.0, when `menu` is not set in front matter:

* rendered files that are HTML or index pages, have `menu` set to a valid string -- either the full `title` or the `directory` name. It's no longer necessary to use expressions such as `${ data.menu || data.title }`{language=js}.

* rendered files that are **not** HTML or index pages have `menu` set `false`.


## Post `data.index` property defaults

The front matter [`index` value](--ROOT--docs/reference/front-matter/#index) (and the [`data.index` content property](--ROOT--docs/reference/content-properties/#dataindex)) sets the search engine indexing frequency.

Setting `index: false` omits a page from the global [`tacs.dir` property](--ROOT--docs/reference/global-properties/#tacsdir) so it does not appear in [directory indexes](--ROOT--docs/setup/directory-indexes/) and sitemaps.

From Publican v0.8.0, rendered files that are **not** HTML or index pages are set `false` by default unless explicitly overridden. It's no longer be necessary to set `index: false` in the front matter for files such as XML, SVG, CSS, JavaScript, etc.


## Other post property changes

The following properties have changed:

* `data.isHTML` is now `true` for any `.*htm*` files -- not just `.html`
* `data.wordCount` now returns a value for all HTML pages even when `index: false` is set.


## Improved CSS file processing

Publican can process CSS files like any other text content. Files are copied as-is but you can insert [jsTACS](--ROOT--docs/setup/jstacs/) `${ expressions }`{language=js} if necessary.

Previous releases of Publican failed to process files containing CSS character entities in `\XXXX` format, but this has been fixed.

::: aside
Using a CSS bundler such as [esbuild](--ROOT--docs/recipe/build/esbuild/) offers benefits such as file concatenation and minification.
::: /aside


## Improved JS file processing

Publican can process client-side JavaScript files like any other text content. Files are copied as-is but you can insert [jsTACS](--ROOT--docs/setup/jstacs/) `${ expressions }`{language=js} if necessary. Note:

1. You cannot use backtick (<code>`</code>) characters inside expressions.
1. Template literals intended for runtime processing must use `!{ expressions }`{language=js}

For more information, refer to [template literals in JavaScript](--ROOT--docs/setup/jstacs/#template-literals-in-javascript).

::: aside
Using a JavaScript bundler such as [esbuild](--ROOT--docs/recipe/build/esbuild/) offers benefits such as file concatenation, tree shaking, and minification.
::: /aside


## New `processRenderEnd` event hook

A new function hook named [`processRenderEnd`](--ROOT--docs/reference/event-functions/#processrenderend) is called once after all rendering and file writes are complete. It's passed an array of changed file objects (`{ slug, content }`{language=js}) and the [global `tacs` object](--ROOT--docs/reference/global-properties/).

The function cannot change how files are rendered, but it can log changes or run other processes.


## New basic theme

A new basic Publican theme is available at:

* **demonstration site:**

  [https://publican-theme-basic.pages.dev/](https://publican-theme-basic.pages.dev/)

* **code repository:**

  [github.com/craigbuckler/publican.theme.basic](https://github.com/craigbuckler/publican.theme.basic)

The theme is fast, standards based, and uses best practise techniques. It features pages, blog posts, tag indexes, a light/dark switcher, RSS feed, sitemaps, security, and a 100% Lighthouse score.

Please [download and adapt the theme](https://github.com/craigbuckler/publican.theme.basic) for your own purposes.


### New LiveLocalhost server

The [basic theme](#new-basic-theme) uses Publican alone for rendering -- there are no other dependencies. In development mode, it provides a [`livelocalhost`](https://www.npmjs.com/package/livelocalhost) server to automatically reload HTML and CSS when files change.
