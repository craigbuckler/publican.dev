---
title: StaticSearch v0.8.1 update
menu: false
description: StaticSearch has received a small update and a recommendation for improving mobile virtual keyboards.
author: Craig Buckler
tags: update, tools, StaticSearch
priority: 1.0
hero: images/update.avif
heroWidth: 1200
heroHeight: 600
heroAlt: update
heroCaption: Image courtesy of <a href="https://unsplash.com/@markuswinkler">Markus Winkler</a>
---

[StaticSearch v0.8.1](https://www.npmjs.com/package/staticsearch) was released on <time datetime="${{ tacs.lib.format.dateISO( '2026-07-13' ) }}">${{ tacs.lib.format.dateHuman( '2026-07-13' ) }}</time>. There should be no breaking changes since the changes are minor:

* The `::part(activate)` search activation element inherits color by default.
* The StaticSearch version is shown in "powered by" footer.
* `package.json` defines the minimum Node.js engine (>= 22).
* All modules were updated. The latest [esbuild](https://esbuild.github.io/) creates a smaller CSS and JavaScript bundles.
* Small bug fixes.


## Mobile virtual keyboards

I recommend you add `interactive-widget=resizes-content` to your HTML `viewport` meta tags, e.g.

{{ HTML <head> }}
```html
<meta name="viewport" content="width=device-width,interactive-widget=resizes-content">
```

This resizes the viewport when the keyboard appears. The StaticSearch `<dialog>`{language=html} height changes accordingly and it becomes easier to scroll through results.

<img src="__/images/mobile-keyboard-resize.webp" class="imgsmall" alt="mobile keyboard resizes viewport">

Refer to [mobile virtual keyboards](__/tools/staticsearch/search-web-component/#mobile-virtual-keyboards) for more information.


## Get started

The [StaticSearch documentation](__/tools/staticsearch/) provides a [quick start guide](__/tools/staticsearch/quickstart/), and details about the [indexer](__/tools/staticsearch/search-indexer/), [single script tag](__/tools/staticsearch/staticsearch-here/), [web component](__/tools/staticsearch/search-web-component/),[web component](__/tools/staticsearch/search-web-component/), [bind module](__/tools/staticsearch/search-bind-module/), and [JavaScript API](__/tools/staticsearch/search-api/).

StaticSearch works well with Publican sites. The [Publican documentation](__/docs/) provides a [quick start guide](__/docs/quickstart/concepts/), a [detailed set-up guide](__/docs/setup/content/), [API references](__/docs/reference/publican-options/), and [common recipes](__/docs/recipe/) you can use and adapt for your own projects.

<ul class="flexcenter">
  <li><a href="__/docs/quickstart/concepts" class="button">Get started</a></li>
  <li><a href="__/about/donate/" class="button">Donate</a></li>
</ul>
