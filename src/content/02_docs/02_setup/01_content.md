---
title: Publican content
menu: Content
description: How to define content for your Publican static site.
date: 2025-01-16
priority: 0.9
tags: content, markdown, front matter, template literals, string replacement
---

Publican content files define the main content of a page. They would **not** normally define content such as page headers, footers, and navigation blocks which typically reside in [templates](--ROOT--docs/setup/templates/).

{aside}
## Content rules

Publican does not enforce strict content/template rules. You can combine files as you like.
{/aside}


## Example content

Content files can contain markdown, HTML, or any other text format.

{{ `#index.md` example }}
```md
---
title: My first Publican site
menu: Home
description: The home page of my static site.
author: Craig Buckler
date: 2025-02-28
priority: 1
tags: Publican, SSG
---

This is my new static site built with [Publican](https://publican.dev/).

It was written on ${ data.date } by ${ data.author }
and has ${ data.wordCount } words.

## Updates coming

This site is *under construction!*
```


### Front matter

The top lines between `---` [delimiters](--ROOT--docs/reference/publican-options/#front-matter-delimiter) is [front matter](--ROOT--docs/reference/front-matter/) `name: value` pairs. These define meta data about the content that can be used in in [templates](--ROOT--docs/setup/templates/), the content, or even within other front matter fields.

Some [front matter values are used by Publican](--ROOT--docs/reference/front-matter/#publican-values) to control the build (`title`, `menu`, `slug`, `date`, `publish` etc.), but you can [add your own values](--ROOT--docs/reference/front-matter/#custom-front-matter).

Front matter can be added to any file, e.g.

{{ `src/content/contact.html` }}
```html
---
title: Contact us
email: helpdesk@site.com
---

<p>Contact us at <a href="mailto:${ data.email }">${ data.email }</a></p>
```

The primary content follows the closing front matter delimiter. [Markdown](#markdown) is converted to HTML during the build. Other types of file content such as HTML or TXT are not changed (other than removing the front matter block).

Any file can use `${ expression }`{language=js} [template literals](--ROOT--docs/setup/jstacs/) to output [page `data`](--ROOT--docs/reference/content-properties/) or [global `tacs`](--ROOT--docs/reference/global-properties/) values.


### Markdown

Publican supports markdown for content. It's a simple format which can be transformed to clean HTML. The following resources can help you get started with markdown:

* [Daring Fireball markdown](https://daringfireball.net/projects/markdown/)
* [markdownguide.org basics](https://www.markdownguide.org/basic-syntax/)
* [markdownguide.org extended](https://www.markdownguide.org/extended-syntax/)
* [Markdown reference](https://commonmark.org/help/)

You can configure the [markdown to HTML conversion options](--ROOT--docs/reference/publican-options/#markdown-to-html) in `publican.config.js`.

Template literal `${ expressions }`{language=js} can be included in markdown, but refer to the [jsTACS notes and options](--ROOT--docs/setup/jstacs/#template-literals-in-markdown).


## Content file location

Create content files in `src/content/` unless you set an [alternative directory](--ROOT--docs/reference/publican-options/#directories) in `publican.config.js`, e.g.

{{ `publican.config.js` }}
```js
// imports
import { Publican } from 'publican';

// create Publican object
const publican = new Publican();

// alternative content location
publican.config.dir.content = './my-content/';

// build site
await publican.build();
```


## Directory structure

A content file's location determines its full path in the built web site (the *slug*). Examples:

|source file in `src/content/`|creates slug in `build/`|
|-|-|
|\#index.md|index.html|
|\#index.html|index.html|
|feed.xml|feed.xml|
|post/my-post.md|post/my-post/index.html|
|post/my-post.html|post/my-post/index.html|
|post/my-post/\#index.md|post/my-post/index.html|
|post/my-post/new.md|post/my-post/new/index.html|

The default slug definition rules:

* The characters `#`, `!`, `$`, `^`, `~`, and space are removed.

* All letters are converted to lower case.

* `.md` and `.html` files are web page content -- they will always result in a slug ending `index.html` in a specific directory. This creates friendlier URLs such as `mysite.com/post/my-post/` rather than `mysite.com/post/my-post.html`.

Publican shows an error and aborts when slugs clash.


### Ignored content files

Filenames beginning with an underscore (`_`) are ignored ([the rule is configurable](--ROOT--docs/reference/publican-options/#ignored-content-files)). This can be useful if you are creating notes or content that you do not want in the built site.


### Custom slugs

The [front matter `slug`](--ROOT--docs/reference/front-matter/#slug) value overrides the generated slug value.

{{ `src/content/post/my-post.md` }}
```md
---
title: A new post
menu: New post
date: 2025-02-28
slug: post/2025/my-post.html
---

Content coming soon.
```

The page will be built to `build/post/2025/my-post.html` rather than `build/post/my-post/index.html`.


### Slug string replacement

You can define any number of slug search and replace values in the `publican.config.slugReplace` [Map object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Map). Search values can be strings or regular expressions.

The following example removes two or more digits followed by an underscore and changes `.html` extensions to `.htm`:

{{ `publican.config.js` excerpt }}
```js
// slug replacement - removes NN_
publican.config.slugReplace.set(/\d{2,}_/g, '');

// slug replacement - rename .html to .htm
publican.config.slugReplace.set('.html', '.htm');
```


## Virtual content files

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

{aside}
A backtick-delimited string has been used here for readability. This would parse any `${ expressions }`{language=js} before Publican and could lead to unexpected consequences.
{/aside}
