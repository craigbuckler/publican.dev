---
title: Publican group indexes
menu: Group indexes
description: How to use automated pagination for posts in arbitrary groups.
date: 2025-10-22
priority: 0.9
tags: group index, navigation
---

You can organise pages into arbitrary *groups* based on any factor, e.g. featured posts, years, authors, etc. Groups and tags are similar, except:

* groups do not need to be topic based, and
* pages within a group can appear on any page or have pagination generated anywhere in the site.


## Groups in front matter

You can organise pages into `groups` using front matter that defines one or more comma-delimited names:

```md
---
title: A post
description: Post description
author: Craig Buckler
date: 2025-10-22
groups: featured, new
---
```


## `tacs.group`{language=js}

`tacs.group` is a global [Map object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Map) of all published posts in a group. Each item returns an ordered array of posts. For example, show links to all posts in the `featured` group:

```js
${ tacs.group.get('featured').map(
  p => `<p><a href="${ p.link }">${ p.title }</a></p>`
) }
```


## Group configuration

The `publican.config.groupPages`{language=js} configuration object controls group lists in the [Publican configuration file](--ROOT--docs/reference/publican-options/#group-index-pages). For example, put all group lists in reverse chronological order:

{{ `publican.config.js` excerpt }}
```js
publican.config.groupPages = {
  sortBy: 'date',
  sortOrder: -1,
};
```

You can configure ordering for specific lists using a child `list` object. The following code orders the `featured` group by `priority`, but uses the default `date` for other groups:

{{ `publican.config.js` excerpt }}
```js
publican.config.groupPages = {
  sortBy: 'date',
  sortOrder: -1,
  list: {
    'featured': {
      sortBy: 'priority',
      sortOrder: -1,
    }
  }
};
```

## Automatic group generation

Rather than defining groups in front matter, you can define a `filter` function in any `list` object to programmatically create groups. For example, the following code creates a `latest` group that lists all posts dated within the past 28 days. The default reverse chronological order applies:

{{ `publican.config.js` excerpt }}
```js
publican.config.groupPages = {
  sortBy: 'date',
  sortOrder: -1,
  list: {
    'latest': {
      filter: data => data.date >= new Date(Date.now() - 28 * 24 * 60 * 60 * 1000)
    }
  }
};
```

Note that a `latest` `filter` function overrides any `groups: latest` set in front matter. You can prevent this by checking the `data.groups` Set, e.g.

{{ `publican.config.js` excerpt }}
```js
'latest': {
  filter: data => (
    data.groups.has('latest') ||
    data.date >= new Date(Date.now() - 28 * 24 * 60 * 60 * 1000)
  )
}
```

Any post with `groups: latest` now appears in the `latest` group even if it's older than 28 days.


## Generating index pages

Publican can automatically generate paginated index pages for any group by setting a `root` path in the `list` definition, e.g. `/` for the home page or `/latest/` for a new section of latest posts. Set the following optional values in the `list` or the default `groupPages` object:

|name|description|
|-|-|
|`.size`|number of items per paginated page|
|`.template`|the template to use|
|`.index`|search engine indexing frequency, such as `monthly`|

The following configuration creates index pages for `latest` posts on the home page:

{{ `publican.config.js` excerpt }}
```js
publican.config.groupPages = {
  sortBy: 'date',
  sortOrder: -1,
  size: 12,
  template: 'list.html',
  index: 'monthly',
  list: {
    'latest': {
      filter: data => data.date >= new Date(Date.now() - 28 * 24 * 60 * 60 * 1000),
      root: '/'
    }
  }
};
```

If there were 30 `latest` posts, an index `size` of 12 creates:

* `index.html` shows posts 1 to 12
* `1/index.html` shows posts 13 to 24
* `2/index.html` shows posts 25 to 30

::: aside

### Pagination priority

Group pagination overrides [directory](--ROOT--docs/setup/directory-indexes/) and [tag](--ROOT--docs/setup/tag-indexes/) pagination indexes if applied to the same page.

::: /aside


## `data.childPageTotal`{language=js}

Returns the total number of child pages in a group index.


## `data.pagination`{language=js}

Publican provides index pages with a `data.pagination` object that has the following properties.

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

The following template code example lists all pages when the `data.pagination` object is available (it can be added to any template):

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

The following template code example shows a list of links to all index pages (the active page is not a link):

```js
${ pagination?.href.forEach((page, idx) => {
  return idx == data.pagination.pageCurrent ?
    `<strong>${ idx + 1 }</strong>` :
    `<a href="${ page }">${ idx + 1 }</a>`
}) }
```
