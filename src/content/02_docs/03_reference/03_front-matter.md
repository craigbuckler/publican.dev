---
title: Front matter
menu: Front matter
description: How to define front matter in Publican content files.
date: 2025-01-23
modified: 2025-03-19
priority: 0.9
tags: content, front matter
---

Content can define front matter `name: value` pairs between `---` [delimiters](--ROOT--docs/reference/publican-options/#front-matter-delimiter) at the top of any file. These define meta data that can be used in in [templates](--ROOT--docs/setup/templates/), the [content](--ROOT--docs/setup/content/), or even within other front matter fields.


## Publican values

All `name: value` pairs are defined on a single line. Values are optional, but Publican assigns special use to the following values.


### `title`{language=js}

The page title, typically used in the HTML `<title>`{language=html} and `<h1>`{language=html} tags.

```js
title: How to contact us
```


### `menu`{language=js}

The page title used in menus. This is usually shorter than the title, for example:

```js
menu: Contact
```

Set `menu: false` to remove the page from menus.


### `slug`{language=js}

The page slug -- the file location where the page will be built. The slug is usually set by the [file's name and directory](--ROOT--docs/setup/content/#directory-structure) but you can override it with a path relative to the build directory.

```js
slug: custom/page/location/index.html
```


### `priority`{language=js}

A page priority expressed as a real value from `0` (least important) to `1` (most important). The priority can be used to:

1. Order pages in navigation. By default, Publican uses reverse priority order.

1. Indicate the importance of pages in XML sitemaps.

```js
priority: 0.7
```


### `date`{language=js}

The post date in any JavaScript [`Date()` format](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Date), e.g. `2025-12-25` or `2025-07-15T11:00:00`.

```js
date: 2025-01-23
```

Posts with future dates are rendered in development mode but do not appear on production sites.


### `publish`{language=js}

The publication date. Set to:

* `draft` or `false` to stop the page being published on the live site (it will appear in development mode)

* any JavaScript [`Date()` format](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Date), e.g. `2025-12-25` or `2025-07-15T11:00:00`. The page will published when rendering occurs after that date.

```js
publish: 2025-02-28
```


### `tags`{language=js}

A comma-delimited list of tags relating to the page content, e.g.

```js
tags: HTML, CSS, JavaScript
```

Publican can [generate index pages based on these tags](--ROOT--docs/setup/tag-indexes/).


### `template`{language=js}

When rendering HTML and markdown content, Publican uses default template named `default.html` located in the `src/template/` directory. You can override this in any file.

```js
template: post-template.html
```


### `index`{language=js}

The search engine indexing frequency, as used in sitemaps and feeds. Typical values are `daily`, `weekly`, `monthly`, or `yearly`. Set it `false` if you want to omit a page from sitemaps.

```js
index: weekly
```


### `debug`{language=js}

Outputs the posts properties to the console when the file is loaded and parsed.

```js
debug: true
```

Setting any value other than `false` enables debugging.

You can use the value in expressions, e.g.

```md
Debugging is ${ data.debug ? 'enabled' : 'disabled' }.
```


## Custom front matter

You can add any front matter `name: value` pairs on a single line between the `---` delimiters. For example, a `description`, `author`, and `hero` image information:

```js
---
title: What are Static Site Generators (SSGs)
menu: false
description: An overview of what Static Site Generators.
author: Craig Buckler
tags: SSG, HTML, overview
priority: 1.0
date: 2025-01-23
hero: images/hero.jpg
---
```

The front matter `name` can be anything that's a valid JavaScript variable name.

The front matter values can be used in content and templates with [template literals](--ROOT--docs/setup/jstacs/), e.g.

```js
<p>${ data.description || "Nothing to see here." }</p>

${ data?.author && `<p class="author">By ${ data.author }</p>` }
```

You can even use front matter values within other front matter values!

```js
---
title: My title
menu: ${ data.title }
description: "${ data.title }" was written on ${ data.date } by ${ data.author }
date: 2025-01-23
author: Craig Buckler
---
```


### Value types

All custom front matter values are strings. Consider these values:

```js
---
fmArray: [1,2,3]
fmObject: { a: 1, b: 2, c: 3 }
---
```

Template literals can cast strings to any type, e.g.

```js
<p>array[0]: ${ JSON.parse( data.fmArray )[0] }</p>

<p>object.a: ${ JSON.parse( data.fmObject ).a }</p>
```

Alternatively, you could use a [`processContent` function hook](--ROOT--docs/reference/event-functions/#processcontent) to parse the front matter when it's loaded:

{{ `publican.config.js` }}
```js
publican.config.processContent.add(
  (filename, data) => {
    if (data.array) data.fmArray = JSON.parse(data.fmArray);
    if (data.fmObject) data.fmObject = JSON.parse(data.fmObject);
  }
);
```

Templates can then use the values directly:

```js
<p>array[0]: ${ data.fmArray[0] }</p>

<p>object.a: ${ data.fmObject.a }</p>
```
