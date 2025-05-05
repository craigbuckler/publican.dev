---
title: Global properties
menu: Global properties
description: The global jsTACS properties provided on all pages by Publican.
date: 2025-01-23
priority: 0.9
tags: content, front matter, templates, template literals
---

This section describes the properties available in the `tacs`{language=js} global object available to [template literals](--ROOT--docs/setup/jstacs/) in [templates](--ROOT--docs/setup/templates/), [content](--ROOT--docs/setup/content/), and [front matter](--ROOT--docs/reference/front-matter/). These properties are typically used to render page features such as menus, navigation, feeds, etc.


## Core global properties

The following properties are provided for page content by Publican irrespective of front matter definitions. Summary:

|`tacs` property|description||
|---|---|---:|
|`.root`|web server directory|[*more*](#tacsroot)|
|`.all`|Map of posts indexed by slug|[*more*](#tacsall)|
|`.dir`|Map of posts in root directories|[*more*](#tacsdir)|
|`.tag`|Map of posts with tags|[*more*](#tacstag)|
|`.tagList`|array of tag objects|[*more*](#tacstaglist)|
|`.nav`|nested array of navigation objects|[*more*](#tacsnav)|


### `tacs.root`{language=js}

The web server root location. By default, Publican assumes files in the [build directory](--ROOT--docs/reference/publican-options/#directories) are published to the server root, so `${ tacs.root }`{language=js} returns `/`.

The [root server path](--ROOT--docs/reference/publican-options/#root-server-path) can be changed in the [configuration file](--ROOT--docs/setup/configuration/).


### `tacs.all`{language=js}

A [Map object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Map) of all published posts indexed by slug (relative to the `build/` directory). For example, fetch the root home page:

```js
// fetch the home page title
${ tacs.all.get('index.html')?.title }
```

The object is typically used for sitemaps and [feeds](--ROOT--docs/recipe/feeds/rss-feed/) where a list of all posts is required.


### `tacs.dir`{language=js}

A [Map object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Map) of all published posts indexed by a root directory. Each item returns an ordered array of posts. For example, list all posts in the `about` directory:

```js
${ tacs.dir.get('about').map(
  p => `<p>${ p.title }</p>`
) }
```

Publican can automatically generate directory index pages, so you should only require `tacs.dir` in situations where you require specific lists, such as an [RSS feed of recent posts](--ROOT--docs/recipe/feeds/rss-feed/).


### `tacs.tag`{language=js}

A [Map object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Map) of all published posts indexed by normalized tag (lower case, spaces replaced with `-`, etc.) Each item returns an ordered array of posts. For example, list all posts with an `html` tag:

```js
${ tacs.tag.get('html').map(
  p => `<p>${ p.title }</p>`
) }
```

Publican can automatically generate tag index pages, so you should only require `tacs.tag` in situations where you require specific lists.


### `tacs.tagList`{language=js}

An array of tag objects ordered by highest to lowest usage. Each object has the following properties:

* `tag`: the tag name, e.g. `Front Matter`
* `ref`: a normalized reference name, e.g. `front-matter`
* `link`: the link to the tag index page, e.g. `/tag/front-matter/`
* `slug`: the tag index page build file location, e.g. `tag/front-matter/index.html`
* `count`: the number of times the tag is used

Example:

```json
[
  {
    tag: 'HTML',
    ref: 'html',
    link: '/tag/html/',
    slug: 'tag/html/index.html',
    count: 5
  },
  {
    tag: 'Front Matter',
    ref: 'front-matter',
    link: '/tag/front-matter/',
    slug: 'tag/front-matter/index.html',
    count: 3
  }
]
```

You should only require `tacs.tagList` on a [root tag page that lists all tags](--ROOT--docs/setup/tag-indexes/#tacstaglist).


### `tacs.nav`{language=js}

`tacs.nav` is a global nested array of HTML page post objects ordered for navigation menus, breadcrumb trails, etc. Each element in the array has [post `data`](--ROOT--docs/reference/content-properties/) as well as a `.children` property holding an array containing child `data` items. Each child page has it's own `data` and `children` array where appropriate.

It is generally necessary to recurse the `tacs.nav` object, so this is easier in a [global function](--ROOT--docs/reference/template-globals/#defining-global-functions) rather than template. The following recipes provide code for:

* [a main menu](--ROOT--docs/recipe/navigation/main-menu/)
* [a section menu](--ROOT--docs/recipe/navigation/section-menu/)
* [breadcrumb links](--ROOT--docs/recipe/navigation/breadcrumb-links/)


## Custom global properties

`tacs` global properties can be added, modified, or removed in the [Publican configuration file](--ROOT--docs/setup/configuration/) so they can be reused across the site. You can add [values](--ROOT--docs/reference/template-globals/#defining-global-properties) or [reusable functions](--ROOT--docs/reference/template-globals/#defining-global-functions) that can be used in any template.
