---
title: Publican.lib string replacements
menu: String replacement
description: Publican.lib provides a set of string replacement definitions you can use in content.
date: 2026-05-29
modified: 2026-05-29
priority: 0.8
tags: Publican.lib, string replacement, content
---

The `replace` library provides a single `replaceMap()` function. It's passed the root path and returns a JavaScript Map with [string replacement](__/docs/setup/string-replacement/) definitions. The `libInit()` function adds all definitions:

{{ `publican.config.js` excerpt }}
```js
// Publican configuration
import { Publican, tacs } from 'publican';
import { libInit } from 'publican.lib';

// ...set Publican defaults...

// initialize publican.lib
libInit(publican, tacs);

// build
await publican.build();
```

Or you can add definitions on their own:

{{ `publican.config.js` excerpt }}
```js
// Publican configuration
import { Publican, tacs } from 'publican';
import { replaceMap } from 'publican.lib/replace';

// ...set Publican defaults...

// string replacement
publican.config.replace = new Map([
  ...replaceMap( publican.config.root ),
]);

// build
await publican.build();
```


## Text replacements

* `__ /` (double underscore then slash) or `−−ROOT−−` is replaced with the root path
* `−−COPYRIGHT−−` is replaced with `--COPYRIGHT--`


## Style replacements

All elements with a `style` attribute setting the text alignment have `class="center"` or `class="right"` assigned accordingly.


## Table scrolling

All `<table>` elements get a `<div class="tablescroll">` container to help with scrolling on smaller devices (set `overflow-inline: auto;` in CSS).


## Unnecessary paragraphs

Unnecessary `<p>` tags are removed from around `<img>`, `<svg>`, and `<iframe>` elements.


## Image handling

When not explicitly set on `<img>` tags:

* `alt` attributes are added, and
* `loading="lazy"` is set


## JSON characters

Special characters for [JSON feeds](__/tools/publican.lib/feed/#jsonstr-domain-root) are replaced.
