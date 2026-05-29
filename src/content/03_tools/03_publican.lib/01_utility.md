---
title: Publican.lib utility functions
menu: Utilities
description: Publican.lib provides a set of common utility functions to help fetch data and environment settings.
date: 2026-05-29
modified: 2026-05-29
priority: 0.8
tags: Publican.lib, configure
---

The `util` library provides utility functions you can use in your Publican configuration file or elsewhere. You can import the functions you need from `publican.lib`:

{{ `publican.config.js` excerpt }}
```js
// Publican configuration
import { env, apiFetch } from 'publican.lib';

console.log( env('NODE_ENV') );
```

or from `publican.lib/util`:

{{ `publican.config.js` excerpt }}
```js
// Publican configuration
import { env, apiFetch } from 'publican.lib/util';

console.log( env('NODE_ENV') );
```

Or you can import all functions:

{{ `publican.config.js` excerpt }}
```js
// Publican configuration
import * as libUtil from 'publican.lib/util';

console.log( libUtil.env('NODE_ENV') );
```


## `env(name [, default])`

Fetches an environment variable, converts to a numeric value where possible, and reverts to a default when necessary:

```js
// isDev true when NODE_ENV is explicitly set to "development"
const isDev = (env('NODE_ENV', 'production') === 'development');
```


## `apiFetch(object)`

Make an HTTP request, format the response, and cache when required. The object parameter properties:

* `uri` - required
* `method` such as `"GET"` (the default) or `"POST"`
* `headers` - optional object with name/value pairs
* `authKey` - optional request header `Authorization` token
* `contentType` - optional request header `Content-Type` (JSON by default)
* `body` - request body as a querystring, object, or array of arrays
* `timeout` - in millseconds (default of 10000 -- 10 seconds)
* `cacheDir` - cache directory location (not used by default)
* `cacheMin` - the number of minutes to cache data

The function returns an object with the following properties:

* `ok`: either `true` or `false`
* `status`: the HTTP status code (`200` for OK)
* `body`: the resulting text or JSON response (or error message)
* `error`: error code
* `cache`: the cache file name when returning cached results

Example that caches a response for 10 minutes:

```js
const res = await apiFetch({
  uri: 'https://api.site.com/call',
  authKey: 'mytoken',
  cacheDir: './_cache/'
});

if (res.ok) console.log(res.body);
```


## `normalize(str)`

Normalizes a string to lowercase characters with hyphens in place of spaces:

```js
normalize(' Publican Library 1 ');
// returns "publican-library-1"
```


## `strHash(str)`

Hashes a string to an MD5 hex value.

```js
strHash('Publican Library');
```

[`apiFetch()`](#apifetchobject) uses a hash of the HTTP URI, headers, and body as a filename when caching response data.


## `cspScript(code [, type])`

When passed client-side JavaScript code in a string and an optional [`type` attribute](https://developer.mozilla.org/docs/Web/HTML/Reference/Elements/script/type), `cspScript()` returns an object with the properties:

* `code`: the inline code inside a `<script>` tag, and
* `hash`: a SHA-256 hash for [Content Security Policy](https://developer.mozilla.org/docs/Web/HTTP/Guides/CSP) `script-src` settings.

{{ `publican.config.js` excerpt }}
```js
const tacs.myScript = cspScript('alert("Hello!")');
```

You can use this in a template:

{{ `htmlhead.html` example}}
```html
<!-- Content Security Policy -->
<meta http-equiv="Content-Security-Policy" content="
default-src 'self';
script-src 'self' 'sha256-${ tacs.myScript.hash }';
">

<!-- add inline <script> -->
${ tacs.myScript.code }
```

::: aside

### Inline script minification

Publican [minifies inline JavaScript](__/docs/reference/publican-options/#html-minification) by default. Always pass a minified script to `cspScript()` to ensure it's not minified and the CSP hash remains the same.

::: /aside


## `sortBy(prop)`

A function to sort an array using property values, e.g.

```js
const obj = [
  { name: "Craig" },
  { name: "Bob" },
  { name: "Anne" },
].sort( sortBy('name') );
// in order: Anne, Bob, Craig
```


## `fileInfo(path)`

When passed a file path, it returns an object with the following properties:

* `exists`: true or false
* `isFile`: true when a file
* `isDir`: true when a directory
* `modified`: the last modification timestamp

Returns an object with file information:

```js
const
  file = './somefile.txt',
  info = fileInfo(file);

if (info.exists) {

  console.log(file);

  if (info.isFile) {
    console.log('is a file');
  }
  else if (info.isDir) {
    console.log('is a directory');
  }

}
```
