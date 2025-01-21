---
title: Custom jsTACS global properties and functions
menu: Template globals
description: How to use Custom configuration options
date: 2025-01-07
priority: 0.9
tags: configure, jsTACS
---

You can append custom data and functions to the [global `tacs` object](--ROOT--docs/reference/global-properties/) so it can be used in template expressions. These can provide advanced functionality that would be difficult to create in an `${ expression }`{language=js} or cause [issues in markdown content](--ROOT--docs/setup/jstacs/#template-literals-in-markdown).


## Accessing the global object

Publican exports all jsTACS objects: `tacsConfig`, `tacs`, `templateMap`, `templateGet`, `templateParse`, and `templateEngine`. Of these, `tacs` is most useful because it contains the [global object](--ROOT--docs/reference/global-properties/) available to all pages at build time.

You can import the `tacs` object into the `publican.config.js` configuration file or any other module:

```js
import { tacs } from 'publican';
```


### Publican global properties

You can append your own global [properties](#defining-global-properties) and [functions](#defining-global-functions) to the `tacs` object, but should normally avoid changing the [Publican reserved values](--ROOT--docs/reference/global-properties/) `.root`, `.all`, `.dir`, `.tag`, `.tagList`, and `.nav`.


## Defining global properties

You can set global `tacs` properties for use in any template. It can be practical to namespace these under a new object -- such as `tacs.config`{language=js} -- to avoid clashes with other code:

{{ `publican.config.js` example }}
```js
// import Publican
import { Publican, tacs } from 'publican';

// create Publican object
const publican = new Publican();
const isDev = (process.env.NODE_ENV === 'development');

// global jsTACS values
tacs.config = tacs.config || {};
tacs.config.isDev = isDev;
tacs.config.title = process.env.SITE_TITLE; // from .env file

// build site
await publican.build();
```

The global values can be referenced in [template literals](--ROOT--docs/setup/jstacs/) in any content or template file:

```html
<header>
  <p><strong>${ tacs.config.title }</strong></p>
  <p>${ tacs.config.isDev ? 'Development' : 'Production' } build</p>
</header>
```


## Defining global functions

Global functions are just another type of [property](#defining-global-properties) which you can also namespace. The following example creates a function to format numbers using the site's locale:

{{ `publican.config.js` excerpt }}
```js
// global jsTACS values
tacs.config = tacs.config || {};

// from .env file
tacs.config.isDev = isDev;
tacs.config.title = process.env.SITE_TITLE;
tacs.config.language = process.env.SITE_LANGUAGE;

// global jsTACS functions
tacs.fn = tacs.fn || {};
tacs.fn.formatNumber = v =>
  new Intl.NumberFormat(tacs.config.language, {}).format( v );
```

Global functions can be referenced in [template literals](--ROOT--docs/setup/jstacs/) in any content or template file:

```html
<p>This site has ${ tacs.fn.formatNumber( tacs.all.size ) } pages.</p>
```
