---
title: Format dates
menu: Format dates
description: How to show dates in a friendly human-readable format.
date: 2025-01-23
priority: 0.9
tags: content, format
---

Date values, such as a `${ data.date }`{language=js} expression, returns a native JavaScript date as a string which isn't particularly readable:

*This post was written on ${{ data.date }}.*

It's better show the date in a friendlier format and allow the site to be localised for different countries and languages.


## Update the formatting library

We're going to reuse the `lib/format.js` [function library](--ROOT--docs/recipe/templates/function-library/). If you've not already done so, import the `tacs` object at the top of the file so functions can access any [global property](--ROOT--docs/reference/global-properties/):

{{ `lib/format.js` }}
```js
// formatting functions
import { tacs } from 'publican';

// ...
```

Add the following functions if not already defined:

* A private `lang()`{language=js} function which returns a locale string (default is `en-US`).
* A private `cDate()`{language=js} function converts any value to a date.
* A public `dateHuman()`{language=js} which uses the [Intl API](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Intl) to output a date in the chosen locale format.

{{ `lib/format.js` }}
```js
// default language
function lang(locale) {
  return locale || tacs?.config?.language || 'en-US';
}

// create a date
function cDate(d) {
  d = new Date(d);
  return +d && !isNaN(d) && d instanceof Date ? d : new Date();
}

// friendly date format
export function dateHuman(d, locale) {

  return new Intl.DateTimeFormat(lang(locale), { dateStyle: 'long' })
    .format( cDate(d) );

}
```

The [library has already been imported](--ROOT--docs/recipe/templates/function-library/#import-the-library) into the `publican.config.js` configuration file and appended to the `tacs.fn.format` object so no additional code is required.


## Use in content and templates

A function named `tacs.fn.format.dateHuman()`{language=js} is now available to content and templates which can output formatted dates in any language, e.g.

```html
<!-- en-US default -->
<p><em>This post was written on
${ tacs.fn.format.dateHuman( data.date ) }.</em></p>

<!-- Spanish alternative -->
<p><em>Esta publicación fue escrita el
${ tacs.fn.format.dateHuman( data.date, 'es-ES' ) }.</em></p>
```

The result:

*This post was written on ${{ tacs.fn.format.dateHuman( data.date ) }}.*

*Esta publicación fue escrita el ${{ tacs.fn.format.dateHuman( data.date, 'es-ES' ) }}.*
