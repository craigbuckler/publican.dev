---
title: Publican public methods
menu: Publican methods
description: The public methods available in Publican configurations.
date: 2025-01-23
priority: 0.9
tags: configure
---

The Publican object provides the following public methods that can be used in the [`publican.config.js` configuration files](--ROOT--docs/setup/configuration/).


## `.addContent()`

Content can also be passed to Publican as a string in the [configuration file](--ROOT--docs/setup/configuration/). This may be useful if you are retrieving data from a Content Management System API rather than using the file system.

To add virtual content, call:

```js
publican.addContent( <filename>, <content> );
```

prior to running the build process (`await publican.build();`{language=js}).

The `filename` follows the [directory structure rules](#directory-structure) and determines the type of content. For example, to add a markdown page:

{{ `publican.config.js` }}
```js
publican.addContent(
  'article/virtual-post.md', `
---
title: Virtual post
---
This is a virtual post!
`);
```

::: aside
A backtick-delimited string has been used here for readability. This would parse any `${ expressions }`{language=js} before Publican and could lead to unexpected consequences.
::: /aside


## `.addTemplate()`

Templates can be passed to Publican as a string in the [configuration file](--ROOT--docs/setup/configuration/). This may be useful if you want to create custom templates or partials using conditions or other logic.

To add a virtual template, call:

```js
publican.addTemplate( <filename>, <content> );
```

The `filename` is relative to the [template location](#template-file-location). The following example adds a template which shows an HTML `<blockquote>` section when a `quote` value is set in [front matter](--ROOT--docs/setup/content/#front-matter).

{{ `publican.config.js` excerpt }}
```js
publican.addTemplate(
  '_partials/blockquote.html',
  '${ data.quote ? `<blockquote>${ data.quote }</blockquote>` : "" }'
);
```

It can be used in any other template with an [`include()` expression](--ROOT--docs/setup/jstacs/#include-templates):

{{ `default.html` excerpt }}
```html
<main>
  ${ include('_partials/blockquote.html') }
  ${ data.content }
</main>
```


## `.clean()`

An asynchronous function that removes all files from the [build directory](--ROOT--docs/reference/publican-options/#directories). The `.clean()` method should be called prior to running [`.build()`](#build) and ensures old files will not be present.

{{ `publican.config.js` }}
```js
// import Publican
import { Publican } from 'publican';

// create Publican object
const publican = new Publican();

// clear build directory
await publican.clean();

// build site
await publican.build();
```

The `.clean()` method works cross-platform so you do not require Node.js directory handling modules or alternative `npm` scripts.


## `.build()`

The main asynchronous function to start a build. It should be called after all [options](--ROOT--docs/reference/publican-options/) are set at the end of the [configuration file](--ROOT--docs/setup/configuration/).

{{ `publican.config.js` excerpt }}
```js
// build site
await publican.build();
```

When [watch mode](--ROOT--docs/setup/watch-mode/) is enabled, Publican will monitor content and template files and automatically rebuild again.
