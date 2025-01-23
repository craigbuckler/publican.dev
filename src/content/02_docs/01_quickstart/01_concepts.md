---
title: Publican core concepts
menu: Core concepts
description: An overview of Publican's core concepts and how it's used to build a static site. Please read this first!
date: 2025-01-23
priority: 0.9
tags: content, front matter, templates, jsTACS, template literals, directory index, tag index, pass through, configure
---

Publican is a Node.js static site generator. It builds web pages from:

1. [content](#content)
1. [templates](#templates), and
1. a [JavaScript configuration file](#configuration).


## Content

By default, Publican looks for [text-based content files](--ROOT--docs/setup/content/) in `src/content/`.

[Markdown](--ROOT--docs/setup/content/#markdown)(`.md`) is a practical format for articles (including this one), but Publican can process HTML, XML, TXT, SVG or other other text file.


### Front matter

Any content file can have [front matter](--ROOT--docs/setup/content/#front-matter) values at the top. This defines meta data such as the title, date, and tags. [Some values control how Publican works](--ROOT--docs/reference/front-matter/#publican-values) but you can [define custom values](--ROOT--docs/reference/front-matter/#custom-front-matter) such as a description, author, image, etc.

{{ `index.md` example }}
```md
---
title: My first post
description: The first post I wrote in my Publican site.
date: 2025-01-23
tags: HTML, CSS, JavaScript
---

This is my **page content**.
```


### Directory indexes

Publican presumes directories directly under `src/content/` contain specific *types* of content. For example:

* `docs/` contains documentation
* `post/` contains blog posts
* `about/` contains person/organization information.

(Sub-directories of these are presumed to have the same type of content.)

Publican generates [paginated directory index pages](--ROOT--docs/setup/directory-indexes/) which can be configured and presented in different ways.


### Tag indexes

Front matter can specify [tags](--ROOT--docs/reference/front-matter/#tags) -- key words associated with the content:

```md
tags: HTML, CSS, JavaScript
```

Publican generates [paginated tag index pages](--ROOT--docs/setup/tag-indexes/) linking to pages that use those tags. These can be configured and presented in different ways.


### Media files

Media and other static files can be [copied directly](--ROOT--docs/setup/pass-through-files/) to the website build directory without modification.


## Templates

By default, Publican looks for [text-based template files](--ROOT--docs/setup/templates/) in `src/template/`. Most templates will be HTML files that Publican slots [content](#content) into to create web pages.


### jsTACS template engine

Publican uses [jsTACS](--ROOT--docs/setup/jstacs/) as its templating engine. It parses standard JavaScript `${ expression }`{language=js} template literals. For example, `<h1>${ data.title }</h1>`{language=js} slots a ([front matter](#front-matter)) title into a heading.


## Configuration

Publican is [configured](--ROOT--docs/setup/configuration/) and launched from a `publican.config.js` file. It defines:

* options such as directories, page sorting, and pagination
* global values that can be used across all pages
* advanced options such as string replacement and event functions.


## Build

The site is built to your project's default `build/` directory when you run:

{{ terminal }}
```bash
node ./publican.config.js
```

This creates a [production build](--ROOT--docs/quickstart/build/#production-mode) which omits draft and future-dated content. You can create a [development build](--ROOT--docs/quickstart/build/#development-mode) that includes all content by setting the `NODE_ENV` environment variable to `development` before running Publican.

Note you will require a [local development server](--ROOT--docs/quickstart/build/#local-web-server) to view your site.
