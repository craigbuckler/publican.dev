---
title: Publican.lib
menu: Publican.lib
description: Publican.lib is a set of template and utility functions that help you generate static web sites with Publican.
date: 2026-05-29
modified: 2026-05-29
priority: 0.8
tags: Publican.lib, tools
---

[Publican.lib](https://www.npmjs.com/package/publican.lib) is a set of template and utility functions that help you generate static web sites with Publican. The [Publican.dev website](__/about/links/#publicandev-website) uses Publican.lib.


## Import everything

Install [Publican.lib](https://www.npmjs.com/package/publican.lib) in your Publican project:

{{ terminal }}
```bash
npm install publican.lib
```

Import it into your Publican configuration file:

{{ `publican.config.js` excerpt }}
```js
// Publican configuration
import { libInit } from 'publican.lib';
```

Then pass `publican` and `tacs` to the `libInit()` initialization function before calling `await publican.build();`

{{ `publican.config.js` excerpt }}
```js
// ...set Publican defaults...

// initialize publican.lib
libInit(publican, tacs);

// optionally set the default language
tacs.lib.format.setLocale( 'en-US' );

// build
await publican.build();
```

You can then use:

* [utility functions](__/tools/publican.lib/utility/) in configuration files
* [event hook functionality](__/tools/publican.lib/hook/)
* [format](__/tools/publican.lib/format/), [nav](__/tools/publican.lib/nav/), and [feed](__/tools/publican.lib/feed/) functions in your templates
* [replacement strings](__/tools/publican.lib/replace/) in content.


## Import individual utilities

Rather than using all functionality, you can choose to import specific functions. For example, to use [all formatting](__/tools/publican.lib/format/) and the [`nav.pagination()`](__/tools/publican.lib/nav/#pagination) functions only:

{{ `publican.config.js` excerpt }}
```js
// Publican configuration
import { Publican, tacs } from 'publican';

// import from Publican.lib
import * as format from 'publican.lib/format';
import { pagination } from 'publican.lib/nav';

// create a global functions object
tacs.fn = tacs.fn || {};

// use all tacs.fn.format functions in templates
tacs.fn.format = format;

// use tacs.fn.nav.pagination() function in templates
tacs.fn.nav = { pagination };
```
