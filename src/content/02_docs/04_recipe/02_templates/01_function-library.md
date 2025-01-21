---
title: Create a template function library
menu: Function library
description: Rather than putting functions in your Publican configuration file, you can import a library from another file.
date: 2025-01-21
priority: 0.9
tags: templates
---

Rather than put all your code into the `publican.config.js` configuration file, you can create reusable function libraries in other files. The functions these libraries export can be appended to the global `tacs` object.


## Create a function library

The following example creates a new `lib/format.js` file containing formatting functions:

* A private `cDate()`{language=js} function converts any value to a date.
* A public `dateYear()`{language=js} function returns the four-digit year of any date.

{{ `lib/format.js` }}
```js
// create a date
function cDate(d) {
  d = new Date(d);
  return +d && !isNaN(d) && d instanceof Date ? d : new Date();
}

// date year, e.g. "2025"
export function dateYear( d ) {
  return cDate(d).getUTCFullYear();
}
```


## Import the library

You can import the public formatting functions into your `publican.config.js` configuration file. The following code appends them as child properties of the `tacs.fn.format` object:

{{ `publican.config.js` excerpt }}
```js
import { Publican, tacs } from 'publican';
import * as fnFormat from './lib/format.js';

const publican = new Publican();

// set global defaults
tacs.config = tacs.config || {};
tacs.config.language = 'en-US';

// append formatting functions
tacs.fn = tacs.fn || {};
tacs.fn.format = fnFormat;

// build site
await publican.build();
```


## Use in content and templates

A function named `tacs.fn.format.dateYear()`{language=js} is now available to content and templates, e.g.

```html
<!-- the year the post was written -->
<p><em>Post written in ${ tacs.fn.format.dateYear( data.date ) }.</em></p>

<!-- the year the site was built -->
<p><em>&copy;${ tacs.fn.format.dateYear() }</em></p>
```

The result:

*Post written in ${ tacs.fn.format.dateYear( data.date ) }.*

*&copy;${ tacs.fn.format.dateYear() }*
