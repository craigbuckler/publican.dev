---
title: Format numbers
menu: Format numbers
description: How to show numbers, currencies, and other numeric values in a friendly human-readable format.
date: 2025-01-23
priority: 0.9
tags: content, format
---

Numbers, such as `${ 12345.678 }`{language=js}, returns a native JavaScript numeric value:

*Value: ${{ 12345.678 }}.*

It's better show the number in a friendlier format with thousands separators and allow the site to be localised for different countries and languages.


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
* A public `number()`{language=js} which uses the [Intl API](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Intl) to output a number in the chosen locale format.

{{ `lib/format.js` }}
```js
// default language
function lang(locale) {
  return locale || tacs?.config?.language || 'en-US';
}

// friendly number format
export function number(num, locale) {

  return new Intl.NumberFormat(lang(locale), {})
    .format( num );

}
```

The [library has already been imported](--ROOT--docs/recipe/templates/function-library/#import-the-library) into the `publican.config.js` configuration file and appended to the `tacs.fn.format` object so no additional code is required.


## Use in content and templates

A function named `tacs.fn.format.number()`{language=js} is now available to content and templates which can output formatted numbers in any language, e.g.

```html
<!-- en-US default -->
<p><em>Value ${ tacs.fn.format.number( 12345.678 ) }</em></p>

<!-- Spanish alternative -->
<p><em>Valor ${ tacs.fn.format.number( 12345.678, 'es-ES' ) }</em></p>
```

The result:

*Value ${{ tacs.fn.format.number( 12345.678 ) }}*

*Valor ${{ tacs.fn.format.number( 12345.678, 'es-ES' ) }}*
