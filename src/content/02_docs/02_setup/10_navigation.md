---
title: Publican navigation options
menu: Navigation
description: Publican provides in-page and site-wide navigation objects to help create menus and links to other pages.
date: 2025-01-23
modified: 2025-08-08
priority: 0.9
tags: navigation, headings
---

Publican provides in-page and site-wide navigation objects to help you create menus and links to other pages.


## Heading links

Content sub-headings (`<h2>`{language=html} to `<h6>`{language=html}) are automatically assigned `id` attributes so they are available as link targets and can appear in an [in-page menu](#inpage-navigation). You can configure headings using the `publican.config.headingAnchor`{language=js} object. Set it `false` (or any falsy value) to disable heading links, or define your own values:

{{ `publican.config.js` excerpt }}
```js
// omit link from heading
publican.config.headingAnchor.nolink = 'nolink';

// text in heading link
publican.config.headingAnchor.linkContent = '#';

// heading link class for CSS
publican.config.headingAnchor.linkClass = 'headlink';
```

**Example 1.** A basic heading such as:

```html
<h2>My heading</h2>
```

becomes *(carriage returns added for clarity)*:

```html
<h2 id="my-heading" tabindex="-1">
  My heading
  <a href="#my-heading" class="headlink">#</a>
</h2>
```

**Example 2.** Headings keep their ID when transformed so:

```html
<h2 id="myh2">My heading</h2>
```

becomes:

```html
<h2 id="myh2" tabindex="-1">
  My heading
  <a href="#myh2" class="headlink">#</a>
</h2>
```

**Example 3.** Headings with `nolink` somewhere in the tag do not have a `#` link added. This is useful when a heading is inside a link:

```html
<h2 class="nolink">My heading</h2>
<!-- OR -->
<h2 data-nolink>My heading</h2>
```

is transformed to:

```html
<h2 id="my-heading" tabindex="-1" class="nolink">My heading</h2>
```


## In-page navigation

You can place the code `<nav-heading></nav-heading>` in any content or template file. Publican renders the page's nested [headings links](#heading-links) (`<h2>`{language=html} to `<h6>`{language=html}) inside the block, e.g.

```html
<nav-heading>
  <nav class="contents">
    <ol>
      <li>
        <a href="#heading-2a" class="head-h2">Heading 2a</a>
        <ol>
          <li><a href="#heading-3a" class="head-h3">Heading 3a</a></li>
          <li><a href="#heading-3b" class="head-h3">Heading 3b</a></li>
        </ol>
      </li>
      <li><a href="#heading-2b" class="head-h2">Heading 2b</a><li>
    </ol>
  </nav>
</nav-heading>
```

`publican.config.headingAnchor`{language=js} properties control the options:

{{ `publican.config.js` excerpt }}
```js
// omit heading from menu
publican.config.headingAnchor.nomenu = 'nomenu';

// the tag name: <nav-heading></nav-heading>
publican.config.headingAnchor.tag = 'nav-heading';

// the class assigned to the parent <nav>
publican.config.headingAnchor.navClass = 'contents';
```

Setting `publican.config.headingAnchor.nomenu = 'nomenu'` omits any heading with `nomenu` somewhere in the tag. For example, the following headings:

```html
<h2 class="nomenu">Heading 1</h2>

<h2 class="nolink">Heading 2</h2>

<h2 data-nolink-nomenu>Heading 3</h2>
```

become:

```html
<h2 id="heading1" tabindex="-1" class="nomenu">Heading 1 <a href="#heading1" class="headlink">#</a></h2>

<h2 id="heading2" tabindex="-1" class="nolink">Heading 2</h2>

<h2 data-nolink-nomenu>Heading 3</h2>
```

Only **Heading 2** appears `<nav-heading>`{language=html} block:

```html
<nav-heading>
  <nav class="contents">
    <ol>
      <li><a href="#heading2" class="head-h2">Heading 2</a><li>
    </ol>
  </nav>
</nav-heading>
```

::: aside

Ensure your heading hierarchy is correct. For example, following an `<h2>`{language=html}, you could have another `<h2>`{language=html} or an `<h3>`{language=html}, but not an `<h4>`{language=html}. Publican does not report hierarchy errors, but the menu may look unusual.

::: /aside


## Back and next post links

The post's `data.postback` and `data.postnext` hold the `data` object of the previous and next post according to the directory or tag ordering. You can link to the previous and next page using template code such as:

```js
${ data?.postback?.link &&
  `<p><a href="${ data.postback.link }">back: ${ data.postback.title }</a></p>` }

${ data?.postnext?.link &&
  `<p><a href="${ data.postnext.link }">next: ${ data.postnext.title }</a></p>` }
```


## `tacs.nav`{language=js} site menus

`tacs.nav` is a global nested array of HTML page post objects ordered for navigation menus, breadcrumb trails, etc.

Each element of the `tacs.nav` array has two values:

1. a `data` property containing the [page `data` object](--ROOT--docs/reference/content-properties/) at the site's top level, i.e. they have no parent pages. Pages are sorted by whatever is defined for [directory indexing](--ROOT--docs/setup/directory-indexes/#directory-index-configuration).

1. a `children` property containing an array of immediate child page objects. Each of these elements has its own `data` and `children` properties. Those `children` properties will have further `children` properties until no more exist.

If your `src/content/` directory contained the following files:

```bash
#index.md

news/
  #index.md
  one.md
  two.md
```

an abbreviated `tacs.nav` object would have a structure similar to this:

```json
[

  {
    data: {
      title: "Home page",
      slug: "index.html"
    }
    children: []
  },


  {
    data: {
      title: "News",
      slug: "news/index.html"
    }
    children: [

      {
        data: {
          title: "Article one",
          slug: "news/one/index.html"
        }
        children: []
      },

      {
        data: {
          title: "Article two",
          slug: "news/two/index.html"
        }
        children: []
      },

    ]
  }

]
```

It may be necessary to recurse the `tacs.nav` object. This is easier in a [global function](--ROOT--docs/reference/template-globals/#defining-global-functions) rather than template `${ expressions }`{language=js}. The following recipes provide code for:

* [a site-wide main menu](--ROOT--docs/recipe/navigation/main-menu/)
* [a section menu for a specific directory](--ROOT--docs/recipe/navigation/section-menu/)
* [breadcrumb links to all parent pages](--ROOT--docs/recipe/navigation/breadcrumb-links/)
