---
title: Publican.lib feed functions
menu: Feeds
description: Publican.lib provides a set of RSS and JSON feed functions you can use in templates.
date: 2026-05-29
modified: 2026-05-29
priority: 0.8
tags: Publican.lib, RSS, templates
---

The `feed` functions help create machine-readable files in JSON and XML format. The `libInit()` function adds all functions:

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
import { rss } from 'publican.lib/feed';

// ...set Publican defaults...

// add global feed functions
tacs.lib = tacs.lib || {};
tacs.lib.feed = { rss };

// build
await publican.build();
```

> All examples in this section assume the global `tacs.config.domain` is the domain, such as `https://mysite.com`.


## `rss(str, domain, root)`

Removes invalid HTML attributes and ensures all URIs use absolute references.

{{ RSS example }}
```xml
<content:encoded><![CDATA[
${ tacs.lib.feed.rss( data.contentRendered, tacs.config.domain, tacs.root ) }
]]></content:encoded>
```


## `json(str, domain, root)`

Does the same as [`rss()`](#rssstr-domain-root) but also applies special encodings for JSON feeds that [are replaced](__/tools/publican.lib/replace/#json-characters).

{{ JSON example }}
```json
"content_html": "${ tacs.lib.feed.json( data.contentRendered, tacs.config.domain, tacs.root ) }"
```


## `escape(str)`

Escapes single-line HTML and XML strings.

{{ example }}
```html
<title>${ tacs.lib.feed.escape( data.title ) }</title>
```
