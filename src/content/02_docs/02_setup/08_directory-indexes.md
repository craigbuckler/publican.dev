---
title: Publican directory indexes
menu: Directory indexes
description: How to use automated pagination for posts in specific directories.
date: 2025-01-23
modified: 2025-02-26
priority: 0.9
tags: directory index, navigation, string replacement
---

Publican presumes directories directly under `src/content/` contain specific *types* of content. For example:

* `docs/` contains documentation
* `post/` contains blog posts
* `about/` contains person/organization information.

(Sub-directories of these are presumed to have the same content type.)

Publican generates paginated directory index pages which can be configured and presented in different ways.


## Generated index pages

Publican automatically generates paginated index pages for all parent directories. For example, the slugs:

* `docs/index.html` shows the first page of posts in `docs/`
* `docs/1/index.html` shows the second page of posts in `docs/`
* `docs/2/index.html` shows the third page of posts in `docs/`, and so on.

Each of these index pages has a [`data.pagination` object](#datapagination) which can be used to display links to other index pages.


## Directory index configuration

The `publican.config.dirPages`{language=js} configuration object controls how directories are indexed. The defaults are:

{{ `publican.config.js` excerpt }}
```js
// number of items per paginated page
publican.config.dirPages.size = 24;

// sort by (front matter) priority order
publican.config.dirPages.sortBy = 'priority';

// sort from highest to lowest
publican.config.dirPages.sortOrder = -1;

// use this template unless specified otherwise
publican.config.dirPages.template = 'default.html';

// with no exceptions
publican.config.dirPages.dir = {};
```


### Disabling index pages

Set `publican.config.dirPages`{language=js} to `false` (or any falsy value) to disable directory index pages.


### Index generation

The `publican.config.dirPages.size` value is set to `24` by default. Therefore, if the `docs/` directory/sub-directories contained a total of 51 posts, there will be three index pages:

* `docs/index.html` shows posts 1 to 24
* `docs/1/index.html` shows posts 25 to 48
* `docs/2/index.html` shows posts 49 to 51

Changing the value to `12` results in five index pages:

* `docs/index.html` shows posts 1 to 12
* `docs/1/index.html` shows posts 13 to 24
* `docs/2/index.html` shows posts 25 to 36
* `docs/3/index.html` shows posts 37 to 48
* `docs/4/index.html` shows posts 49 to 51

The posts are ordered by `priority` from highest to lowest, but you can change this to any [content property](--ROOT--docs/reference/content-properties/), e.g. by filename:

```js
// sort by filename in alphabetical order
publican.config.dirPages.sortBy = 'fileame';
publican.config.dirPages.sortOrder = 1;
```

{aside}
Filename sorting is useful if you have posts with filenames starting `01_`, `02_`, `03_` etc. You can use [slug string replacement](--ROOT--docs/setup/content/#slug-string-replacement) to remove the digits but the order will remain.
{/aside}


The sorting values apply to all directories, but you can define exceptions. The following example sorts `post/` content by `date` with the newest first irrespective of the default sort order:

```js
// sort posts by date order, from newest to oldest
publican.config.dirPages.dir.post = {
  sortBy: 'date',
  sortOrder: -1
};
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

```js
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

```js
${ data?.pagination?.hrefBack && `
    <a href="${ data.pagination.hrefBack }">back</a>
`}

${ data?.pagination?.hrefNext && `
    <a href="${ data.pagination.hrefNext }">next</a>
`}
```

The following template code example shows a list of links to all index pages (the currently active page is not a link):

```js
${ pagination?.href.forEach((page, idx) => {
  return idx == data.pagination.pageCurrent ?
    `<strong>${ idx + 1 }</strong>` :
    `<a href="${ page }">${ idx + 1 }</a>`
}) }
```


## `tacs.dir`{language=js}

`tacs.dir` is a global [Map object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Map) of all published posts indexed by their root directory. Each item returns an ordered array of posts. For example, show links to all posts in the `about/` directory:

```js
${ tacs.dir.get('about').map(
  p => `<p><a href="${ p.link }">${ p.title }</a></p>`
) }
```
