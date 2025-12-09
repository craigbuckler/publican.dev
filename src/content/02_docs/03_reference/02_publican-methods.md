---
title: Publican public methods
menu: Publican methods
description: The public methods available in Publican configurations.
date: 2025-01-23
modified: 2025-12-09
priority: 0.9
tags: configure
---

The Publican object provides the following public methods that can be used in the [`publican.config.js` configuration files](--ROOT--docs/setup/configuration/).


## `.addContent()`

Content can also be passed to Publican as a string in the [configuration file](--ROOT--docs/setup/configuration/). This may be useful if you are retrieving data from a Content Management System API rather than using the file system.

To add virtual content, call:

```js
publican.addContent( <filename>, <content> [, <dataObject> ] );
```

prior to running the build process (`await publican.build();`{language=js}). The arguments:

1. `filename` follows the [directory structure rules](#directory-structure) and determines the content type (HTML, markdown, etc.)

1. `content` is the main content strong with [front matter](--ROOT--docs/reference/front-matter/) if necessary.

1. `dataObject` is an optional initialization object containing values that you would normally use in [front matter](--ROOT--docs/reference/front-matter/) (properties defined in front matter take precedence).


The following example creates a page with a filename and content string:

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

The backtick-delimited string used here is for readability. Backticks would parse any `${ expressions }`{language=js} before Publican rendered and could lead to unexpected consequences.

::: /aside


The following example is similar but also passes a data object:

{{ `publican.config.js` }}
```js
publican.addContent(
  'article/virtual-post.md', `
---
title: Virtual post
---
This is a virtual post!
`,
  {
    title: 'My title',
    description: 'My description',
    date: new Date(), // now
    tags: ['automatic', 'content'],
    groups: 'virtual, content'
  }
);
```

The `title` is `Virtual post` rather than `My title` because content front matter takes priority.

You can pass:

* `date` as a `Date()` object or string such as `"2025-12-25"`.

* `menu` and `index` values as strings or Boolean `false`.

* [tags](--ROOT--docs/setup/tag-indexes/) and [groups](--ROOT--docs/setup/group-indexes/) as arrays or comma-separated strings.

* a `dataObject.content` property when the `content` parameter is falsy, e.g.

   ```js
   publican.addContent(
     'article/virtual-post.md',
     null,
     {
       title: 'My post',
       content: 'Some content.'
     }
   );
   ```


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

::: aside

Templates in markdown format (using a filename with an `.md` extension) have their content converted to HTML.

::: /aside


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
