---
title: Publican.lib formatting functions
menu: Formatting
description: Publican.lib provides a set of number and date formatting functions you can use in templates.
date: 2026-05-29
modified: 2026-05-29
priority: 0.8
tags: Publican.lib, format, templates
---

The `format` functions display locale-specific values such as dates and numbers. The `libInit()` function adds all functions:

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

Or you can add functions individually:

{{ `publican.config.js` excerpt }}
```js
// Publican configuration
import { Publican, tacs } from 'publican';
import { number, currency } from 'publican.lib/format';

// ...set Publican defaults...

// add global formatting functions
tacs.lib = tacs.lib || {};
tacs.lib.format = { number, currency };

// build
await publican.build();
```


## `setLocale(locale)`

Defines the default locale when none is explicitly set in other formatting functions.

{{ `publican.config.js` excerpt }}
```js
tacs.lib.format.setLocale( 'es-ES' );
```


## `number(num [, locale])`

Returns a formatted number with appropriate thousand and fraction symbols.

{{ template }}
```html
<p>US: ${ tacs.lib.format.number( 12345.678 ) }</p>
<p>ES: ${ tacs.lib.format.number( 12345.678, 'es-ES' ) }</p>
```

US: ${ tacs.lib.format.number( 12345.678 ) }

ES: ${ tacs.lib.format.number( 12345.678, 'es-ES' ) }


## `currency(num, currency [, locale])`

Returns a formatted currency with appropriate thousand and fraction symbols.

{{ template }}
```html
<p>US: ${ tacs.lib.format.currency( 12345.678, 'USD' ) }</p>
<p>ES: ${ tacs.lib.format.currency( 12345.678, 'USD', 'es-ES' ) }</p>
```

US: ${ tacs.lib.format.currency( 12345.678, 'USD' ) }

ES: ${ tacs.lib.format.currency( 12345.678, 'USD', 'es-ES' ) }


## `numberRound(num [, locale])`

Rounds a number up depending on its size:

* < 1,000: to nearest 1
* \> 1,000 and < 10,000: to nearest 10
* \> 10,000 and < 100,000: to nearest 100
* etc.

{{ template }}
```html
<p>${ tacs.lib.format.numberRound( 12345 ) }</p>
<p>${ tacs.lib.format.numberRound( 123456 ) }</p>
```

${ tacs.lib.format.numberRound( 12345 ) }

${ tacs.lib.format.numberRound( 123456 ) }


## `dateHuman(date [, locale])`

Returns a date in human-readable format:

{{ template }}
```html
<p>US: ${ tacs.lib.format.dateHuman('2026-09-05', 'en-US') }</p>
<p>UK: ${ tacs.lib.format.dateHuman('2026-09-05', 'en-GB') }</p>
<p>ES: ${ tacs.lib.format.dateHuman('2026-09-05', 'es-ES') }</p>
```

US: ${ tacs.lib.format.dateHuman('2026-09-05', 'en-US') }

UK: ${ tacs.lib.format.dateHuman('2026-09-05', 'en-GB') }

ES: ${ tacs.lib.format.dateHuman('2026-09-05', 'es-ES') }

## `dateUTC(date)`

Returns a date in UTC format.

{{ template }}
```html
<pre>${ tacs.lib.format.dateUTC('2026-09-05T01:23:45') }</pre>
```

```txt
${{ tacs.lib.format.dateUTC('2026-09-05T01:23:45') }}
```

## `dateISO(date)`

Returns a date in ISO format.

{{ template }}
```html
<pre>tacs.lib.format.dateISO('2026-09-05T01:23:45')</pre>
```

```txt
${{ tacs.lib.format.dateISO('2026-09-05T01:23:45') }}
```


## `dateISOfull(date)`

Returns a full datetime in ISO format.

{{ template }}
```html
<pre>tacs.lib.format.dateISOfull('2026-09-05T01:23:45')</pre>
```

```txt
${{ tacs.lib.format.dateISOfull('2026-09-05T01:23:45') }}
```

## `dateYear(date)`

Returns a year.

{{ template }}
```html
<pre>tacs.lib.format.dateYear('2026-09-05T01:23:45')</pre>
```

```txt
${{ tacs.lib.format.dateYear('2026-09-05T01:23:45') }}
```
