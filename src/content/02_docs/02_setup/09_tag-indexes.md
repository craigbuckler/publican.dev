---
title: Publican tag indexes
menu: Tag indexes
description: How to use automated pagination for posts with specific tags.
date: 2025-01-23
priority: 0.9
tags: tag index, navigation
---

Front matter can specify [tags](--ROOT--docs/reference/front-matter/#tags) -- key words associated with the content:

```md
tags: HTML, CSS, JavaScript
```

Publican generates paginated tag index pages linking to pages that use those tags. These can be configured and presented in different ways.


## Generated index pages

Publican automatically generates paginated index pages for all tags, e.g. the files (slug) at:

* `tag/html/index.html` shows the first page of posts with the `HTML` tag
* `tag/html/1/index.html` shows the second page of posts with the `HTML` tag
* `tag/html/2/index.html` shows the third page of posts with the `HTML` tag, and so on.

Each of these index pages has a [`data.pagination` object](#datapagination) which can be used to display links to other index pages.


## Linking to tag indexes

The post's [`data.tags` property](--ROOT--docs/reference/content-properties/#datatags) provides an array of objects with the following properties:

* `tag`{language=js}: the tag name, e.g. `Front Matter`
* `ref`{language=js}: a normalized reference name, e.g. `front-matter`
* `link`{language=js}: the link to the tag index page, e.g. `/tag/front-matter/`
* `slug`{language=js}: the tag index page build file location, e.g. `tag/front-matter/index.html`

A page can list the tags it uses with links to the associated index using code such as:

```html
${ data?.tags?.map(t => `<p><a href="${ t.link }">${ t.tag }</a></p>`) }
```


## Tag index configuration

The `publican.config.tagPages`{language=js} configuration object controls how tags are indexed. The defaults are:

{{ `publican.config.js` excerpt }}
```js
// root tag directory
publican.config.tagPages.root = 'tag';

// number of items per paginated page
publican.config.tagPages.size = 24;

// sort by date order
publican.config.tagPages.sortBy = 'date';

// sort from newest to oldest
publican.config.tagPages.sortOrder = -1;

// use this template unless specified otherwise
publican.config.tagPages.template = 'default.html';

// do not show tag indexes on the menu
publican.config.tagPages.menu = false;

// index pages in sitemaps
publican.config.tagPages.index = 'monthly';
```


### Disabling index pages

Set `publican.config.tagPages`{language=js} to `false` (or any falsy value) to disable directory index pages.


### Index generation

The `publican.config.tagPages.size` value is set to `24` by default. Therefore, if 51 posts had been tagged with `JavaScript`, there will be three index pages:

* `tag/javascript/index.html` shows posts 1 to 24
* `tag/javascript/1/index.html` shows posts 25 to 48
* `tag/javascript/2/index.html` shows posts 49 to 51

Changing the value to `12` results in five index pages:

* `tag/javascript/index.html` shows posts 1 to 12
* `tag/javascript/1/index.html` shows posts 13 to 24
* `tag/javascript/2/index.html` shows posts 25 to 36
* `tag/javascript/3/index.html` shows posts 37 to 48
* `tag/javascript/4/index.html` shows posts 49 to 51

The posts are ordered by `date` from newest to oldest, but you can change this to any [content property](--ROOT--docs/reference/content-properties/), e.g. by `priority`:

```js
// sort by priority from highest to lowest
publican.config.tagPages.sortBy = 'priority';
publican.config.tagPages.sortOrder = -1;
```


## `data.pagination`

Publican provides all index pages with a `data.pagination` object that has the following properties.

|name|description|
|-|-|
|`.page`|an array of page `data` objects available in the current index page|
|`.pageTotal`|total number of pages|
|`.pageCurrent`|current page number (zero based)|
|`.pageCurrent1`|current page number (one based)|
|`.subpageFrom1`|post number from|
|`.subpageTo1`|post number to|
|`.hrefBack`|link to previous paginated page|
|`.hrefNext`|link to next paginated page|
|`.href`|array of links to all paginated pages|


### Showing page lists

The following template code example lists all pages when the `data.pagination` object is available (it can therefore be added to any template):

```html
${ data?.pagination?.page?.length && `
  <nav class="pagelist">
    ${ data.pagination.page.map(p => `
      <article>
        <a href="${ p.link }">
          <h2>${ p.title }</h2>
        </a>
      </article>
    `) }
  </nav>
`}
```

### Showing index navigation

The following template code example shows index back and next buttons when the `data.pagination` object is available:

```html
${ data?.pagination?.hrefBack && `
    <a href="${ data.pagination.hrefBack }">back</a>
`}

${ data?.pagination?.hrefNext && `
    <a href="${ data.pagination.hrefNext }">next</a>
`}
```

The following template code example shows a list of links to all index pages (the currently active page is not a link):

```html
${ pagination?.href.forEach((page, idx) => {
  return idx == data.pagination.pageCurrent ?
    `<strong>${ idx + 1 }</strong>` :
    `<a href="${ page }">${ idx + 1 }</a>`
}) }
```


## `tacs.tag`{language=js}

`tacs.tag`{language=js} is a global [Map object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Map) of all published posts indexed by the normalized tag reference. Each item returns an ordered array of posts. For example, show links to all posts with the `html` tag:

```js
${ tacs.tag.get('html').map(
  p => `<p><a href="${ p.link }">${ p.title }</a></p>`
) }
```


## `tacs.tagList`{language=js}

`tacs.tagList`{language=js} is a global array of tag objects ordered by highest to lowest usage. Each object has the following properties:

* `tag`{language=js}: the tag name, e.g. `Front Matter`
* `ref`{language=js}: a normalized reference name, e.g. `front-matter`
* `link`{language=js}: the link to the tag index page, e.g. `/tag/front-matter/`
* `slug`{language=js}: the tag index page build file location, e.g. `tag/front-matter/index.html`
* `count`{language=js}: the number of times the tag is used

You can use `tacs.tagList` to create a list of links to all tags. The following content HTML file is rendered to `build/tag/index.html` and shows a list of links to all tag indexes:

{{ `src/content/tag.html` }}
```html
---
title: Post tags
menu: false
description: The following tags have been used on posts across this site.
---

<p>${ data.description }</p>

<ul>
${ tacs?.tagList?.map(t => `
  <li>
    <a href="${ t.link }">
      ${ t.tag } (${ t.count })
    </a>
  </li>
`) }
</ul>
```
