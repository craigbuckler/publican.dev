---
title: Publican templates
menu: Templates
description: How to define templates for a Publican static site.
date: 2025-01-23
modified: 2025-12-09
priority: 0.9
tags: templates, jsTACS, template literals, HTML
---

To build static web pages, Publican requires HTML templates that *pull in* [content](--ROOT--docs/setup/content/). Templates typically define page headers, footers, navigation, and content locations.

::: aside

## Template formats

Publican builds static web pages so most templates will be HTML files. Publican reads and outputs text files so you can create templates for XML, TXT, SVG, JSON, or any other text type as necessary.

You can also provide templates in markdown format using a file with an `.md` extension. Publican converts markdown to HTML when the file is loaded. Markdown is best used in partials where you require blocks of text.

::: /aside


## Example template

Publican uses the [jsTACS](--ROOT--docs/setup/jstacs/) templating engine. It parses standard JavaScript template literal `${ expressions }`{language=js} which can access [page content `data`](--ROOT--docs/reference/content-properties/) and [global site `tacs`](--ROOT--docs/reference/global-properties/) properties.


{{ `default.html` }}
```html
<!doctype html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>${ data.title }</title>
  </head>
  <body>

    <header>
      <nav><a href="${ tacs.root }">HOME</a></nav>
    </header>

    <main>
      <h1>${ data.title }</h1>
      ${ data.content }
    </main>

  </body>
</html>
```

Note:

* `${ data.title }`{language=js} is from the content [front matter](--ROOT--docs/setup/content/#front-matter)
* `${ data.content }`{language=js} is the main content
* `${ tacs.root }`{language=js} is the [root server path](--ROOT--docs/reference/global-properties/#tacsroot) which defaults to `/`.

See the [jsTACS page](--ROOT--docs/setup/jstacs/) for more information.


## Template file location

Create template files in `src/template/` unless you set an [alternative directory](--ROOT--docs/reference/publican-options/#directories) in `publican.config.js`, e.g.

{{ `publican.config.js` }}
```js
// imports
import { Publican } from 'publican';

// create Publican object
const publican = new Publican();

// alternative template location
publican.config.dir.template = './my-templates/';

// build site
await publican.build();
```


## Default templates

The [content's front matter](--ROOT--docs/reference/front-matter/#template) can specify a `template` file:

```md
---
title: Some content
template: my-template.html
---
```

When this is not set, Publican uses a default template file named `default.html`. You can [set any template name](--ROOT--docs/reference/publican-options/#default-template) in `publican.config.js`, e.g.

{{ `publican.config.js` excerpt }}
```js
publican.config.defaultHTMLTemplate = 'main.html';
```

You can also change the default template for [directory index pages](--ROOT--docs/setup/directory-indexes/):

{{ `publican.config.js` excerpt }}
```js
publican.config.dirPages.template = 'dir.html';
```

and [tag index pages](--ROOT--docs/setup/tag-indexes/):

{{ `publican.config.js` excerpt }}
```js
publican.config.tagPages.template = 'tag.html';
```


## Virtual template files

You can pass templates as a string to Publican in the [configuration file](--ROOT--docs/setup/configuration/). This may be useful if you want to create custom templates or partials using conditions or other logic.

To add a virtual template, call:

```js
publican.addTemplate( <filename>, <content> );
```

The `filename` is relative to the [template location](#template-file-location). The following example adds a template which shows an HTML `<blockquote>` section when the [front matter](--ROOT--docs/setup/content/#front-matter) defines a `quote` value.

{{ `publican.config.js` excerpt }}
```js
publican.addTemplate(
  '_partials/blockquote.html',
  '${ data.quote ? `<blockquote>${ data.quote }</blockquote>` : "" }'
);
```

You can include this in any other template with an [`include()` expression](--ROOT--docs/setup/jstacs/#include-templates):

{{ `default.html` excerpt }}
```html
<main>
  ${ include('_partials/blockquote.html') }
  ${ data.content }
</main>
```
